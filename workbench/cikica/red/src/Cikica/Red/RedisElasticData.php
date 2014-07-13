<?php namespace Cikica\Red;

/**
* a redis abstraction class over the normal Redis class in laravel, adds the ability to pass a full objet and 
* get a multi dimensional version of the object represented in redis. Watch this spot for examples
*/

class RedisElasticData {

	static function set ( $to_key, $what ) {

		$data_is = RedisElasticData::get_the_data_types_of_this_value( $what );
		$map     = RedisElasticData::map_data( $what, ( $data_is['multi_dimensional'] ? "$to_key:" : $to_key ) );

		RedisElasticData::del( $to_key );
		RedisElasticData::set_hash([
			'key'   => "$to_key:RED_map",
			'value' => $map['type']
		]);

		foreach ( $map['value'] as $key => $value ) {

			$type = $map['type'][$key];
			\Redis::del( $key );
			switch ( $type ) {
				case 'string':
					\Redis::set( $key, $value );
					break;
				case 'list':
					\Redis::lpush( $key, $value );
					break;
				case 'hash':
					RedisElasticData::set_hash([
						'key'   => $key,
						'value' => $value
					]);
			}
		}
	}

	static function get ( $key ) {

		$do_we_get_single_value_key = RedisElasticData::is_key_multi_dimensional( $key );
		$key_map                    = RedisElasticData::get_key_map( $key );
		
		if ( empty( $key_map ) ) {
			return false;
		}

		if ( $do_we_get_single_value_key ) {
			return RedisElasticData::get_single_key_value_based_on_map_key([
				'type' => $key_map[$key],
				'path' => $key 
			]);
		} else {
			return RedisElasticData::get_multi_dimensional_array_out_of_a_key_map([
				'map'  => $key_map,
				'root' => explode( ':', $key )[0]
			]);
		}
	}

	static function del ( $key ) {

		$do_we_get_single_value_key = RedisElasticData::is_key_multi_dimensional( $key );
		$key_map                    = RedisElasticData::get_key_map( $key );
		
		\Redis::del( "$key:RED_map" );
		if ( $do_we_get_single_value_key ) {
			\Redis::del( $key );
		} else {
			foreach ($key_map as $key_path => $key_type) {
				\Redis::del( $key_path );
			}
		}
	}


	static function get_single_key_value_based_on_map_key ( $key ) {
		switch ( $key['type'] ) {
			case 'string':
				return \Redis::get( $key['path'] );
				break;
			case 'list' : 
				return \Redis::lrange( $key['path'], 0, -1 );
				break;
			case 'hash' : 
				return \Redis::hgetall( $key['path'] );
				break;
		}
	}

	static function get_multi_dimensional_array_out_of_a_key_map ( $key ) {

		$array = [];

		foreach ($key['map'] as $map_key => $value_type) {
			array_set( 
				$array, 
				str_replace( ':', '.', $map_key ), 
				RedisElasticData::get_single_key_value_based_on_map_key([
					'type' => $value_type,
					'path' => $map_key
				])
			);
		}
		return $array[$key['root']];
	}

	static function get_key_map ( $key ) {
		$key_root = explode( ':', $key )[0];
		return \Redis::hgetall( "$key_root:RED_map" );
	}

	static function map_data ( $data, $map_key = '' ) {
		
		$type_map  = [];
		$value_map = [];
		$data_is   = RedisElasticData::get_the_data_types_of_this_value($data);

		if ( $data_is['multi_dimensional'] ) {

			foreach ($data as $key => $value) {

				$map = RedisElasticData::create_map_for_value(
					$map_key . $key,
					$value,
					$type_map,
					$value_map
				);

				$type_map  = $map['type'];
				$value_map = $map['value'];
			}

		} else {

			$map = RedisElasticData::create_map_for_value(
				$map_key,
				$data,
				$type_map,
				$value_map
			);

			$type_map  = $map['type'];
			$value_map = $map['value'];
		}

		return [
			'type'  => $type_map,
			'value' => $value_map
		];
	}

	static function set_hash ( $hash ) {
		foreach ($hash['value'] as $key => $value) {
			\Redis::hset( $hash['key'], $key, $value );
		}
	}

	static function is_key_multi_dimensional ( $key ) {
		$exploded_key = explode( ':', $key );
		return ( count( $exploded_key ) > 1 and !empty( $exploded_key[1] ) );
	}

	static function create_map_for_value ( $key, $value, $type_map, $value_map ) {

		$data_is = RedisElasticData::get_the_data_types_of_this_value( $value );

		if ( $data_is['multi_dimensional'] and $data_is['sequential'] ) {
			throw new \Exception( "You are trying to pass a mutli dimensional squential array, which is a no no. It has to be key value if you want it to be multi dimensional" );
		}

		if ( $data_is['sequential'] ) {
			$type_map[$key]  = 'list';
			$value_map[$key] = $value;
		}

		if ( !$data_is['multi_dimensional'] and $data_is['key_value'] ) {
			$type_map[$key]  = 'hash';
			$value_map[$key] = $value;
		}

		if ( $data_is['string'] ) {
			$type_map[$key]  = 'string';
			$value_map[$key] = $value;
		}

		if ( $data_is['multi_dimensional'] ) {
			$new_map   = RedisElasticData::map_data( $value, "$key:" );
			$type_map  = array_merge( $type_map, $new_map['type'] );
			$value_map = array_merge( $value_map, $new_map['value'] );
		}

		return [
			'type' => $type_map,
			'value' => $value_map
		];
	}

	static function get_the_data_types_of_this_value ( $value ) {

		$is = [
			'sequential'        => false,
			'multi_dimensional' => false,
			'key_value'         => false,
			'string'            => false,
		];

		if ( is_array( $value ) ) {

			$is['sequential']        = RedisElasticData::is_this_array_sequential( $value );
			$is['multi_dimensional'] = RedisElasticData::is_this_array_multi_dimensional( $value );
			$is['key_value']         = ( !$is['sequential'] ? true : false );

		} else {

			$is['string'] = true;
		}

		return $is;

	}

	static function is_this_array_sequential ( $array ) {
		return ( array_values( $array ) === $array );
	}

	static function is_this_array_multi_dimensional ($array) {
		$multi_dimensional = false;
		foreach ( $array as $member ) {
			if ( is_array( $member ) ) {
				$multi_dimensional = true;
			}
		}
		return $multi_dimensional;
	}
	
}
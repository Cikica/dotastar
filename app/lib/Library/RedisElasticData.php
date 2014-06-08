<?php namespace Library;

/**
* a redis abstraction class over the normal Redis class in laravel, adds the ability to pass a full objet and 
* get a multi dimensional version of the object represented in redis. Watch this spot for examples
*/
// test {
// 	"RED_definition" : {
// 		"base1:root1"         : "hash",
// 		"base1:root2"         : "sorted-set",
// 		"base1:root3"         : "string",
// 		"base1:root4"         : "set",
// 		"base1:root5:base2_1" : "string",
// 		"base1:root5:base2"   : "hash",
// 	},
// 	"base1" : {
// 		"root1" : {
// 			"name" : "stuff",
// 			"age" : "other"
// 		},
// 		"root2" : ["1","2","3"],
// 		"root3" : "string",
// 		"root4" : ["1","1","2"],
// 		"root5" : {
// 			"base2_1" : "strugg",
// 			"base2" : {
// 				"name" : "agata"
// 			}
// 		}
// 	}
// }
class RedisElasticData {
	
	static function set () {
		
	}

	static function map_data ($data) {
		
		$map = [];

		foreach ($data as $key => $value) {
			
			if ( is_array( $value ) ) {

				$is_multi_dimensional = RedisElasticData::is_this_array_multi_dimensional( $value );
				$is_sequential        = RedisElasticData::is_this_array_sequential( $value );

				if ( $is_multi_dimensional && $is_sequential ) {
					throw new \Exception( "You are trying to pass a mutli dimensional squential array, which is a no no. It has to be key value if you want it to be multi dimensional" );
				}

				if ( $is_sequential) {
					$map[$key] = 'list';
				}

				if ( !$is_multi_dimensional && !$is_sequential ) {
					$map[$key] = 'hash';
				}

				if ( $is_multi_dimensional ) {
					$map[$key] = 'red';
				}
			}

			if ( is_string( $value ) ) {
				$map[$key] = 'string';
			}
		}

		return $map;
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
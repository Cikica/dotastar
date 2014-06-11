<?php namespace Package\Hero;

class HeroDatabase {

	static function check_if_hero_pool_needs_updating_and_update_if_it_does () {

		$update_path = HeroDatabase::get_hero_update_file_path();
		$update      = HeroDatabase::get_json_file_and_parse_it(HeroDatabase::get_hero_update_file_path());

		if ( $update['update'] == 'yes' ) {

			$complete_hero_list = HeroDatabase::get_all_the_hero_names_in_the_pool();
			$heroes_to_update   = ( empty( $upate['heroes'] ) ? $complete_hero_list : $update['heroes'] );
			
			foreach ($heroes_to_update as $hero) {
				HeroDatabase::set_hero_from_path($hero);
			}
			\RED::set( 'hero#list',  $complete_hero_list );

			$update['update']      = "no";
			$update['last_update'] = date('d-m-Y');
			$update['heroes']      = array();
			\File::put($update_path, json_encode($update) );
		}
	}

	static function get ( $who ) {
		return \RED::get("hero#$who");
	}

	static function set_hero_from_path ( $hero_name ) {
		\RED::set( 
			"hero#$hero_name", 
			HeroDatabase::get_hero_definition_from_pool( $hero_name )
		);
	}
	static function get_hero_definition_from_pool ( $hero_name ) {
		return HeroDatabase::get_json_file_and_parse_it( HeroDatabase::get_hero_pool_path() . "/$hero_name.json" );
	}

	static function get_all_the_hero_names_in_the_pool () {
		
		$file_paths     = \File::files(HeroDatabase::get_hero_pool_path());
		$hero_names     = value( function () use ($file_paths) { 
			$names = array();
			foreach ($file_paths as $path) {
				$names[] = str_replace('.json', '', last(explode("/", $path) ) );
			}
			return $names;
		});

		return $hero_names;
	}

	static function get_json_file_and_parse_it ($file_path) {
		$value = json_decode(\File::get($file_path), true);
		if ( empty($value) ) { 
			throw new \Exception("The file $file_path; is invalid json, check it and make sure its valid.");
		} else {
			return $value;
		}
	}

	protected static function get_hero_update_file_path () {
		return app_path() . '/lib/Package/Hero/update.json';
	}

	protected static function get_hero_pool_path () {
		return app_path() . '/lib/Package/Hero/HeroPool';
	}
}
	
?>
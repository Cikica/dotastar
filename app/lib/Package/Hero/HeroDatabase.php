<?php namespace Package\Hero;

class HeroDatabase {

	static function check_if_hero_pool_needs_updating_and_update_if_it_does () {

		$update_path = HeroDatabase::get_hero_update_file_path();
		$update      = HeroDatabase::get_json_file_and_parse_it(HeroDatabase::get_hero_update_file_path());
		

		if ( $update->update == 'yes' ) {
			HeroDatabase::update_hero_pool($update->heroes);
			$update->update      = "no";
			$update->last_update = date('d-m-Y');
			$update->heroes      = array();
			\File::put($update_path, json_encode($update) );
		}
	}

	static function update_hero_pool ($heroes) {
		$heroes_to_update = HeroDatabase::get_hero_pool_files_as_objects_for_allowed_heroes($heroes);
		print_r($heroes_to_update);
	}

	static function set_hero_values_based_on_definition ($definition) {
		print_r(HeroDatabase::convert_hero_pool_files_into_objects());
	}

	static function get_hero_pool_files_as_objects_for_allowed_heroes ($allowed_heroes) {

		$hero_objects   = array();
		$file_paths     = \File::files(HeroDatabase::get_hero_pool_path());
		$hero_names     = value( function () use ($file_paths) { 
			$names = array();
			foreach ($file_paths as $path) {
				$names[] = str_replace('.json', '', last(explode("/", $path) ) );
			}
			return $names;
		});
		$allowed_heroes = ( empty( $allowed_heroes ) ? $hero_names : $allowed_heroes );

		foreach ($allowed_heroes as $hero) {
			$hero_objects= array_set( 
				$hero_objects, 
				$hero, 
				HeroDatabase::get_json_file_and_parse_it($file_paths[array_search($hero, $hero_names)])
			);
		}

		return $hero_objects;
	}

	static function get_json_file_and_parse_it ($file_path) {
		return json_decode(\File::get($file_path));
	}

	static function get_hero_update_file_path () {
		return app_path() . '/lib/Package/Hero/update.json';
	}

	static function get_hero_pool_path () {
		return app_path() . '/lib/Package/Hero/HeroPool';
	}
}
	
?>
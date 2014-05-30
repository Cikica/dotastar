<?php namespace Package\Hero;

class HeroDatabase {

	static function update_hero_pool () {
		$hero_pool_directory = app_path() . '/lib/Package/Hero/HeroPool';
		return \File::files( $hero_pool_directory );

	}
}
	
?>
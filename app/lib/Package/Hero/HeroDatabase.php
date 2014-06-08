<?php namespace Package\Hero;

class HeroDatabase {

	static function check_if_hero_pool_needs_updating_and_update_if_it_does () {

		$update_path = HeroDatabase::get_hero_update_file_path();
		$update      = HeroDatabase::get_json_file_and_parse_it(HeroDatabase::get_hero_update_file_path());

		if ( $update->update == 'yes' ) {

			$heroes_to_update = HeroDatabase::get_hero_pool_files_as_objects_for_allowed_heroes($update->heroes);
			foreach ($heroes_to_update as $hero) {
				HeroDatabase::set_hero($hero);
			}
			$update->update      = "no";
			$update->last_update = date('d-m-Y');
			$update->heroes      = array();
			\File::put($update_path, json_encode($update) );
		}
	}

	static function get ( $who ) {

		$hero                = [];
		$entry               = "hero:$who";
		$hero['name']        = \Redis::get("$entry:name");
		$hero['class']       = \Redis::get("$entry:class");
		$hero['story']       = \Redis::get("$entry:story");
		$hero['speed']       = \Redis::get("$entry:speed");
		$hero['damage']      = \Redis::get("$entry:damage");
		$hero['armor']       = \Redis::get("$entry:armor");
		$hero['mana']        = \Redis::get("$entry:mana");
		$hero['health']      = \Redis::get("$entry:health");
		$hero['range']       = \Redis::get("$entry:range");
		$hero['sight']       = \Redis::get("$entry:sight");
		$hero['missle']      = \Redis::get("$entry:missle");
		$hero['attribute']   = \Redis::get("$entry:attribute");
		$hero['strength']    = \Redis::hgetall("$entry:strength");
		$hero['agility']     = \Redis::hgetall("$entry:agility");
		$hero['inteligence'] = \Redis::hgetall("$entry:inteligence");
		$hero['spells']      = HeroDatabase::get_spells($who);
		
		return $hero;
	}

	static function get_spells ($for) {
		$spell_names = \Redis::smembers("hero:$for:spell_names");
		$spells = [];
		foreach ( $spell_names as $name ) {
			$spells[$name] = HeroDatabase::get_spell([ 
				'hero' => $for, 
				'spell' => $name
			]);
		}
		return $spells;
	}

	static function get_spell ($for) {

		$spell_entry = "hero:{$for['hero']}:spells:{$for['spell']}";

		return [
			"name"        => \Redis::get("$spell_entry:name"),
			"description" => \Redis::get("$spell_entry:description"),
			"notes"       => \Redis::get("$spell_entry:notes"),
			"ultimate"    => \Redis::get("$spell_entry:ultimate"),
			"stats"       => \Redis::hgetall("$spell_entry:stats")
		];
	}

	static function set_hero ( $hero ) {

		$entry = "hero:{$hero->alias}";
		
		\Redis::set("$entry:name", $hero->name );
		\Redis::set("$entry:class", $hero->class );
		\Redis::set("$entry:story", $hero->story );
		\Redis::set("$entry:speed", $hero->speed );
		\Redis::set("$entry:damage", $hero->damage );
		\Redis::set("$entry:armor", $hero->armor );
		\Redis::set("$entry:mana", $hero->mana );
		\Redis::set("$entry:health", $hero->health );
		\Redis::set("$entry:range", $hero->range );
		\Redis::set("$entry:sight", $hero->sight );
		\Redis::set("$entry:missle", $hero->missle );
		\Redis::set("$entry:attribute", $hero->attribute );
		\Redis::hset("$entry:strength", 'starting', $hero->strength->starting );
		\Redis::hset("$entry:strength", 'gain', $hero->strength->gain  );
		\Redis::hset("$entry:agility", 'starting', $hero->agility->starting );
		\Redis::hset("$entry:agility", 'gain', $hero->agility->gain  );
		\Redis::hset("$entry:inteligence", 'starting', $hero->inteligence->starting );
		\Redis::hset("$entry:inteligence", 'gain', $hero->inteligence->gain  );
		HeroDatabase::set_spells($entry, $hero->spells );
	}

	static function set_spells ( $entry, $spells ) {

		\Redis::sadd(
			"$entry:spell_names", 
			HeroDatabase::return_all_keys_of_an_hash_array_in_an_aray($spells) 
		);

		foreach ($spells as $spell_name => $spell ) {
			if ( is_array( $spell ) ) {
				foreach ( $spell as $nested_spell ) {
					HeroDatabase::set_spell( 
						"$entry:spells:$spell_name", 
						strtolower( str_replace(' ', '_', $nested_spell->name ) ), 
						$nested_spell 
					);
				}
			} else { 
				HeroDatabase::set_spell( "$entry:spells", $spell_name, $spell );
			}
		}

	}

	static function set_spell ($entry, $spell_name, $spell) {

		\Redis::set("$entry:$spell_name:name", $spell->name );
		\Redis::set("$entry:$spell_name:description", $spell->description );
		\Redis::set("$entry:$spell_name:notes", $spell->notes );
		\Redis::set("$entry:$spell_name:ultimate", ( isset( $spell->ultimate ) ? $spell->ultimate : 'false' ) );

		foreach ( $spell->stats as $stat_name => $stat_value ) { 
			\Redis::hset("$entry:$spell_name:stats", $stat_name, $stat_value );
		}
	}

	protected static function return_all_keys_of_an_hash_array_in_an_aray ($hash) {
		$keys = [];
		foreach ($hash as $key => $value) {
			$keys[] = $key;
		}
		return $keys;
	}

	protected static function get_hero_pool_files_as_objects_for_allowed_heroes ($allowed_heroes) {

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
		$value = json_decode(\File::get($file_path));
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
<?php

class HeroTest extends TestCase {

	public function testSetHeroFromPath () {
		$hero_definition = Hero::get_hero_definition_from_pool('kunkka');
		Hero::set_hero_from_path('kunkka');
		$this->assertEquals( $hero_definition, RED::get("hero#kunkka") );
	}

}

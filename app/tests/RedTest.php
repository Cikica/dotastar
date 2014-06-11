<?php

class RedTest extends TestCase {

	public function testGetSingleKeyValueBasedOnMapKey () {
		$data = [
			"level1" => "stuff", 
			"level2" => ["stuff"],
			"level3" => [
				"s" => "stuff"
			]
		];
		RED::set( "redtr", $data );
		$this->assertEquals( 
			$data['level1'],
			RED::get_single_key_value_based_on_map_key([
				'type' => 'string',
				'path' => 'redtr:level1'
			])
		);
		$this->assertEquals( 
			$data['level2'],
			RED::get_single_key_value_based_on_map_key([
				'type' => 'list',
				'path' => 'redtr:level2'
			])
		);
		$this->assertEquals( 
			$data['level3'],
			RED::get_single_key_value_based_on_map_key([
				'type' => 'hash',
				'path' => 'redtr:level3'
			])
		);
	}

	public function testCreateObjectOutOfKeyMap () {
		$data = [
			"level1" => "stuff", 
			"level2" => ["stuff"],
			"level3" => [
				"s" => "stuff"
			]
		];
		$map = [
			"redtr:level1" => "string",
			"redtr:level2" => "list",
			"redtr:level3" => "hash"
		];
		RED::set( "redtr", $data );
		$this->assertEquals( $data, RED::get_multi_dimensional_array_out_of_a_key_map([
			'map'  => $map,
			'root' => 'redtr'
		]));
	}

	public function testGet () {
		$data = [
			"level1" => "stuff", 
			"level2" => ["stuff"],
			"level3" => [
				"s" => "stuff"
			]
		];
		RED::set( "redtr", $data );
		$this->assertEquals( $data['level1'], RED::get( "redtr:level1" ) );
		$this->assertEquals( $data['level2'], RED::get( "redtr:level2" ) );
		$this->assertEquals( $data['level3'], RED::get( "redtr:level3" ) );
		$this->assertEquals( $data, RED::get( "redtr" ) );
		$this->assertEquals( $data, RED::get( "redtr:" ) );
	}

	public function testGetKeyMap () {

		RED::set( "redtr", [
			"level1" => "stuff", 
			"level2" => ["stuff"],
			"level3" => [
				"s" => "stuff"
			],
		]);

		$expected_map = [
			"redtr:level1" => "string",
			"redtr:level2" => "list",
			"redtr:level3" => "hash"
		];

		$this->assertEquals( $expected_map, RED::get_key_map( "redtr" ) );
		$this->assertEquals( $expected_map, RED::get_key_map( "redtr:level1" ) );

		Redis::del("redtr:level2");
	}

	public function testSet () {

		RED::set( "redts", "this is string" );
		RED::set( "redtl", ["stuff", "stuff"] );
		RED::set( "redth", ["s"=>"stuff", "d"=>"stuff"] );
		RED::set( "redtr", [
			"level1" => "stuff", 
			"level2" => ["stuff"],
			"level3" => [
				"s" => "stuff"
			],
		]);

		$this->assertEquals( "this is string" , Redis::get( "redts" ) );
		$this->assertEquals( ["stuff", "stuff"] , Redis::lrange( "redtl", 0, -1 ) );
		$this->assertEquals( ["s"=>"stuff", "d"=>"stuff"] , Redis::hgetall( "redth" ) );
		$this->assertEquals( "stuff" , Redis::get( "redtr:level1" ) );
		$this->assertEquals( ["stuff"] , Redis::lrange( "redtr:level2", 0, -1 ) );
		$this->assertEquals( [ "s" => "stuff" ] , Redis::hgetall( "redtr:level3" ) );

	}

	public function testSetHash () {
		$hash = [
			"key" => "red_test_hash",
			"value" => [
				"key1" => "some stuff",
				"key2" => "some other stuff"
			]
		];

		Redis::del("red_test_hash");
		RED::set_hash($hash);
		$this->assertEquals( $hash['value'], Redis::hgetall( $hash['key'] ) );
	}

	public function testIsKeyMultiDimensional () {
		$this->assertFalse( RED::is_key_multi_dimensional( "key" ) );
		$this->assertFalse( RED::is_key_multi_dimensional( "key:" ) );
		$this->assertTrue( RED::is_key_multi_dimensional( "key:somestuff" ) );
	}
	
	public function testObjectMapCreation()
	{	
		$data = json_decode('{
			"base1" : {
				"name" : "stuff",
				"age" : "other"
			},
			"base12" : "stuff",
			"base13" : [ "stuff", "stuff2" ],
			"base14" : {
				"root2" : "string",
				"root1" : { 
					"name" : "stuff"
				},
				"root3" : {
					"base22" : "string",
					"base21" : {
						"root4" : "stuff"
					}
				}
			}
		}', true );

		$the_map       = RED::map_data($data);
		$expected_type = [
			"base12"              => "string",
			"base1"               => "hash",
			"base13"              => "list",
			"base14:root2"        => "string",
			"base14:root1"        => "hash",
			"base14:root3:base22" => "string",
			"base14:root3:base21" => "hash",
		];
		$expected_value = [
			"base1"               => [ "name" => "stuff", "age"  => "other" ],
			"base12"              => "stuff",
			"base13"              => ["stuff", "stuff2"],
			"base14:root2"        => "string",
			"base14:root1"        => [ "name" => "stuff" ],
			"base14:root3:base22" => "string",
			"base14:root3:base21" => [ "root4" => "stuff" ],
		];

		$this->assertEquals( $expected_type, $the_map['type'] );
		$this->assertEquals( $expected_value, $the_map['value'] );
		$this->assertEquals(
			[
				'type'  => [
					"" => "list"
				],
				'value' => [
					"" => ["stuff", "other stuff", "stuff stuff"]
				]
			],
			RED::map_data( ["stuff", "other stuff", "stuff stuff"] )
		);
	}

	public function testRecoginzeTheRightDataTypeForValues () {
		
		$this->assertEquals([
			'sequential'        => false,
			'multi_dimensional' => false,
			'key_value'         => false,
			'string'            => true,
		],
			RED::get_the_data_types_of_this_value( "some value" )
		);

		$this->assertEquals( [
			'sequential'        => true,
			'multi_dimensional' => false,
			'key_value'         => false,
			'string'            => false,
		],
			RED::get_the_data_types_of_this_value(  [1,2,3,4,"a"] )
		);

		$this->assertEquals([
			'sequential'        => false,
			'multi_dimensional' => false,
			'key_value'         => true,
			'string'            => false,
		],
			RED::get_the_data_types_of_this_value( ["a" => 2, "b" => 4 ] )
		); 

		$this->assertEquals([
			'sequential'        => false,
			'multi_dimensional' => true,
			'key_value'         => true,
			'string'            => false,
		],
			RED::get_the_data_types_of_this_value( ["a" => 2, "b" => 4, "c" => [1,3,4] ] )
		);

		$this->assertEquals([
			'sequential'        => true,
			'multi_dimensional' => true,
			'key_value'         => false,
			'string'            => false,
		],
			RED::get_the_data_types_of_this_value( [2, 4, [1,3,4] ] )
		);
	}

	public function testIsArraySequential () {
		$seq = ["a","b","c"];
		$ass = [
			"a" => "b",
			"d" => "c"
		];
		$this->assertTrue( RED::is_this_array_sequential($seq) );
		$this->assertFalse( RED::is_this_array_sequential($ass) );
	}

	public function testIsArrayMultiDimensional () {

		$this->assertFalse( RED::is_this_array_multi_dimensional( ["a", "b", "c"] ) );
		$this->assertTrue( RED::is_this_array_multi_dimensional( ["a", ["b", "c"], "c" ] ) );
	}

}

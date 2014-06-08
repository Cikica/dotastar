<?php

class RedTest extends TestCase {
	
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
				"root1" : { 
					"name" : "stuff"
				}
			}
		}', true );

		$the_map  = RED::map_data($data);
		$expected = [
			"base12" => "string",
			"base1"  => "hash",
			"base13" => "list",
			"base14" => "red"
		];
		$this->assertEquals( $expected, $the_map );
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

<?php namespace Cikica\Red;

use Illuminate\Support\Facades\Facade;
/**
* RED facade
*/
class RedFacade extends Facade {
	
	
	protected static function getFacadeAccessor () {
		return 'RED';
	}

}
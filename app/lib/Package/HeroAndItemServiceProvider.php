<?php namespace Package;

use Illuminate\Support\ServiceProvider;

class HeroAndItemServiceProvider extends ServiceProvider {

	public function register () {

		$this->app->bind("Hero", function () { 
			return new HeroDatabase();
		});
	}
	
}
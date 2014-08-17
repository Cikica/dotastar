<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function()
{
	return View::make('login');
});

Route::get('/hero/{name}', function($hero_name)
{
	return View::make('view-heroes', array(
		'hero'   => str_replace("'", "\'", json_encode( Hero::get( $hero_name ) ) ),
		'heroes' => json_encode( RED::get('hero#list') )
	));
});

Route::get('/build/{name}', function($hero_name)
{
	return View::make('build-hero', array(
		'hero'   => str_replace("'", "\'", json_encode( Hero::get( $hero_name ) ) ),
	));
});
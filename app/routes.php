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

// Route::get('build/{name}', function ( $hero_name ) 
// { 

// });

// Route::get('find/{what}/{identity}', function ( $what, $identity ) 
// { 
	
// });

// Route::get('hub', function () 
// { 

// });
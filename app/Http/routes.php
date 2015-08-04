<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

get('stories', 'StoriesController@index');
Route::get('/', 'StoriesController@begin');
Route::get('/story/{id}', ['uses' =>'StoriesController@show']);
Route::get('/get_subtree/{id}', ['uses' =>'StoriesController@getSubtree']);
Route::post('/store', 'StoriesController@store');

Route::get('home', 'StoriesController@begin');
Route::get('welcome', 'WelcomeController@welcome');

Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);

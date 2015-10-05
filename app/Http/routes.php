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

//START
Route::get('/', 'StoriesController@begin');

//Stories
//Route::get('/story/{id}', ['uses' =>'StoriesController@show']);
Route::get('/get_subtree/{id}/{depth}', ['uses' =>'StoriesController@getSubtree']);
Route::get('/update_current_line/{id}', ['uses' =>'StoriesController@updateCurrentLine']);
Route::post('/store', 'StoriesController@store');
//**DANGEROUS**
Route::get('/destroy_line/{id}', 'StoriesController@destroy');

//DISABLE IF NOT IN USE *LOTS OF DANGER*
//Route::get('/reset_prestige', ['uses' =>'StoriesController@resetPrestige']);
//Route::get('/reset_story_visits', ['uses' =>'StoriesController@resetStoryVisits']);

//Email Validation
Route::get('/validate/{validation_key}', ['uses' =>'UsersController@validateEmail']);
Route::get('/send_validation_email', 'UsersController@sendValidationEmail');

//Email List
Route::get('/opt_out', 'UsersController@optOut');
Route::get('/opt_in', 'UsersController@optIn');

//Registration
Route::get('/on_register', 'UsersController@onRegister');

//Users
Route::get('/build_story/{id}', 'StoriesController@buildStory');
Route::get('/build_line_ids/{id}', 'UsersController@buildLineIDs');
//**DANGEROUS**
Route::get('/destroy_user/{id}', 'UsersController@destroy');

//Preferences
Route::post('/update_prefs', 'UsersController@updatePreferences');


Route::get('home', 'WelcomeController@index');
//Route::get('home', 'StoriesController@begin');
Route::get('settings', 'UsersController@settings');

Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);

<?php namespace App\Services;

use App\User;
use Validator;
use UsersController;
use Illuminate\Contracts\Auth\Registrar as RegistrarContract;

class Registrar implements RegistrarContract {

	/**
	 * Get a validator for an incoming registration request.
	 *
	 * @param  array  $data
	 * @return \Illuminate\Contracts\Validation\Validator
	 */
	public function validator(array $data)
	{
		return Validator::make($data, [
			'name' => 'required|max:255',
			'email' => 'required|email|max:255|unique:users',
			'password' => 'required|confirmed|min:6',
		]);
	}

	/**
	 * Create a new user instance after a valid registration.
	 *
	 * @param  array  $data
	 * @return User
	 */
	public function create(array $data)
	{
		return User::create([
			'name' => $data['name'],
			'email' => $data['email'],
            'line_ids' => "",
            'rank' => 0,
            'prestige' => 0,
            'experience' => 0,
            'preferences' => "",
            'current_line' => 1,
			'password' => bcrypt($data['password']),
            'validation_key' => md5(uniqid(rand(), true)),
		]);
	}

}

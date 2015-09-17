<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Auth;
use Mail;

use Illuminate\Http\Request;

class UsersController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		//
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		//
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}
    
    public function sendVerificationEmail() {
        $user = null;
        try {
            Mail::send('emails.verification', ['user' => $user] , function ($m)  use ($user){
                $m->from('us@example.com', 'Laravel');
                $m->to('karoantonio@gmail.com', 'Hamurabi')->subject('I am seeking warmth peoples!');
            });
        } catch (Exception $e) {
            dd('Errrrrp');
        }
        
        return 'Success!';
    }
    
    public function settings()
    {
        $optStatus = Auth::user()->wants_mail;
        return view('settings',compact('optStatus'));
    }
    
    /**
	 * Opt out of the mail list
	 *
	 * @param  int  $id
	 * @return Response
	 */
    public function optOut()
    {
        Auth::user()->wants_mail = 0;
        Auth::user()->save();
        return Auth::user()->wants_mail;
    }
    
    public function optIn()
    {
        Auth::user()->wants_mail = 1;
        Auth::user()->save();
        return Auth::user()->wants_mail;
    }

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}

}

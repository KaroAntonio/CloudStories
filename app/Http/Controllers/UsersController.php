<?php namespace App\Http\Controllers;

use App\User;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Auth;
use Mail;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

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
    
    public function sendAdminNotification() {
        $user = Auth::user();
        try {
            Mail::send('emails.new_cvltist', ['user' => $user] , function ($m)  use ($user){
                $m->from('mailbot@wrdcvlt.com', 'wrdcvlt');
                $m->to('karoantonio@gmail.com', 'The Cvlt')->subject('+1 Cvltists');
            });
        } catch (Exception $e) {
            dd('Validation Email Send Failure');
        }
    }
    
    public function sendValidationEmail() {
        $user = Auth::user();
        try {
            Mail::send('emails.validation', ['user' => $user] , function ($m)  use ($user){
                $m->from('mailbot@wrdcvlt.com', 'wrdcvlt');
                $m->to($user->email, 'The Cvlt')->subject('Prove yourself to the cvlt');
            });
        } catch (Exception $e) {
            dd('Validation Email Send Failure');
        }
    }
    
    public function updatePreferences(Request $request)
    {
        $preferences = $request->all();
        if (Auth::user() != null) {
            Auth::user()->preferences = json_encode($preferences);
            Auth::user()->save();
        }
        return response()->json($preferences);
    }
    
    public function onRegister()
    {
        $this->sendValidationEmail();
        $this->sendAdminNotification();
        return redirect('/');
    }
    
    public function validateEmail($validation_key) 
    {
        //Validate User Email
        if (Auth::user() != null) {
            if (Auth::user()->validation_key == $validation_key) {
                Auth::user()->validated = true;
                Auth::user()->save();
            } 
        } else {
            $msg = 'Log in and follow the validation link again to validate, please.';
            return view('auth.login', compact('msg'));
        }
        return redirect('/');
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
        if (Auth::user() == null) {
            return ('Who are you?');    
        }
        if (Auth::user()->id == 1) {
            $user = User::find($id);
            if ($user == null) 
                return ('user does not exist');
            $user->delete();
            return ($user->email." destroyed");
        } else {
            return ('You do not have that power');
        }
	}

}

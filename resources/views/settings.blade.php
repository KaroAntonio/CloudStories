@extends('app')

@section('head')
<link rel="stylesheet" href="{{ URL::asset('css/settings.css') }}">
<meta name="_token" content="{{ csrf_token() }}"/>
@endsection

@section('content')
<div id="centered">
<div id="prefs_container" class="">
{{Auth::user()->name}} 
{{Auth::user()->email}} 
@if(!Auth::user()->validated)
<div class="inline">
<div id="resend" class="button action" onclick="sendValidationEmail()">
    ->resend validation link
</div>
</div>
@endif
<div id="tipToggle" class="button" onclick="toggleTipStatus()"></div>
<div class="inline">Email List: </div>
<div id="optToggle" class="button inline" onclick="toggleOptStatus()"></div>
<div class="button words_link">
    <a href="{{ url('/') }}"> back to the words </a>
</div>
</div>
</div>
<script src="js/0_resource.min.js" type="text/javascript"></script>
<!--
<script src="js/helpers.js" type="text/javascript"></script>
-->
<script>
var optStatus = JSON.parse("{{ $optStatus }}");
var user = <?php echo json_encode(Auth::user()); ?>;

var preferences;
try {
    preferences = JSON.parse(user.preferences);
} catch (e){
    preferences = {}
}
    
initPrefs(preferences) 
displayPrefs()

function initPrefs(p) {
    //initialize uninitialize prefs
    if (!('tips_enabled' in p))
        p['tips_enabled'] = true;
    else {
        if (p['tips_enabled'] === "true")
            p['tips_enabled'] = true;
        else p['tips_enabled'] = false;
    }
    return p;
}

function displayPrefs() {
    displayOptStatus()
    displayTipStatus()
}
    
function sendValidationEmail() {
    var sending = $.get( 'send_validation_email' );
    sending.done(function( data ) {
        $('#resend')[0].innerHTML += "...sent"
    });
}

function displayOptStatus() {
    if (optStatus == 1) $('#optToggle')[0].innerHTML = "Opt Out";
    else $('#optToggle')[0].innerHTML = "Opt In";
}

function displayTipStatus() {
    if (preferences['tips_enabled'] == true) $('#tipToggle')[0].innerHTML = "Disable Tips";
    else $('#tipToggle')[0].innerHTML = "Enable Tips";
}
    
function toggleOptStatus() {
    if (optStatus == 1) optOut();
    else optIn();
}

function toggleTipStatus() {
    if (preferences['tips_enabled'] == true) preferences['tips_enabled'] = false;
    else preferences['tips_enabled'] = true;
    displayTipStatus();
    postPreferences(preferences);
}
    
function optOut() {
    var getOut = $.get( 'opt_out' );
    getOut.done(function( data ) {
        optStatus = data;
        displayOptStatus()
    });
}

function optIn() {
    var getIn = $.get( 'opt_in' );
    getIn.done(function( data ) {
        optStatus = data;
        displayOptStatus()
    });
}    
    
</script>
@endsection
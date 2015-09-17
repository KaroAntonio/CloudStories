@extends('app')

@section('head')
<link rel="stylesheet" href="{{ URL::asset('css/settings.css') }}">
@endsection

@section('content')
<div id="centered">
<div id="container" class="">
<div class="inline">Email List: </div>
<div id="optToggle" class="button inline" onclick="toggleOptStatus()"></div>
<div class="button words_link">
    <a href="{{ url('/') }}"> back to the words </a>
</div>
</div>
</div>
<script>
    
var optStatus = JSON.parse("{{ $optStatus }}");
displayOptStatus()

function displayOptStatus() {
    if (optStatus == 1) $('#optToggle')[0].innerHTML = "Opt Out";
    else $('#optToggle')[0].innerHTML = "Opt In";
}
    
function toggleOptStatus() {
    if (optStatus == 1) optOut();
    else optIn();
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
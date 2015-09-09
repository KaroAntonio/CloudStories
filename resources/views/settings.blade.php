@extends('app')

@section('head')
<link rel="stylesheet" href="{{ URL::asset('css/settings.css') }}">
@endsection

@section('content')
<div id="centered">
<div id="opt_out" class="button" onclick="optOut()">Opt Out of Email</div>
<div class="button"> 
<a href="{{ url('/') }}"> back to the words </a>
</div>
</div>


<script>

function optOut() {
    var getOut = $.get( 'opt_out' );
    getOut.done(function( data ) {
        console.log("Fine.")
    });
}

</script>
@endsection
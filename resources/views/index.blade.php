@extends('app')

@section('head')
<!--<link rel="stylesheet" href="{{ URL::asset('css/style.css') }}">-->
<link rel="stylesheet" href="{{ URL::asset('css/lines.css') }}">
@endsection

@section('content')
@include('stories/lines')
<!--@include('content')-->
@endsection
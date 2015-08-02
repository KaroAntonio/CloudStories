@extends('app')

@section('head')
<link rel="stylesheet" href="{{ URL::asset('css/style.css') }}">
@endsection

@section('content')
@include('content')
@endsection
@extends('app')

@section('head')
<link rel="stylesheet" href="{{ URL::asset('css/lines.css') }}">
<link rel="stylesheet" href="{{ URL::asset('css/tree.css') }}">
@endsection

@section('content')
@include('content/lines')
@endsection

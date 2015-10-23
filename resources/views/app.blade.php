<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="_token" content="{{ csrf_token() }}"/>
    <meta property="og:image" content="http://wrdcvlt.com/assets/subliminal.gif" />
    <meta property="og:title" content="wrdcvlt" />
    <meta property="og:description" content="an internet stories" />
	<title>@include('content/title')</title>
    
	<link href="{{ asset('/css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('/css/auth.css') }}" rel="stylesheet">
    @yield('head')
	<!-- Fonts -->
	<link href='//fonts.googleapis.com/css?family=Roboto:400,300' rel='stylesheet' type='text/css'>

	<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
	<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
	<!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
		<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
	<![endif]-->
    @include('content/tracking')
</head>
<body>
    <!-- Scripts -->
	<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.1/js/bootstrap.min.js"></script>
    <script src="../js/countdown.min.js"></script>
    <!--<script src="https://raw.github.com/TimPietrusky/background-clip-text-polyfill/master/background-clip-text-polyfill.js"></script>-->
    <script>
    //Countdown to Kickstarter
    //http://countdownjs.org/readme.html
    var c = countdown( 
        new Date(2015, 9, 17),
        function (ts) {
            $('#countdown').html(ts.toString())
        },
        countdown.MONTHS | countdown.DAYS | countdown.HOURS|countdown.MINUTES|countdown.SECONDS,
        countdown.setLabels(
	' ms| s| m| h| D| W| M| Y| Dc| Ct| Ml',
	' ms| s| m| h| D| W| M| Y| Dc| Ct| Ml',
	' : ',
	' : ',
	' : ')
    );
    
        
    </script>
    
	<nav class="navbar navbar-default">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
					<span class="sr-only">Toggle Navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
			</div>

			<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                
				<ul class="nav navbar-nav">
					<li>
                        <!--
                        @if (Auth::guest())
                        <a  href="{{ url('/auth/register') }}">
                        
                        <img class="kickstarter-logo" src="../assets/kickstarter-logo-grey.png" 
onmouseover="this.src='../assets/kickstarter-logo-light.png'"
onmouseout="this.src='../assets/kickstarter-logo-grey.png'" />
                        <span class="kickstarter-logo-overlay"></span>
                        </a>
                        @else
                        <a  id="countdown" href="https://www.kickstarter.com/projects/2043140548/1156187219?token=de89b4d1">
                        </a>
                        @endif
                        -->
                    </li>
				</ul>
                
                
                @yield('navbar')
				<ul class="nav navbar-nav navbar-right">
					@if (Auth::guest())
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"> Anonymous <span class="caret"></span></a>
                    <ul class="dropdown-menu" role="menu">
						<li><a href="{{ url('/auth/login') }}">Login</a></li>
						<li><a href="{{ url('/auth/register') }}">Register</a></li>
                    </ul>
                    </li>
					@else
						<li class="dropdown">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">{{ Auth::user()->name }} <span class="caret"></span></a>
							<ul class="dropdown-menu" role="menu">
                                <li><a href="{{ url('/settings') }}">Preferences</a></li>
								<li><a href="{{ url('/auth/logout') }}">Logout</a></li>
							</ul>
						</li>
					@endif
				</ul>
			</div>
		</div>
	</nav>

	@yield('content')
	
</body>
</html>

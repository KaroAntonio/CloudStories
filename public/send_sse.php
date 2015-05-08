<?php

//use Session;
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

//generate random number for demonstration
//echo the new number
echo "data: New random number: " . number(). "\n\n";
flush();

function number() {
    session_start(); 
    $_SESSION["num"] = $_SESSION["num"] + 1;
    return $_SESSION["num"];
}
?>
<?php

header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

//generate random number for demonstration
//echo the new number
echo "data: " . json_encode(number()). "\n\n";
flush();

function number() {
    session_start(); 
    if (isset($_SESSION["lastUpdated"]))
    {
        return [$_SESSION["lastUpdated"], $_SESSION["newBranch"]];
    }    
}
?>
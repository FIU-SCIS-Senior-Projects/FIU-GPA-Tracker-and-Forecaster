<?php
include_once 'db_connect.php';
include_once 'functions.php';
 

echo "logging in...";
sec_session_start(); // secure way of starting a PHP session.
 
if (isset($_POST['username'], $_POST['password'])) {
    $username = $_POST['username'];
    $password = $_POST['password']; // The hashed password.


    if (login($username, $password, $mysqli) == true) {
        
       // Login success 
        header('Location: ../#');
  
    } else {
        // Login failed 
        header('Location: ../index.php?error=1');
  
    }

echo "end";
} else {
    // The correct POST variables were not sent to this page. 
    echo "Invalid Request";
}


?>

<?php
include_once 'psl-config.php';
include_once 'functions.php';

sec_session_start();

if(isset($_SESSION['username']))
{
    $username = $_SESSION['username'];
    $conn = new mysqli(HOST, USER, PASSWORD, DATABASE);
    if($stmt = $conn->prepare("SELECT *
                               From admin
                               Where username = ?")) {
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $stmt->store_result();
        $stmt->bind_result($username);
        $stmt->fetch();

        if ($stmt->num_rows() > 0) {
            echo "<li><a href=#>Admin</a></li>";
        }
    }

    echo "<li><a href=#>GPA Dashboard</a></li>";
    echo "<li><a href=\"../sem_dashboard/current.html\">Grade Dashboard</a></li>";
    echo "<li><a href=#>Logout</a></li>";
}
else
{
    echo "<li><a href=\"register.html\">Register</a></li>";
    echo "<li><a href=\"../login.html\">Log in</a></li>";
    echo "<li><a href=#>About</a></li>";
}
?>

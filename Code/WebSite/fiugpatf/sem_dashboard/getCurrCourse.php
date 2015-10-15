<?php
//include_once 'db_connect.php';
//include_once 'functions.php';

//sec_session_start();

$session_name = 'sec_session_id';   // Set a custom session name
$secure = FALSE;
// This stops JavaScript being able to access the session id.
$httponly = true;
// Forces sessions to only use cookies.
if (ini_set('session.use_only_cookies', 1) === FALSE) {
    header("Location: ../error.php?err=Could not initiate a safe session (ini_set)");
    exit();
}
// Gets current cookies params.

$cookieParams = session_get_cookie_params();
session_set_cookie_params($cookieParams["lifetime"],
    $cookieParams["path"],
    $cookieParams["domain"],
    $secure,
    $httponly);
// Sets the session name to the one set above.
session_name($session_name);
session_start();

if (isset($_POST['action'])) {
    $action = $_POST['action'];
} else {
    $action = "";
}

if($action == "currCourses") {
    if (isset($_SESSION['username'])) {
        $mysqli = new mysqli("localhost","sec_user","Uzg82t=u%#bNgPJw","GPA_Tracker");
        $user = $_SESSION['username'];
        $stmt = $mysqli->prepare("SELECT courseID, course_name, credits
                          FROM   course_info
                          WHERE  courseID in (select courseID
                                              from   student_course
                                              where  grade = 'IP' AND username = ?)");

        $stmt->bind_param('s', $user);
        $stmt->execute();
        $stmt->bind_result($coid, $con, $credit);
        $output = array();
        while ($stmt->fetch()) {
            array_push($output, array($coid, $con, $credit));
        }
        echo json_encode($output);

    } else {
        echo "log in";
      }
}

if($action == 'remove')
{
    if(isset($_SESSION['username']) AND isset($_POST['id']))
    {
        $mysqli = new mysqli("localhost","root","sqliscool","GPA_Tracker");
        $user = $_SESSION['username'];
        $stmt = $mysqli->prepare("Delete from student_course WHERE username = ? AND courseID = ?");
        $stmt->bind_param('ss', $user, $_POST['id']);
        $stmt->execute();
        echo "true";
    }
}

if($action == 'add_breakdown')
{

}

if(isset($_GET['action']))
{
    if($_GET['action'] = table)
    {

    }
}
?>

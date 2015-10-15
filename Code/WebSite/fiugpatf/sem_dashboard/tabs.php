<?php
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

if($_POST['action'] == 'tabs')
{
    if(isset($_SESSION['username']))
    {
        $mysqli = new mysqli("localhost","sec_user","Uzg82t=u%#bNgPJw","GPA_Tracker");
        $user = $_SESSION['username'];
        $stmt = $mysqli->prepare("SELECT assessment
                                  FROM   assessment_type
                                  WHERE  username = ? and courseID = ?");
        $stmt->bind_param('ss', $user, $_POST['course']);
        $stmt->execute();
        $stmt->bind_result($assesments);
        $assesArray = array();
        while($stmt->fetch())
        {
            array_push($assesArray, $assesments);
        }

        echo json_encode($assesArray);
    }
}

if($_POST['action'] == 'add')
{
    if(isset($_SESSION['username']))
    {
        $mysqli = new mysqli("localhost","sec_user","Uzg82t=u%#bNgPJw","GPA_Tracker");
        $user = $_SESSION['username'];
        $stmt = $mysqli->prepare("INSERT into assessment_type (username, courseID, assessment, percentage) VALUES (?, ?, ?, ?)");
        $stmt->bind_param('ssss', $user, $_POST['course'], $_POST['assesment'], $_POST['percentage']);
        if($stmt->execute())
        {
            echo 'true';
        }
        else
        {
            echo 'false';
        }
    }
}

if($_POST['action'] == 'addGrade')
{
    if(isset($_SESSION['username']))
    {
        $mysqli = new mysqli("localhost","sec_user","Uzg82t=u%#bNgPJw","GPA_Tracker");
        $user = $_SESSION['username'];
        $stmt = $mysqli->prepare("INSERT into assessment (username, courseID, assessment, grade) VALUES (?, ?, ?, ?)");
        $stmt->bind_param('ssss', $user, $_POST['course'], $_POST['assesment'], $_POST['grade']);
        if($stmt->execute())
        {
            echo 'true';
        }
        else
        {
            echo 'false';
        }
    }
}

if($_POST['action'] == 'getGrades')
{
    if(isset($_SESSION['username']))
    {
        $mysqli = new mysqli("localhost","sec_user","Uzg82t=u%#bNgPJw","GPA_Tracker");
        $user = $_SESSION['username'];
        $stmt = $mysqli->prepare("SELECT grade
                                  FROM   assessment
                                  WHERE  username = ? and courseID = ? and assessment = ?");
        $stmt->bind_param('sss', $user, $_POST['course'], $_POST['assessment']);
        $stmt->execute();
        $stmt->bind_result($grades);
        $output = array();
        $index = 1;
        while($stmt->fetch())
        {
            array_push($output, array("Grade" . $index, $grades));
            $index++;
        }
        echo json_encode($output);
        unset($_POST['assessment']);
    }
}

if($_POST['action'] == 'removeGrade')
{
    if(isset($_SESSION['username']))
    {
        $mysqli = new mysqli("localhost","root","sqliscool","GPA_Tracker");
        $user = $_SESSION['username'];
        $stmt = $mysqli->prepare("Delete from assessment WHERE username = ? AND courseID = ? AND grade = ? AND assessment = ?");
        $stmt->bind_param('ssss', $user, $_POST['course'], $_POST['grade'], $_POST['assessment']);
        $stmt->execute();
        echo "true";
    }
    else
    {
        echo "false";
    }
}

if($_POST['action'] == 'modifyGrade')
{
    if(isset($_SESSION['username']))
    {
        $mysqli = new mysqli("localhost","root","sqliscool","GPA_Tracker");
        $user = $_SESSION['username'];
        $stmt = $mysqli->prepare("UPDATE assessment
                                  SET grade = ?
                                  WHERE username = ? AND courseID = ? AND grade = ? AND assessment = ?");
        $stmt->bind_param('sssss', $_POST['newGrade'], $user, $_POST['course'], $_POST['grade'], $_POST['assessment']);
        $stmt->execute();
        echo "true";
    }
}

if($_POST['action'] == 'removeBucket')
{
    if(isset($_SESSION['username']))
    {
        $mysqli = new mysqli("localhost","root","sqliscool","GPA_Tracker");
        $user = $_SESSION['username'];
        $stmt = $mysqli->prepare("DELETE from assessment_type where username = ? and courseID = ? and assessment = ?");
        $stmt->bind_param('sss', $user, $_POST['course'], $_POST['assessment']);
        $stmt->execute();
        echo "true";
    }
}
?>
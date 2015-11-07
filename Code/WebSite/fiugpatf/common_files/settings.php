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

if (isset($_POST['action'])) {
    $action = $_POST['action'];
} else {
    $action = "";
}

if($action == "prepareTable") {
	if (isset($_SESSION['username'])) {
		$output = array();
		array_push($output, array("Change Password", ""));
		array_push($output, array("Change Major", ""));
		array_push($output, array("Change Themes", ""));
		array_push($output, array("Export Data", '<button type="button" id="ExportButton">Export Data</button>'));
<<<<<<< HEAD
		array_push($output, array("Import Data", '<input type="file" id="ImportFile">'));
		//array_push($output, array("Import Whatif", '<input type="file" id="Whatif">'));
=======
>>>>>>> Story 733: Current Semester GUI improvements Set 1

		echo json_encode($output);
	}
}

if($action == "exportData") {
	if (isset($_SESSION['username'])) {
		$user = $_SESSION['username'];
		$dump = shell_exec('mysqldump --user=root --password=sqliscool --host=localhost --no-create-info --xml GPA_Tracker student_data --where="Username = \'' . $user . '\'" student_course --where="username=\'' . $user . '\'" student_major --where="username=\'' . $user . '\'" assessment_type --where="username=\'' . $user . '\'" assessment --where="username=\'' . $user . '\'"');
		echo $dump;
	}
}
<<<<<<< HEAD

if($action == "importData") {
	if(isset($_SESSION['username'])){
		$xml = simplexml_load_string($_POST['file']);
		if($xml === false)
		{
			echo "Failed loading XML: ";
    		foreach(libxml_get_errors() as $error) {
        		echo "<br>", $error->message;
			}
		}
		else
		{
			if($xml->database[0]['name'] == 'GPA_Tracker'){
				if(validate_and_insert_data($xml)) {
					echo "true";
				}
				else
				{
					echo "Error!";
				}
			}
			else {
				echo "Data can only be inserted into GPA_Tracker.";
			}
		}
	}
}

/*if($action == "importWhatif") {
	if(isset($_SESSION['username'])){
		$filename = $_SESSION['username'] . 'Whatif';
		$wifile = fopen($filename, $_POST['file']);
		fwrite($wifile, $wifile);
		fclose($filename);
		$xml = simplexml_load_string(shell_exec('python3 WhatIfParser.py ' . $_SESSION['username'] . ' ' . $filename));
		if($xml === false)
		{
			echo "Failed loading XML: ";
    		foreach(libxml_get_errors() as $error) {
        		echo "<br>", $error->message;
			}
		}
		else
		{
			if($xml->database[0]['name'] == 'GPA_Tracker'){
				if(insert_student_data($xml)) {
					echo "true";
				}
				else
				{
					echo "Error!";
				}
			}
			else {
				echo "Data can only be inserted into GPA_Tracker.";
			}
		}
		shell_exec('rm ' . $filename)
	}
}*/

function validate_and_insert_data($xml)
{
	$mysqli = new mysqli("localhost","sec_user","Uzg82t=u%#bNgPJw","GPA_Tracker");
	$user = $_SESSION['username'];
	foreach($xml->database[0]->children() as $table_data)
	{
		foreach($table_data->children() as $rows)
		{
			if($table_data['name'] == 'student_data')
			{
				if($rows->field[1] != $user)
				{
					return false;
				}
			}
			else if($table_data['name'] == 'student_course')
			{
				if($rows->field[0] != $user)
				{
					return false;
				}
				$stmt = $mysqli->prepare("INSERT INTO student_course (username, courseID, grade, weight, relevance, student_course_id, semester, year) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                                          ON DUPLICATE KEY UPDATE grade=VALUES(grade), weight=VALUES(weight), relevance=VALUES(relevance)");
				$stmt->bind_param('ssssssss', $user, $rows->field[1], $rows->field[2], $rows->field[3], $rows->field[4], $rows->field[5], $rows->field[6], $rows->field[7]);
    			$stmt->execute();
			}
			else if($table_data['name'] == 'student_major')
			{
				if($rows->field[0] != $user)
				{
					return false;
				}
				$stmt = $mysqli->prepare("INSERT INTO student_major (username, major_id, declared_month, declared_year) VALUES (?, ?, ?, ?)
                                          ON DUPLICATE KEY UPDATE declared_month=VALUES(declared_month), declared_year=VALUES(declared_year)");
				$stmt->bind_param('ssss', $user, $rows->field[1], $rows->field[2], $rows->field[3]);
    			$stmt->execute();
			}
			else if($table_data['name'] == 'assessment_type')
			{
				if($rows->field[0] != $user)
				{
					return false;
				}
				$stmt = $mysqli->prepare("INSERT INTO assessment_type (courseID, assessment, percentage, student_course_id) VALUES (?, ?, ?, ?)
                                          ON DUPLICATE KEY UPDATE assessment=VALUES(assessment), percentage=VALUES(percentage)");
				$stmt->bind_param('ssss', $rows->field[1], $rows->field[2], $rows->field[3], $rows->field[4]);
    			$stmt->execute();
			}
		}
	}
	return true;
}

/*insert_student_data($xml) {
	$mysqli = new mysqli("localhost","sec_user","Uzg82t=u%#bNgPJw","GPA_Tracker");
	$user = $_SESSION['username'];
	foreach($xml->database[0]->children() as $table_data)
	{
		foreach($table_data->children() as $rows)
		{
			$stmt = $mysqli->prepare("INSERT INTO student_course (username, courseID, grade, weight, relevance, student_course_id, semester, year) VALUES (?, ?, ?, ?, ?)
                                          ON DUPLICATE KEY UPDATE grade=VALUES(grade), weight=VALUES(weight), relevance=VALUES(relevance)");
				$stmt->bind_param('sssssss', $user, $rows->field[1], $rows->field[2], $rows->field[3], $rows->field[4], $rows->field[5], $rows->field[6]);
    			$stmt->execute();
		}
	}
}*/
=======
>>>>>>> Story 733: Current Semester GUI improvements Set 1
?>

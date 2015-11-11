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
		array_push($output, array("Import Data", '<input type="file" id="ImportFile">'));
		//array_push($output, array("Import Whatif", '<input type="file" id="Whatif">'));

		echo json_encode($output);
	}
}

if($action == "exportData") {
	if (isset($_SESSION['username'])) {
		$user = $_SESSION['userID'];
		$user = 2; //Test purposes only
		$mysqli = new mysqli("localhost","sec_user","Uzg82t=u%#bNgPJw","GPA_Tracker");
        $stmt = $mysqli->prepare("SELECT studentCourseID
        FROM StudentCourse
        WHERE userID=?");
        $stmt->bind_param('s', $user);
        $stmt->execute();
        $stmt->bind_result($studentCourse);
        $courseList = "(";
        while($stmt->fetch())
        {
        	$courseList = $courseList . $studentCourse . ", ";
        }
        $courseList = substr($courseList, 0, (strlen($courseList) - 2));
        $courseList = $courseList . ")";
		$dump1 = shell_exec('mysqldump --user=root --password=sqliscool --host=localhost --no-create-info --xml GPA_Tracker Users  StudentCourse StudentMajor --where="userID=' . $user . '"');
		$dump2 = shell_exec('mysqldump --user=root --password=sqliscool --host=localhost --no-create-info --xml GPA_Tracker AssessmentType Assessment --where="studentCourseID in ' . $courseList .'"');
		echo cutLastLine(cutLastLine(cutLastLine($dump1))) . "\n" . cutFirstLine(cutFirstLine(cutFirstLine($dump2)));
	}
}

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
					echo "Error! Cannot insert for another student.";
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

function cutLastLine($string)
{
	return substr($string, 0, strrpos($string, "\n"));
}

function cutFirstLine($string)
{
	return substr(strstr($string, "\n"), 1);
}

function isIn($course, $courseList)
{
	for($i =0; $i < count($courseList); $i++)
	{
		if($course == $courseList[$i])
		{
			return true;
		}
	}
	return false;
}

function validate_and_insert_data($xml)
{
	$mysqli = new mysqli("localhost","sec_user","Uzg82t=u%#bNgPJw","GPA_Tracker");
	$user = $_SESSION['userID'];
	$user = 2; //For test purposes
	$coursesSet = false;
	foreach($xml->database[0]->children() as $table_data)
	{
		foreach($table_data->children() as $rows)
		{
			if($table_data['name'] == 'StudentData')
			{
				if($rows->field[1] != $user)
				{
					return false;
				}
			}
			else if($table_data['name'] == 'StudentCourse')
			{
				if($rows->field[8] != $user)
				{
					return false;
				}
				$stmt = $mysqli->prepare("INSERT INTO StudentCourse (grade, weight, relevance, studentCourseID, semester, year, courseInfoID, selected, userID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                                          ON DUPLICATE KEY UPDATE grade=VALUES(grade), weight=VALUES(weight), relevance=VALUES(relevance)");
				$stmt->bind_param('sssssssss', $rows->field[0], $rows->field[1], $rows->field[2], $rows->field[3], $rows->field[4], $rows->field[5], $rows->field[6], $rows->field[7], $user);
    			$stmt->execute();
			}
			else if($table_data['name'] == 'StudentMajor')
			{
				if($rows->field[0] != $user)
				{
					return false;
				}
				$stmt = $mysqli->prepare("INSERT INTO StudentMajor (userID, majorID, declaredDate) VALUES (?, ?, ?)
                                          ON DUPLICATE KEY UPDATE declaredDate=VALUES(declaredDate)");
				$stmt->bind_param('ssss', $user, $rows->field[1], $rows->field[2]);
    			$stmt->execute();
			}
			else if($table_data['name'] == 'AssessmentType')
			{
				if(!$coursesSet)
				{
				    $mysqli = new mysqli("localhost","sec_user","Uzg82t=u%#bNgPJw","GPA_Tracker");
					$stmt = $mysqli->prepare("SELECT studentCourseID
					FROM StudentCourse
					WHERE userID=?");
					$stmt->bind_param('s', $user);
					$stmt->execute();
					$stmt->bind_result($studentCourse);
					$courseList = array();
					while($stmt->fetch())
					{
						array_push($courseList, $studentCourse);
					}
					$coursesSet = true;
				}
				if(!isIn($rows->field[2], $courseList))
				{
					return false;
				}
				$stmt = $mysqli->prepare("INSERT INTO AssessmentType (assessmentName, percentage, studentCourseID, AssessmentTypeID) VALUES (?, ?, ?, ?)
                                          ON DUPLICATE KEY UPDATE assessmentName=VALUES(assessmentName), percentage=VALUES(percentage)");
				$stmt->bind_param('ssss', $rows->field[0], $rows->field[1], $rows->field[2], $rows->field[3]);
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


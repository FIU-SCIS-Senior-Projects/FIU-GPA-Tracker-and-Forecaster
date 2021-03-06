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
    if(isset($_SESSION['userID']))
    {
        $mysqli = new mysqli("localhost","sec_user","Uzg82t=u%#bNgPJw","GPA_Tracker");
        $user = $_SESSION['userID'];
        $stmt = $mysqli->prepare("SELECT assessmentName
        FROM   AssessmentType
        WHERE  studentCourseID in (SELECT studentCourseID
        	FROM StudentCourse
			WHERE grade = 'IP' AND userID = ? 
			AND
			courseInfoID in (select courseInfoID 
				FROM CourseInfo 
				WHERE courseID = ?))");
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
    if(isset($_SESSION['userID']))
    {
        $mysqli = new mysqli("localhost","sec_user","Uzg82t=u%#bNgPJw","GPA_Tracker");
        $user = $_SESSION['userID'];
        $stmt = $mysqli->prepare("INSERT into AssessmentType (assessmentName, percentage, studentCourseID) 
        VALUES (?, ?, (SELECT studentCourseID
        FROM StudentCourse
            WHERE grade = 'IP' AND userID = ? 
            AND courseInfoID in (select courseInfoID 
                FROM CourseInfo
                WHERE courseID = ?)))");
        $stmt->bind_param('ssss', $_POST['assesment'], $_POST['percentage'], $user, $_POST['course']);
        if($stmt->execute())
		{
			echo "true";
		}
		else
		{
			echo $stmt->error;
		}
    }
}

if($_POST['action'] == 'addGrade')
{
    if(isset($_SESSION['userID']))
    {
        $mysqli = new mysqli("localhost","sec_user","Uzg82t=u%#bNgPJw","GPA_Tracker");
        $user = $_SESSION['userID'];
        $stmt = $mysqli->prepare("INSERT into Assessment (assessmentTypeID, grade, studentCourseID, dateEntered) 
        VALUES ((select assessmentTypeID 
            FROM AssessmentType 
            WHERE StudentCourseID in (SELECT studentCourseID 
                FROM StudentCourse 
                WHERE grade = 'IP' and userID = ? 
                AND
                courseInfoID in (select courseInfoID 
                    FROM CourseInfo 
                    WHERE courseID = ?)) 
                AND assessmentName = ?), ?, (SELECT studentCourseID 
                FROM StudentCourse 
                WHERE grade = 'IP' and userID = ? 
                AND 
                courseInfoID in (select courseInfoID 
                FROM CourseInfo 
                WHERE courseID = ?)), '" . date("Y-m-d") ."')");
        $stmt->bind_param('ssssss', $user, $_POST['course'], $_POST['assesment'], $_POST['grade'], $user, $_POST['course']);
        if($stmt->execute())
		{
			echo "true";
		}
		else
		{
			echo $stmt->error;
		}
    }
}

if($_POST['action'] == 'getGrades')
{
    if(isset($_SESSION['userID']))
    {
        $mysqli = new mysqli("localhost","sec_user","Uzg82t=u%#bNgPJw","GPA_Tracker");
        $user = $_SESSION['userID'];
        $stmt = $mysqli->prepare("SELECT grade
        FROM   Assessment
        WHERE  assessmentTypeID in (select assessmentTypeID 
        	FROM AssessmentType 
        	WHERE AssessmentName = ?) 
        AND 
        studentCourseID in (SELECT studentCourseID
        	FROM StudentCourse
			WHERE grade = 'IP' and userID = ? 
			AND courseInfoID in (select courseInfoID 
				FROM CourseInfo 
				WHERE courseID = ?))");
        $stmt->bind_param('sss', $_POST['assessment'], $user, $_POST['course']);
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
    if(isset($_SESSION['userID']))
    {
        $mysqli = new mysqli("localhost","root","sqliscool","GPA_Tracker");
        $user = $_SESSION['userID'];
        $stmt = $mysqli->prepare("Delete from Assessment 
        WHERE grade = ? 
        AND 
        assessmentTypeID in (select assessmentTypeID 
        	from AssessmentType 
        	where assessmentName = ?) 
        AND 
        studentCourseID in (SELECT studentCourseID
        	FROM StudentCourse
        	WHERE grade = 'IP' and userID = ? and courseInfoID in (select courseInfoID 
        		from CourseInfo 
        		where courseID = ?)) 
        limit 1");
        $stmt->bind_param('ssss', $_POST['grade'], $_POST['assessment'], $user, $_POST['course']);
        if($stmt->execute())
		{
			echo "true";
		}
		else
		{
			echo $stmt->error;
		}
    }
    else
    {
        echo "false";
    }
}

if($_POST['action'] == 'modifyGrade')
{
    if(isset($_SESSION['userID']))
    {
        $mysqli = new mysqli("localhost","root","sqliscool","GPA_Tracker");
        $user = $_SESSION['userID'];
        $stmt = $mysqli->prepare("UPDATE Assessment
        SET grade = ?
        WHERE grade = ? 
        
        AND
         
        assessmentTypeID in (select assessmentTypeID 
        	from AssessmentType 
        	where assessmentName = ?) 
        	
        AND
         
        studentCourseID in (SELECT studentCourseID
        	FROM StudentCourse
        	WHERE grade = 'IP' and userID = ? 
        	AND 
        	courseInfoID in (select courseInfoID 
        		from CourseInfo 
        		where courseID = ?)) 
        limit 1");
        $stmt->bind_param('sssss', $_POST['newGrade'], $_POST['grade'], $_POST['assessment'], $user, $_POST['course']);
        if($stmt->execute())
		{
			echo "true";
		}
		else
		{
			echo $stmt->error;
		}
    }
}

if($_POST['action'] == 'removeBucket')
{
    if(isset($_SESSION['userID']))
    {
        $mysqli = new mysqli("localhost","root","sqliscool","GPA_Tracker");
        $user = $_SESSION['userID'];
        $stmt = $mysqli->prepare("DELETE from AssessmentType 
        WHERE  AssessmentName = ? 
        
        AND
         
        studentCourseID in (SELECT studentCourseID
        	FROM StudentCourse
        	WHERE grade = 'IP' and userID = ? and courseInfoID in (select courseInfoID 
        		from CourseInfo 
        		where courseID = ?))");
        $stmt->bind_param('sss', $_POST['assessment'], $user, $_POST['course']);
        if($stmt->execute())
		{
			echo "true";
		}
		else
		{
			echo $stmt->error;
		}
    }
}

if($_POST['action'] == 'GetAllAssessments')
{
    if(isset($_SESSION['userID']))
    {
        $mysqli = new mysqli("localhost","sec_user","Uzg82t=u%#bNgPJw","GPA_Tracker");
        $user = $_SESSION['userID'];
        $stmt = $mysqli->prepare("SELECT assessmentName, percentage
        FROM   AssessmentType
        WHERE  studentCourseID in (SELECT studentCourseID
        	FROM StudentCourse
        	WHERE grade = 'IP' and userID = ? and courseInfoID in (select courseInfoID 
        		FROM CourseInfo 
        		WHERE courseID = ?))");
        $stmt->bind_param('ss', $user, $_POST['course']);
        $stmt->execute();
        $stmt->bind_result($bucket, $per);

        $output = array();
        $average = 0;
        $grade;
        $totalPer = 0;
        while($stmt->fetch())
        {
            $grade = averageAssess($bucket);
            if($grade != "No Grades")
            {
				array_push($output, array($bucket, $per, round($grade, 2)));
                $average += $grade * $per;
                $totalPer += $per;
            }
			else
			{
				array_push($output, array($bucket, $per, $grade));
			}
        }

        if($totalPer == 0)
        {
            array_push($output, array("Total","" , "No Grades"));
        }
        else{
            array_push($output, array("Total", "", round($average/$totalPer, 2)));
        }


        echo json_encode($output);
    }

}

if($_POST['action'] == 'PlotPoints') {
	if(isset($_SESSION['userID'])) {
		$mysqli = new mysqli("localhost","sec_user","Uzg82t=u%#bNgPJw","GPA_Tracker");
        $user = $_SESSION['userID'];
        $stmt = $mysqli->prepare("SELECT b.assessmentTypeID, b.percentage, a.grade, a.dateEntered
        FROM   Assessment as a, AssessmentType as b
        WHERE  a.studentCourseID in (SELECT studentCourseID
        	FROM StudentCourse
        	WHERE grade = 'IP' and userID = ? and courseInfoID in (select courseInfoID 
        		FROM CourseInfo 
        		WHERE courseID = ?))
        AND
        b.assessmentTypeID = a.assessmentTypeID
        ORDER BY dateEntered");
        $stmt->bind_param('ss', $user, $_POST['course']);
        $stmt->execute();
        $stmt->bind_result($ID, $per, $grade, $date);
        
        $x = 1;
        $dates = array();
        $points = array();
        $runningGrades = array();
        $currDate = "Empty";
        
        while($stmt->fetch()){
        	if($currDate == "Empty")
        	{
        		$currDate = $date;
        		array_push($dates, array($x, substr($date, 5)));
        		array_push($runningGrades, array($ID, $per, $grade));
        	}
        	else if($currDate == $date)
        	{
        		array_push($runningGrades, array($ID, $per, $grade));
        	}
        	else {
        		array_push($points, array($x, gradeUpTo($runningGrades)));
        		array_push($runningGrades, array($ID, $per, $grade));
        		$x++;
        		$currDate = $date;
        		array_push($dates, array($x, substr($date, 5)));
        	}	
        }
        array_push($runningGrades, array($ID, $per, $grade));
        array_push($points, array($x, gradeUpTo($runningGrades)));
        array_push($points, $dates);
        
        echo json_encode($points);
	}
}

function gradeUpTo($runningGrades){
	$summationGrades = array();
	foreach($runningGrades as $gradeInfo)
	{
		if(isset($summationGrades[$gradeInfo[0]]))
		{
			$summationGrades[$gradeInfo[0]][1] +=  $gradeInfo[2];
			$summationGrades[$gradeInfo[0]][2]++;
		}
		else
		{
			$summationGrades[$gradeInfo[0]] = array($gradeInfo[1], $gradeInfo[2], 1);
		}
	}
	
	$totalPer = 0;
	$runningAvg = 0;
	
	foreach($summationGrades as $summation)
	{
		$runningAvg += (($summation[1] / $summation[2]) * $summation[0] / 100);
		$totalPer += $summation[0];
	}
	
	$runningAvg = $runningAvg / $totalPer * 100;
	return $runningAvg;
}

function averageAssess($category)
{
    $conn = new mysqli("localhost","sec_user","Uzg82t=u%#bNgPJw","GPA_Tracker");
    $user = $_SESSION['userID'];
    $stmt = $conn->prepare("SELECT grade
    FROM   Assessment
    WHERE   assessmentTypeID in (select assessmentTypeID
    	FROM AssessmentType
    	WHERE assessmentName = ?) 
    AND 
    studentCourseID in (SELECT studentCourseID
        	FROM StudentCourse
        	WHERE grade = 'IP' and userID = ? 
        	AND 
        	courseInfoID in (select courseInfoID 
        		from CourseInfo 
        		where courseID = ?))");
    $stmt->bind_param('sss', $category, $user, $_POST['course']);
    $stmt->execute();
    $stmt->bind_result($Assessgrade);
    $runAvg = 0;
    $count = 0;
    while($stmt->fetch())
    {
        $runAvg += $Assessgrade;
        $count++;
    }
    if($count != 0)
    {
        return $runAvg / $count;
    }
    else{
        return "No Grades";
    }
}
?>

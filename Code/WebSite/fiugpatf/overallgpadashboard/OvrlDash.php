<?php
include_once '../common_files/db_connect.php';
include_once '../common_files/functions.php';
sec_session_start();
if (isset($_POST['adminUser'])) {
    $_SESSION['username'] = $_POST['adminUser'];
} else {
}
if (isset($_POST['type'])) {
    $type = $_POST['type'];
} else {
    $type = '0';
}
if (isset($_POST['action'])) {
    //echo json_encode('inside isset');
    $action = $_POST['action'];
} else {
    var_dump($_POST);
    echo 'inside else';
    $action = "";
}

if ($action == "getMajorBuckets") {
    $user = $_SESSION['username'];
	$stmt1 = $mysqli->prepare("SELECT userID FROM Users WHERE  userName  = ?"); 
	 $stmt1->bind_param('s', $user);
    $stmt1->execute();
    $stmt1->bind_result($output1);
	 $userID = array();
	 while ($stmt1->fetch()) {
        array_push($userID,$output1
        );
		
    }
    $stmt = $mysqli->prepare("SELECT description FROM MajorBucket WHERE majorID = majorID in (SELECT majorID FROM StudentMajor WHERE userID = '".$userID[0]."')");
   
    $stmt->execute();
    $stmt->bind_result($desc);
    $output = array();
	 $i = 0;
    while ($stmt->fetch()) {
        array_push($output, array('+',
            $desc
        ));
		$i++;
    }
    echo json_encode($output);
 
}


if ($action == "getMajorBucketsCourse") {

	if (isset($_POST['bucket'])) {
        $bucket = $_POST['bucket'];
    } else {
        $bucket = "";
}
    $user = $_SESSION['username'];
		$userID = $_SESSION['userID'];
    $stmt = $mysqli->prepare("SELECT DISTINCT CourseInfo.courseID, CourseInfo.credits, StudentCourse.grade FROM CourseInfo INNER JOIN StudentCourse ON  CourseInfo.courseInfoID = StudentCourse.courseInfoID AND StudentCourse.courseInfoID in (Select  courseInfoID From MajorBucketRequiredCourses where bucketID in (Select bucketID FROM MajorBucket where description =  '".$bucket."'))AND userID = '".$userID."'");
   
    $stmt->execute();
    $stmt->bind_result($desc,$cred, $grade);
    $output = array();
	
    while ($stmt->fetch()) {
        array_push($output, array($desc,$cred, $grade )
        );
		
    }
    echo json_encode($output);
 
}

if ($action == "getMajorBucketsNeeded") {
    $user = $_SESSION['username'];
	$stmt1 = $mysqli->prepare("SELECT userID FROM Users WHERE  userName  = ?"); 
	 $stmt1->bind_param('s', $user);
    $stmt1->execute();
    $stmt1->bind_result($output1);
	 $userID = array();
	 while ($stmt1->fetch()) {
        array_push($userID,$output1
        );
		
    }
    $stmt = $mysqli->prepare("SELECT description FROM MajorBucket WHERE majorID = majorID in (SELECT majorID FROM StudentMajor WHERE userID = '".$userID[0]."')");
   
    $stmt->execute();
    $stmt->bind_result($desc);
    $output = array();
	 $i = 0;
    while ($stmt->fetch()) {
        array_push($output, array('+',
            $desc
        ));
		$i++;
    }
    echo json_encode($output);
 
}


if ($action == "getMajorBucketsCourseNeeded") {

	if (isset($_POST['bucket'])) {
        $bucket = $_POST['bucket'];
    } else {
        $bucket = "";
}
    $user = $_SESSION['username'];
		$userID = $_SESSION['userID'];
    $stmt = $mysqli->prepare("SELECT courseID, credits FROM CourseInfo Where courseInfoID in (Select courseInfoID From MajorBucketRequiredCourses where bucketID in (Select bucketID FROM MajorBucket where description = '".$bucket."'))AND  NOT courseInfoID in (SELECT courseInfoID From StudentCourse Where userID = '".$userID."')");
   
    $stmt->execute();
    $stmt->bind_result($desc,$cred);
    $output = array();
	
    while ($stmt->fetch()) {
        array_push($output, array($desc,$cred, '3', '4' )
        );
		
    }
    echo json_encode($output);
 
}



if ($action == "courseTakenElectives") {
    $user = $_SESSION['username'];
    $stmt = $mysqli->prepare("SELECT CourseInfo.courseID, CourseInfo.credits, StudentCourse.grade FROM StudentCourse INNER JOIN CourseInfo ON StudentCourse.courseInfoID = CourseInfo.courseInfoID WHERE  StudentCourse.userID in (SELECT userID FROM Users WHERE userName ='".$user."' ) AND CourseInfo.courseInfoID in (SELECT courseInfoID FROM MajorBucketRequiredCourses WHERE bucketID = '2')");
    $stmt->bind_param('s', $user);
    $stmt->execute();
    $stmt->bind_result($suser, $CID, $credit, $grd);
    $output = array();
    while ($stmt->fetch()) {
        array_push($output, array(
            $CID,
            $credit,
            $grd
        ));
    }
    echo json_encode($output);
 
}
if ($action == "addCourse") {
    if (isset($_POST['courseID'])) {
        $courseID = $_POST['courseID'];
    } else {
        $courseID = "";
    }
    if (isset($_POST['grade'])) {
        $grade = $_POST['grade'];
    } else {
        $grade = "";
    }
    if (isset($_POST['credits'])) {
        $credits = $_POST['credits'];
    } else {
        $credits = "";
    }
    $user = $_SESSION['username'];
	$userID = $_SESSION['userID'];
	 $stmt2 = $mysqli->prepare("SELECT courseInfoID FROM CourseInfo WHERE  courseID  = '" . $courseID . "'"); 
	 
    $stmt2->execute();
   
	$stmt2->bind_result($output2);
	 $course = array();
	 while ($stmt2->fetch()) {
        array_push($course,$output2
        );
		
    }
    $sql  = "INSERT INTO StudentCourse (userID, courseInfoID, grade, weight, relevance) VALUES(\"{$userID}\", \"{$course[0]}\",\"{$grade}\",\"{$credits}\", 3)";
  

    if ($mysqli->query($sql) === TRUE) {
        $result = array(
            'success' => true
        );
    } else {
        $result = array(
            'success' => false,
            'message' => 'Item could not be deleted'
        );
    }
    echo json_encode($result);
}

if ($action == "courseTaken1") {
    $user = $_SESSION['username'];
    $stmt = $mysqli->prepare("SELECT CourseInfo.courseID, CourseInfo.credits, StudentCourse.grade FROM StudentCourse INNER JOIN CourseInfo ON StudentCourse.courseInfoID = CourseInfo.courseInfoID WHERE  StudentCourse.userID in (SELECT userID FROM Users WHERE userName ='".$users."' ) AND CourseInfo.courseInfoID in (SELECT courseInfoID FROM MajorBucketRequiredCourses WHERE bucketID = '1')");
    $stmt->bind_param('s', $user);
    $stmt->execute();
    $stmt->bind_result($suser, $CID, $credit, $grd);
    $output = array();
    while ($stmt->fetch()) {
        array_push($output, array(
            $CID,
            $credit,
            $grd
        ));
    }
    echo json_encode($output);
 
}


if ($action == "modCourse") {
    if (isset($_POST['courseID'])) {
        $courseID = $_POST['courseID'];
    } else {
        $courseID = "";
    }
    if (isset($_POST['grade'])) {
        $grade = $_POST['grade'];
    } else {
        $grade = "";
    }
    if (isset($_POST['credits'])) {
        $credits = $_POST['credits'];
    } else {
        $credits = "";
    }
    if (isset($_POST['modifiedCourse'])) {
        $modifiedCourse = $_POST['modifiedCourse'];
    } else {
        $modifiedCourse = "";
    }
    if (isset($_POST['modifiedGrade'])) {
        $modifiedGrade = $_POST['modifiedGrade'];
    } else {
        $modifiedGrade = "";
    }
    $user = $_SESSION['username'];
	 $userID = $_SESSION['userID'];
	
    $sql  = "UPDATE StudentCourse SET grade ='" . $modifiedGrade . "' WHERE courseInfoID in (SELECT courseInfoID FROM CourseInfo WHERE courseID =  '" . $courseID . "') AND userID = '" . $userID . "' ";
    if ($mysqli->query($sql) === TRUE) {
        $result = array(
            'success' => true
        );
    } else {
        $result = array(
            'success' => false,
            'message' => 'Geade could not be modified'
        );
    }
    echo json_encode($result);
}
if ($action == "modWeight") {
    if (isset($_POST['courseID'])) {
        $courseID = $_POST['courseID'];
    } else {
        $courseID = "";
    }
    if (isset($_POST['modifiedWeight'])) {
        $modifiedWeight = $_POST['modifiedWeight'];
    } else {
        $modifiedWeight = "";
    }
    if (isset($_POST['modifiedRelevance'])) {
        $modifiedRelevance = $_POST['modifiedRelevance'];
    } else {
        $modifiedRelevance = "";
    }
    $user = $_SESSION['username'];
	 $userId = $_SESSION['userID'];
	 $stmt2 = $mysqli->prepare("SELECT courseInfoID FROM CourseInfo WHERE  courseID  = '" . $courseID . "'"); 
	 
    $stmt2->execute();
   
	$stmt2->bind_result($output2);
	 $course = array();
	 while ($stmt2->fetch()) {
        array_push($course,$output2
        );
		
    }
    $sql  = "UPDATE StudentCourse SET weight ='" . $modifiedWeight . "', relevance = '" . $modifiedRelevance . "' WHERE courseInfoID = '" . $course[0] . "' AND userID ='" . $userID . "'  ";
    if ($mysqli->query($sql) === TRUE) {
        $result = array(
            'success' => true
        );
    } else {
        $result = array(
            'success' => false,
            'message' => 'Item could not be deleted'
        );
    }
    echo json_encode($result);
}
if ($action == "deleteItem") {
    if (isset($_POST['courseID'])) {
        $courseID = $_POST['courseID'];
    } else {
        $courseID = "";
    }
    $user = $_SESSION['username'];
	 $userID = $_SESSION['userID'];
	 $stmt2 = $mysqli->prepare("SELECT courseInfoID FROM CourseInfo WHERE  courseID  = '" . $courseID . "'"); 
	 
    $stmt2->execute();
   
	$stmt2->bind_result($output2);
	 $course = array();
	 while ($stmt2->fetch()) {
        array_push($course,$output2
        );
		
    }
    $sql  = "DELETE FROM StudentCourse WHERE userID = '" . $userID . "' AND courseInfoID = '" . $course[0] . "' ";
    if ($mysqli->query($sql) === TRUE) {
        //mysql_query($sql);
        $result = array(
            'success' => true
        );
    } else {
        $result = array(
            'success' => false,
            'message' => 'Item could not be deleted'
        );
    }
    echo json_encode($result);
}
class major
{
    private $username;
    private $majorID;
    private $d_month;
    private $d_year;
    public function __construct($un, $maj, $dm, $dy)
    {
        $this->username = $un;
        $this->majorID  = $maj;
        $this->d_month  = $dm;
        $this->d_year   = $dy;
    }
    public function prepare_conjunction()
    {
        $date = $this->d_year . $this->d_month;
        return "(major_id = " . $this->majorID . " AND date_start <= " . $date . " AND date_end >= " . $date . ")";
    }
}
if ($action == "courseNeeded") {
    $user = $_SESSION['username'];
	 $userID = $_SESSION['userID'];
	
	

    $stmt2 = $mysqli->prepare("SELECT courseID, credits
                              FROM CourseInfo
                              WHERE courseInfoID in (SELECT courseInfoID
                                                 FROM MajorBucketRequiredCourses

                                    WHERE bucketID = '1'  AND 
                                    NOT courseInfoID in (SELECT courseInfoID
                                                     FROM   StudentCourse
                                                     WHERE  userID = '" . $userID . "'))");
    $stmt2->bind_param('ss', $user, $user);
    $stmt2->execute();
    $stmt2->bind_result($CID, $credit);
    $output = array();
    while ($stmt2->fetch()) {
        array_push($output, array(
            $CID,
            $credit,
            $credit,
            '3'
        ));
    }
    echo json_encode($output);

}

if ($action == "courseNeededElectives") {
    $user = $_SESSION['username'];
	 $userID = $_SESSION['username'];	

    $stmt = $mysqli->prepare("SELECT courseID, credits
                              FROM CourseInfo
                              WHERE courseInfoID in (SELECT courseInfoID
                                                 FROM MajorBucketRequiredCourses

                                    WHERE bucketID = '2'  AND 
                                    NOT courseInfoID in (SELECT courseInfoID
                                                     FROM   StudentCourse
                                                     WHERE  userID ='" . $userID . "'))");
   
    $stmt->execute();
    $stmt->bind_result($CID, $credit);
    $output = array();
    while ($stmt->fetch()) {
        array_push($output, array(
            $CID,
            $credit,
            $credit,
            '3'
        ));
    }
    echo json_encode($output);

}


if ($action == "deleteCourseNeeded") {
    if (isset($_POST['courseID'])) {
        $courseID = $_POST['courseID'];
    } else {
        $courseID = "";
    }
    $user = $_SESSION['username'];
 $stmt = $mysqli->prepare("SELECT userID FROM Users WHERE  userName  = ?"); 
	 $stmt->bind_param('s', $user);
    $stmt->execute();
    $stmt->bind_result($output1);
	 $userID = array();
	 while ($stmt1->fetch()) {
        array_push($userID,$output1
        );
		
    }
	 $stmt2 = $mysqli->prepare("SELECT courseInfoID FROM CourseInfo WHERE  courseID  = '" . $courseID . "'"); 
	 
    $stmt2->execute();
   
	$stmt2->bind_result($output2);
	 $course = array();
	 while ($stmt2->fetch()) {
        array_push($course,$output2
        );
		
    }
    $sql  = "DELETE FROM StudentCourse WHERE userID = '" . $userID[0] . "' AND courseInfoID = '" . $course[0] . "' ";

    if ($mysqli->query($sql) === TRUE) {
        $result = array(
            'success' => true
        );
    } else {
        $result = array(
            'success' => false,
            'message' => 'Item could not be deleted'
        );
    }
    echo json_encode($result);
}
if ($action == "getUser") {
  
    $user      = $_SESSION['username'];
    $password  = 'pword';
    $list      = array(
        'name' => $user,
        'password' => $password
    );
    $listArray = json_encode($list);
    echo $listArray;
}
if ($action == "getGradProgram") {
    $user = $_SESSION['username'];
    $stmt5 = $mysqli->prepare("SELECT graduateProgram, requiredGPA FROM GraduatePrograms ");
    $stmt5->execute();
    $stmt5->bind_result($prg, $gpa);
    $output4 = array();
    while ($stmt5->fetch()) {
        array_push($output4, array(
            $prg,
            $gpa
        ));
    }
    echo json_encode($output4);
  
}
if ($action == "editStudent") {
    $user = $_SESSION['username'];
    $stmt = $mysqli->prepare("SELECT userName, lastName, firstName, email FROM Users WHERE type = '0' ");
    $stmt->execute();
    $stmt->bind_result($suser, $LN, $FN, $mail);
    $output = array();
    while ($stmt->fetch()) {
        array_push($output, array(
            $suser,
            $LN,
            $FN,
            $mail
        ));
    }
    echo json_encode($output);
 
}
?>

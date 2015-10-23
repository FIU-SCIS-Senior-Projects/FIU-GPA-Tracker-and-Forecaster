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
}


else {
    var_dump($_POST);
    echo 'inside else';
    $action = "";
}


if ($action == "courseTaken1") {
    
    
    $user = $_SESSION['username'];
    $stmt = $mysqli->prepare("SELECT student_course.username, student_course.courseID, course_info.credits, student_course.grade FROM student_course INNER JOIN course_info ON student_course.courseID=course_info.courseID WHERE student_course.username= ? ");
    
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
    /*$connection = mysql_connect('localhost' , 'root' , 'sqliscool');
    mysql_select_db('GPA_Tracker', $connection);
    $user = $_SESSION['username'];
    $sql = "SELECT student_course.username, student_course.courseID, course_info.credits, student_course.grade FROM student_course INNER JOIN course_info ON student_course.courseID=course_info.courseID WHERE student_course.username= '".$user."' "; 
    $sql2 = "SELECT type FROM student_data WHERE username = '".$user."' "; 
    $result = mysql_query($sql);  
    $result2 = mysql_query($sql2);
    $type;
    if ($row2 = mysql_fetch_array($result2))
    {
    $type = $row2['type'];
    }
    
    $coursesTaken = array();
    while($row=mysql_fetch_array($result))  
    {  
    $tmparray = array( $row['courseID'],$row['credits'],$row['grade'], $user,$type);
    array_push($coursesTaken,$tmparray);
    
    
    }  
    
    echo json_encode($coursesTaken);
    
    */
    
    
    
    
    
    
    
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
    $sql  = "INSERT INTO student_course (username, courseID, grade, weight, relevance) VALUES(\"{$user}\", \"{$courseID}\",\"{$grade}\",\"{$credits}\", 5)";
    
    /*    
    $connection = mysql_connect('localhost' , 'root' , 'sqliscool');
    mysql_select_db('GPA_Tracker', $connection);
    $user = $_SESSION['username'];
    $sql = "INSERT student_course (username, courseID, grade, weight, relevance) VALUES (\"{$user}\", \"{$courseID}\",\"{$grade}\",\"{$credits}\", 5);";
    //$sql = 'DELETE FROM `student_course` WHERE `username` = 'mdoe' AND `courseID` = 'COP2210'';
    //VALUES (\"{$_SESSION['username']}\", \"{$key}\", \"IP\", 1, 1
    */
    
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
    $sql  = "UPDATE student_course SET grade = '" . $modifiedGrade . "' WHERE courseID = '" . $courseID . "' AND username ='" . $user . "' ";
    
    
    
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
    $sql  = "UPDATE courses_needed SET weight ='" . $modifiedWeight . "', relevance = '" . $modifiedRelevance . "' WHERE courseID = '" . $courseID . "' AND username ='" . $user . "'  ";
    
    
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
    $sql  = "DELETE FROM student_course WHERE username = '" . $user . "' AND courseID = '" . $courseID . "' ";
    
    
    
    
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
    $stmt = $mysqli->prepare("SELECT courses_needed.courseID, course_info.credits, courses_needed.weight, courses_needed.relevance FROM courses_needed INNER JOIN course_info ON courses_needed.courseID=course_info.courseID WHERE courses_needed.username= ? AND NOT courses_needed.courseID in (SELECT courseID FROM student_course WHERE username = ?)");
    
    $stmt->bind_param('ss', $user, $user);
    $stmt->execute();
    $stmt->bind_result($CID, $credit, $weight, $relev);
    $output = array();
    while ($stmt->fetch()) {
        array_push($output, array(
            $CID,
            $credit,
            $weight,
            $relev
        ));
    }
    echo json_encode($output);
    /*	$connection = mysql_connect('localhost' , 'root' , 'sqliscool');
    mysql_select_db('GPA_Tracker', $connection);
    $user = $_SESSION['username'];
    $sql = "SELECT courses_needed.courseID, course_info.credits, courses_needed.weight, courses_needed.relevance FROM courses_needed INNER JOIN course_info ON courses_needed.courseID=course_info.courseID WHERE courses_needed.username= '".$user."' AND NOT courses_needed.courseID in (SELECT courseID FROM student_course WHERE username = '".$user."')";
    
    $result = mysql_query($sql);  
    
    
    $coursesTaken = array();
    while($row=mysql_fetch_array($result))  
    {  
    $tmparray = array( $row['courseID'],$row['credits'],$row['weight'],$row['relevance']);
    array_push($coursesTaken,$tmparray);
    }
    
    
    echo json_encode($coursesTaken);
    */
}




if ($action == "deleteCourseNeeded") {
    
    
    if (isset($_POST['courseID'])) {
        $courseID = $_POST['courseID'];
    } else {
        $courseID = "";
    }
    
    
    
    $user = $_SESSION['username'];
    $sql  = "DELETE FROM student_course WHERE username = '" . $user . "' AND courseID = '" . $courseID . "' ";
    //$sql = 'DELETE FROM `student_course` WHERE `username` = 'mdoe' AND `courseID` = 'COP2210'';
    
    
    
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
    
    
    //	$connection = mysql_connect('localhost' , 'root' , 'sqliscool');
    //	mysql_select_db(GPA_Tracker, $connection);
    
    $user = $_SESSION['username'];
    
    
    $password = 'pword';
    
    $list      = array(
        'name' => $user,
        'password' => $password
    );
    $listArray = json_encode($list);
    echo $listArray;
    
}

if ($action == "getGradProgram") {
    
    $user = $_SESSION['username'];
    $stmt = $mysqli->prepare("SELECT graduate_program, required_gpa FROM graduate_programs ");
    
    
    $stmt->execute();
    $stmt->bind_result($prg, $gpa);
    $output = array();
    while ($stmt->fetch()) {
        array_push($output, array(
            $prg,
            $gpa
        ));
    }
    echo json_encode($output);
    /*	$connection = mysql_connect('localhost' , 'root' , 'sqliscool');
    mysql_select_db(GPA_Tracker, $connection);
    
    $sql = "SELECT graduate_program, required_gpa FROM graduate_programs "; 
    
    $result = mysql_query($sql);  
    
    
    $gradProg = array();
    while($row=mysql_fetch_array($result))  
    {  
    $tmparray = array( $row['graduate_program'],$row['required_gpa']);
    array_push($gradProg,$tmparray);
    
    
    }  
    
    echo json_encode($gradProg);
    
    */
    
}

if ($action == "editStudent") {
    
    
    $user = $_SESSION['username'];
    $stmt = $mysqli->prepare("SELECT username, Last_Name, First_Name, Email FROM student_data WHERE type = '0' ");
    
    
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
    /*	$connection = mysql_connect('localhost' , 'root' , 'sqliscool');
    mysql_select_db('GPA_Tracker', $connection);
    $user = $_SESSION['username'];
    $sql = "SELECT username, Last_Name, First_Name, Email FROM student_data WHERE type = '0' "; 
    
    $result = mysql_query($sql);  
    
    
    
    
    $coursesTaken = array();
    while($row=mysql_fetch_array($result))  
    {  
    $tmparray = array($row['username'],$row['Last_Name'],$row['First_Name'],$row['Email']);
    array_push($coursesTaken,$tmparray);
    
    
    }  
    
    echo json_encode($coursesTaken);
    
    */
    
    
    
    
    
    
    
}


?>

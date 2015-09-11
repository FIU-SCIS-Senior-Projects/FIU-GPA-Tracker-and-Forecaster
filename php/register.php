<?php
$conn = new mysqli("localhost", "sec_user", "Uzg82t=u%#bNgPJw", "GPA_Tracker");

if($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO student_data (Email, Username, Password, First_Name, Last_Name) 
		VALUES ('" . 		
		$_POST["email"] . 
		"', '" . 
		$_POST["username"] . 
		"', '" .
		$_POST["password"] . 
		"', '" .
		$_POST["first_name"] . 
		"', '" .
		$_POST["last_name"] . 
		"');";
?>

<!DOCTYPE= html>
<html>
	<head>
		<title>Congratulations</title>
		<link type="text/css" rel="stylesheet" href="main.css">
	</head>
	<body>
		<div id="header">
		<div class="headerLinks" class="container clearfix">
			<div class="logo">
				<img class="logo" src="http://www.fiu.edu/_assets/images/core/fiu-logo-large.png" />
				<a href="index.html">GPA Tracker and Forecaster</a>
			</div>
			<div class="nav">
				<ul>
					<li><a href="register.html">Register</a></li>
					<li><a href=#>Log in</a></li>
					<li><a href=#>About</a></li>
				</ul>
			</div>
		</div>
	</div>
	<div class="jumbotronReg">
		<div class="textbox">
			<?php 
				if($conn->query($sql) === TRUE)
				{
					echo "<h1>Congratulations!</h1>";
					echo "<p>You have succesfully registered.</p>";
				}
				else
				{
					echo "<h1>Something went wrong.</h1>";
					echo "<p>The username or email you selected was taken.</p>";
				}
			?>
		</div>
	</div>
	</body>
</html>

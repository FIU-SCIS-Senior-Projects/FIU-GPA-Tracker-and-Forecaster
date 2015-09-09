function checkEmail(email)
{
	/*
	//This is an attempt to get the email text to match a regular expression.
	var emailForm = /^\w\w\w\w\w\d\d\d@fiu.edu$/i;
	if(!emailForm.test(email))
	{
		alert("Invalid Email")
	}
	*/
	
	if(email.indexOf("@")==-1)
	{
		alert("Invalid Email")
	}
	
	if(email.indexOf("@")!= email.lastIndexOf("@"))
	{
		alert("Invalid Email");
	}
}

function checkPassword(pass1, pass2)
{

	if(pass1 != pass2)
	{
		alert("Passwords do not match.");
	}
}
 $(document).ready(function() {
   

   start();
  

 

}); 


function toggle()
{
		$("#coursesTaken tbody td:nth-child(3) ").toggle();
 
		$(".GPACalcBox p:nth-child(2)").toggle();
}

		var courseNeeded;
		var courseTaken;
		var nCID = "";
		var nCredits = "";
		var nGrade = "";
		var nMajor ="";
function sto_formatStoreManagerDetails ( oTable, nTr )
{
	var aData = oTable.fnGetData( nTr );
	var id = aData[0];
	var sOut = '';
	sOut += '<div id="itemDetails'+id+'">';
	sOut += '	<div class="buttonColumnDetails">';
	sOut += '		<button id="modifyItem'+id+'">Modify</button>';
	sOut += '		<button id="deleteItem'+id+'">Delete</button>';
	sOut += '		<div id = "pop" style = "display: none" title="Modify Grade" > ';
	//sOut += '			<p>ENTER NEW GRADE</p>';
	sOut += '			<form method = "post" name = "newcourseID">';
	//sOut += '			   <label for="nCID">Course ID</label><br>';
	//sOut += '				<input id = "nCID" placeholder =" New Course ID" size	= "8" type="text" name="nCID"><br>';
	sOut += '				<label for="nGrade">Grade</label><br>';
	//sOut += '				<input id = "nCredits" placeholder =" New Credits " size	= "8" type="text" name="nCredits"><br>';
	sOut += '				<input id = "nGrade" placeholder =" New Grade " size	= "8" type="text" name="nGrade"><br>';
	//sOut += '				<input id = "nMajor" placeholder =" New Major " size	= "8" type="text" name="nMajor"><br>';
	sOut += '				<button id = "modSubmit" type="button">Submit</button>';
	sOut += '			</form>';
	sOut += '		</div>';
	sOut += '	</div>';
	sOut += '</div>';
	
	return sOut;
}

function sto_formatStoreManagerDetails2 ( oTable, nTr )
{
	var aData = oTable.fnGetData( nTr );
	var id = aData[0];
	var sOut = '';
	sOut += '<div id="itemDetails'+id+'">';
	sOut += '	<div class="buttonColumnDetails">';
	sOut += '		<button id="modifyItem'+id+'">Modify</button>';
	//sOut += '		<button id="deleteItem'+id+'">Delete</button>';
	sOut += '		<div id = "pop2" style = "display: none" title="Modify Weight and Relevance" > ';
	//sOut += '			<p>ENTER NEW COURSE DETAILS</p>';
	sOut += '			<form method = "post" id = "newGrade" name = "newcourseID">';
	sOut += '			   <label for="nWeight">Weight</label><br>';
	sOut += '				<input id = "nWeight" placeholder =" New Weight" size	= "8" type="text" name="nWeight"><br>';
	sOut += '				<label for="nRelev">Relevance</label><br>';
	//sOut += '				<input id = "nCredits" placeholder =" New Credits " size	= "8" type="text" name="nCredits"><br>';
	sOut += '				<input id = "nRelev" placeholder ="New Relevance " size	= "8" type="text" name="nRelev"><br>';
	//sOut += '				<input id = "nMajor" placeholder =" New Major " size	= "8" type="text" name="nMajor"><br>';
	sOut += '				<button id = "modSubmit2" type="button">Submit</button>';
	sOut += '			</form>';
	sOut += '		</div>';
	sOut += '	</div>';
	sOut += '</div>';
	
	return sOut;
}

									 
								
function sto_rowClickHandler(){

	var nTr = this.parentNode;
	var open=false;
	
	try{
		if($(nTr).next().children().first().hasClass("ui-state-highlight"))
			open=true;
	}catch(err){
		alert(err);
	}
	
	if (open){
		/* This row is already open - close it */
		courseTaken.fnClose( nTr );
		$(nTr).css("color","");
	}else{
		sto_openDetailsRow(nTr);
	}
}

function sto_rowClickHandler2(){

	var nTr = this.parentNode;
	var open=false;
	
	try{
		if($(nTr).next().children().first().hasClass("ui-state-highlight"))
			open=true;
	}catch(err){
		alert(err);
	}
	
	if (open){
		/* This row is already open - close it */
		courseNeeded.fnClose( nTr );
		$(nTr).css("color","");
	}else{
		sto_openDetailsRow2(nTr);
	}
}

function sto_rowClickHandler3(){

	var nTr = this.parentNode;
	var open=false;
	
	try{
		if($(nTr).next().children().first().hasClass("ui-state-highlight"))
			open=true;
	}catch(err){
		alert(err);
	}
	
	if (open){
		/* This row is already open - close it */
		studRoster.fnClose( nTr );
		$(nTr).css("color","");
	}else{
		sto_openDetailsRow3(nTr);
	}
}


function sto_openDetailsRow2(nTr){

	courseNeeded.fnOpen( nTr, sto_formatStoreManagerDetails2(courseNeeded, nTr), "ui-state-highlight" );
	
	var aData = courseNeeded.fnGetData( nTr );
		
	$("#modifyItem"+aData[0]).button();
	$("#deleteItem"+aData[0]).button();
	
	var divId = "#itemDetails"+aData[0];
	
	$("#modifyItem"+aData[0]).click(function(){
		$("#pop2").dialog();
		
		$('#pop2').on('dialogclose', function(event) {
	    courseNeeded.fnClose( nTr );
		
		$(nTr).css("color","");
		$("#pop2").remove();
		});
			        				
	});
$("#modSubmit2").click(function(){
	  
		 nRelev = $("input[name=nRelev]").val();
		 
	 	 nWeight = $("input[name=nWeight]").val();
		 
		 sto_modWeight(divId, nTr,nWeight,nRelev);
		 courseNeeded.fnUpdate( [aData[0], aData[1], nWeight, nRelev], nTr );
		 
		 $('#pop2').dialog('close');
		
		
      });


	
	$("#deleteItem"+aData[0]).click(function(){
		var del = confirm("Delete course?");

if (del == true)
		{
		sto_deleteItem2(divId, nTr);
		
		}

   else{
		courseNeeded.fnClose(nTr);

}

		
	});
	
	

}

function sto_openDetailsRow3(nTr){

	studRoster.fnOpen( nTr, sto_formatStoreManagerDetails2(studRoster, nTr), "ui-state-highlight" );
	
	var aData = studRoster.fnGetData( nTr );
		
	$("#modifyItem"+aData[0]).button();
	$("#deleteItem"+aData[0]).button();
	
	var divId = "#itemDetails"+aData[0];
	
	$("#modifyItem"+aData[0]).click(function(){
			adminLogin(aData[0]);
			$(location).attr('href','OvrlDash.html');
		
			        				
	});
	
	$("#deleteItem"+aData[0]).click(function(){
		var del = confirm("Delete course?");

if (del == true)
		{
		sto_deleteItem2(divId, nTr);
		
		}

   else{
		studRoster.fnClose(nTr);

}

		
	});


}




	
	function adminLogin(adminUser){
	

		var OvrlDashphpURL = 'OvrlDash.php';


	
		$.ajax({
       type: 'POST',
       url: OvrlDashphpURL,
       
       data: {
           type:'1',
           adminUser: adminUser
       },
       success: function(data){

		
		
       },
       error: function(XMLHttpRequest, textStatus, errorThrown){
          alert(errorThrown);
       }
   });

}




function sto_deleteItem2(divId, nTr)
{
  // createLoadingDivAfter(divId,"Deleting Item");
	var OvrlDashphpURL = 'OvrlDash.php';
	var aData = courseNeeded.fnGetData( nTr );
	var name = aData[1];
	var id = aData[0];

$.ajax({
       type: 'POST',
       url: OvrlDashphpURL,
       dataType: 'json',
       data: {
           action:'deleteCourseNeeded',
			  courseID:id
           
       },
       success: function(data){
	
	//removeLoadingDivAfter(divId);
        	
            if(data.success){
               
                	courseNeeded.fnClose( nTr );
            		courseNeeded.fnDeleteRow(nTr);
                
            }else{
            	
            		$(nTr).css("color","");
                	courseNeeded.fnClose( nTr );
						alert("data.success = false");
               
            }
	
	



       },
       error: function(XMLHttpRequest, textStatus, errorThrown){
          alert(errorThrown);
       }
   }); 

}


function sto_openDetailsRow(nTr){

	courseTaken.fnOpen( nTr, sto_formatStoreManagerDetails(courseTaken, nTr), "ui-state-highlight" );
	
	var aData = courseTaken.fnGetData( nTr );
		
	$("#modifyItem"+aData[0]).button();
	$("#deleteItem"+aData[0]).button();
	
	var divId = "#itemDetails"+aData[0];
	
	$("#modifyItem"+aData[0]).click(function(){
		$( "#pop" ).dialog();
		
		$('#pop').on('dialogclose', function(event) {
	    courseTaken.fnClose( nTr );
			$("#pop").remove();
		
		
   	 });
		
	// (divId).empty();
		$(nTr).css("color","#c5dbec");
		
	

	
		
			        				
	});
	$("#modSubmit").click(function(){
	 
		
	 	 nGrade = $("input[name=nGrade]").val();
		  $('#nGrade').val(nGrade);
		 sto_modCourse(divId, nTr,nGrade,nCID);
		
		 courseTaken.fnUpdate( [aData[0],aData[1], nGrade], nTr );
		

		 $('#pop').dialog('close');
		 courseTaken.fnClose( nTr );
	function fnGPACalc(grades, credits){

			var gradepoints= 0;
			var credithours = 0;
				
					for (var i = 0; i< grades.length; i++)
					{
							if (grades[i] == "A"){
									gradepoints = gradepoints + (4 * credits[i]);
									credithours = credithours + (1 *credits[i]);
							}else if (grades[i] == "A-"){
									gradepoints = gradepoints + (3.70 * credits[i]);
									credithours = credithours + (1* credits[i]);	
							}else if (grades[i] == "B+"){
									gradepoints = gradepoints + (3.33 * credits[i]);
									credithours = credithours + (1* credits[i]);	
							}else if (grades[i] == "B"){
									gradepoints = gradepoints + (3.3 * credits[i]);
									credithours = credithours + (1* credits[i]);	
							}else if (grades[i] == "B-"){
									gradepoints = gradepoints + (2.70 * credits[i]);
									credithours = credithours + (1* credits[i]);	
							}else if (grades[i] == "C+"){
									gradepoints = gradepoints + (2.30 * credits[i]);
									credithours = credithours + (1* credits[i]);	
							}else if (grades[i]== "C"){
									gradepoints = gradepoints + (2 * credits[i]);
									credithours = credithours + (1* credits[i]);	
							}else if (grades[i] == "C-"){
									gradepoints = gradepoints + (1.70 * credits[i]);
									credithours = credithours + (1* credits[i]);	
							}else if (grades[i]== "D+"){
									gradepoints = gradepoints + (1.30 * credits[i]);
									credithours = credithours + (1* credits[i]);	
							}else if (grades[i] == "D"){
									gradepoints = gradepoints + (1.0 * credits[i]);
									credithours = credithours + (1* credits[i]);	
							}else if (grades[i] == "D-"){
									gradepoints = gradepoints + (0.70 * credits[i]);
									credithours = credithours + (1* credits[i]);	
							}else if (grades[i]== "F"){
									gradepoints = gradepoints + (0 * credits[i]);
									credithours = credithours + (1* credits[i]);	
							}else if (grades[i] == "IP"){
									gradepoints = gradepoints + (0 * credits[i]);
									credithours = credithours + (0*  credits[i]);	
							}else {
									gradepoints = gradepoints + (0 * credits[i]);
									credithours = credithours + (0* credits[i]);	
									}
						
					}
					
					var gpa = gradepoints/credithours
					gpa = Math.round(gpa * 100)/100;
					
					$("#GPACalc").replaceWith('<p id = "GPACalc">' + gpa + '</p>');





}


				var oSettings = $('#coursesTaken').dataTable().fnSettings();
					var rowCount = oSettings.fnRecordsTotal();
					var gradesForGPA2 = [];
					var creditsForGPA2 = [];
						for(var i=0;i<rowCount;i++) {
							var id = $('#coursesTaken').dataTable().fnGetData(i, 2);
						   gradesForGPA2.push(id);
							var id2 = $('#coursesTaken').dataTable().fnGetData(i, 1);
						   creditsForGPA2.push(id2);
						}				

						
					fnGPACalc(gradesForGPA2, creditsForGPA2);
       
		
   
});
	$("#deleteItem"+aData[0]).click(function(){
		var del = confirm("Delete course?");

if (del == true)
		{
		sto_deleteItem(divId, nTr);
		
		
		courseTaken.fnClose( nTr );
      courseTaken.fnDeleteRow(nTr);
		alert("Course Info for " + aData[0] +" deleted!");
		
	function fnGPACalc(grades, credits){

			var gradepoints= 0;
			var credithours = 0;
				
					for (var i = 0; i< grades.length; i++)
					{
							if (grades[i] == "A"){
									gradepoints = gradepoints + (4 * credits[i]);
									credithours = credithours + (1 *credits[i]);
							}else if (grades[i] == "A-"){
									gradepoints = gradepoints + (3.70 * credits[i]);
									credithours = credithours + (1* credits[i]);	
							}else if (grades[i] == "B+"){
									gradepoints = gradepoints + (3.33 * credits[i]);
									credithours = credithours + (1* credits[i]);	
							}else if (grades[i] == "B"){
									gradepoints = gradepoints + (3.3 * credits[i]);
									credithours = credithours + (1* credits[i]);	
							}else if (grades[i] == "B-"){
									gradepoints = gradepoints + (2.70 * credits[i]);
									credithours = credithours + (1* credits[i]);	
							}else if (grades[i] == "C+"){
									gradepoints = gradepoints + (2.30 * credits[i]);
									credithours = credithours + (1* credits[i]);	
							}else if (grades[i]== "C"){
									gradepoints = gradepoints + (2 * credits[i]);
									credithours = credithours + (1* credits[i]);	
							}else if (grades[i] == "C-"){
									gradepoints = gradepoints + (1.70 * credits[i]);
									credithours = credithours + (1* credits[i]);	
							}else if (grades[i]== "D+"){
									gradepoints = gradepoints + (1.30 * credits[i]);
									credithours = credithours + (1* credits[i]);	
							}else if (grades[i] == "D"){
									gradepoints = gradepoints + (1.0 * credits[i]);
									credithours = credithours + (1* credits[i]);	
							}else if (grades[i] == "D-"){
									gradepoints = gradepoints + (0.70 * credits[i]);
									credithours = credithours + (1* credits[i]);	
							}else if (grades[i]== "F"){
									gradepoints = gradepoints + (0 * credits[i]);
									credithours = credithours + (1* credits[i]);	
							}else if (grades[i] == "IP"){
									gradepoints = gradepoints + (0 * credits[i]);
									credithours = credithours + (0*  credits[i]);	
							}else {
									gradepoints = gradepoints + (0 * credits[i]);
									credithours = credithours + (0* credits[i]);	
									}
						
					}
					
					var gpa = gradepoints/credithours
					gpa = Math.round(gpa * 100)/100;
					
					$("#GPACalc").replaceWith('<p id = "GPACalc">' + gpa + '</p>');





}

						
					var oSettings = $('#coursesTaken').dataTable().fnSettings();
					var rowCount = oSettings.fnRecordsTotal();
					var gradesForGPA2 = [];
					var creditsForGPA2 = [];
						for(var i=0;i<rowCount;i++) {
							var id = $('#coursesTaken').dataTable().fnGetData(i, 2);
						   gradesForGPA2.push(id);
							var id2 = $('#coursesTaken').dataTable().fnGetData(i, 1);
						   creditsForGPA2.push(id2);
						}				

						
					fnGPACalc(gradesForGPA2, creditsForGPA2);

					
		}

   else{
		courseTaken.fnClose(nTr);

}

						
	});
	
	

}



function sto_addItem(courseID, credits,grade, major)
{
	//createLoadingDivAfter(containerId,"Creating Item");
var OvrlDashphpURL = 'OvrlDash.php';
    $.ajax({
        type: 'POST',
        url: OvrlDashphpURL,
        dataType: 'json',
        data: {
            action: 'addCourse',
            courseID:courseID,
            credits:credits,
            grade:grade,
            major: major
            

        },
        success: function(data){
    
           if(data.success){
            	
            	
            	
            	
            	courseTaken.fnAddData( [
									courseID,
									credits,
									grade
									]
									 );
	   			$('#coursesTaken').removeAttr("style");
					$('#coursesTaken tbody tr td').off();
					$('#coursesTaken tbody tr td').on('click', sto_rowClickHandler );

            }else{
    				alert("failed to add course");
            }

        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
        	
        	
        }
    });

}





function sto_modCourse(divId, nTr,nGrade,nCID)
{


  // createLoadingDivAfter(divId,"Deleting Item");
	var OvrlDashphpURL = 'OvrlDash.php';
	var aData = courseTaken.fnGetData( nTr );
	var major = aData[3];
	var grade = aData[2];	
	var credits = aData[1];
	var id = aData[0];
	var newCourse = nCID;
	var newGrade = nGrade;
$.ajax({
       type: 'POST',
       url: OvrlDashphpURL,
       dataType: 'json',
       data: {
           action:'modCourse',
			  modifiedGrade: newGrade,
			  modifiedCourse: newCourse,
   		  courseID:id,
           credits:credits,
			  grade:grade,
			  major:major
       },
       success: function(data){
	
	//removeLoadingDivAfter(divId);
        	
            if(data.success){
               	$(nTr).css("color","");
                	courseTaken.fnClose( nTr );
            		//courseTaken.fnDeleteRow(nTr);
                
            }else{
            	
            		$(nTr).css("color","");
                	courseTaken.fnClose( nTr );
						alert("data.success = false");
               
            }
	
	



       },
       error: function(XMLHttpRequest, textStatus, errorThrown){
          alert(errorThrown);
       }
   }); 

}

function sto_modWeight(divId, nTr,nWeight,nRelev)
{


  // createLoadingDivAfter(divId,"Deleting Item");
	var OvrlDashphpURL = 'OvrlDash.php';
	var aData = courseNeeded.fnGetData( nTr );
	
	var id = aData[0];
	var newRelev = nRelev;
	var newWeight = nWeight;
$.ajax({
       type: 'POST',
       url: OvrlDashphpURL,
       dataType: 'json',
       data: {
           action:'modWeight',
			  modifiedWeight: newWeight,
			  modifiedRelevance: newRelev,
   		  courseID:id
           
       },
       success: function(data){
	
	//removeLoadingDivAfter(divId);
        	
            if(data.success){
               	$(nTr).css("color","");
                	courseNeeded.fnClose( nTr );
            		//courseTaken.fnDeleteRow(nTr);
                
            }else{
            	
            		$(nTr).css("color","");
                	courseNeeded.fnClose( nTr );
						alert("data.success = false");
               
            }
	
	



       },
       error: function(XMLHttpRequest, textStatus, errorThrown){
          alert(errorThrown);
       }
   }); 

}


function sto_deleteItem(divId, nTr)
{
  // createLoadingDivAfter(divId,"Deleting Item");
	var OvrlDashphpURL = 'OvrlDash.php';
	var aData = courseTaken.fnGetData( nTr );
	var credits = aData[1];
	var id = aData[0];
	var grade = aData[2];
	courseNeeded.fnAddData( [
									id,
									credits,
									'N/A',
									'N/A'
	
									]
									 );
	$('#coursesNeeded tbody tr td').off();
	$('#coursesNeeded tbody tr td').on('click', sto_rowClickHandler2 );
$.ajax({
       type: 'POST',
       url: OvrlDashphpURL,
       dataType: 'json',
       data: {
           action:'deleteItem',
			  courseID:id
           
       },
       success: function(data){
	
	//removeLoadingDivAfter(divId);
        	
            if(data.success){
               	
                	courseTaken.fnClose( nTr );
            		courseTaken.fnDeleteRow(nTr);

						var oSettings = $('#coursesTaken').dataTable().fnSettings();
						var rowCount = oSettings.fnRecordsTotal();
						var gradesForGPA = [];
						var creditsForGPA = [];

                
            }else{
            	
            		$(nTr).css("color","");
                	courseTaken.fnClose( nTr );
						alert("data.success = false");
               
            }
	
	



       },
       error: function(XMLHttpRequest, textStatus, errorThrown){
          alert(errorThrown);
       }
   }); 


}



 function start(){


$("#privacyon").click( function(){
	
        
        $("#coursesTaken tbody td:nth-child(3) ").toggle();
			// var column = $('#coursesTaken').dataTable().api().column( 13 ).visible( false );
		//var oTable = $('#coursesTaken').dataTable();
     
  //  var bVis = oTable.fnSettings().aoColumns[22].bVisible;
  //  oTable.fnSetColumnVis( 2, bVis ? false : true );

 
        // Toggle the visibility
      //  column.visible( ! column.visible() );
 
			$(".GPACalcBox p:nth-child(2)").toggle();

});


	var OvrlDashphpURL = 'OvrlDash.php';
	
$.ajax({
      type: 'POST',
      url: OvrlDashphpURL,
      dataType: 'json',
      data: {
          action:'editStudent'
         
      },
      success: function(data){
    	

					

             studRoster = $('#studRost').dataTable({
                     
						"aaData": data,
					"aaSorting": [[ 0, "asc" ]],
               "aoColumns": [
					//{ "bVisible": true},
              
					 { "sTitle": "Username" },
               { "sTitle": "Last name" },
					 { "sTitle": "First name" },
               { "sTitle": "Email" }
              
               ],
				
					 "paging": false,
               "bJQueryUI": true,
               "bAutoWidth": true,
               "sPaginationType": "full_numbers"
             });
		
					
					$('#studRost').removeAttr("style");
		 			$('#studRost tbody tr td').off();
					$('#studRost tbody tr td').on('click', sto_rowClickHandler3 );

		


       },
		    error: function(XMLHttpRequest, textStatus, errorThrown){
		       alert(errorThrown);
		    }
   });

	
$('#GPATable').html( '<table cellpadding="0" cellspacing="0" border="0" style="width:95%" class="display" id="coursesTaken"></table>' );


 $.ajax({
      type: 'POST',
      url: OvrlDashphpURL,
      dataType: 'json',
      data: {
          action:'courseTaken1'
         
      },
      success: function(data){
    

			
			var gradepoints= 0;
			var credithours = 0;
				
					for (var i = 0; i< data.length; i++)
					{
							if (data[i][2] == "A"){
									gradepoints = gradepoints + (4 * data[i][1]);
									credithours = credithours + (1 *data[i][1]);
							}else if (data[i][2] == "A-"){
									gradepoints = gradepoints + (3.70 * data[i][1]);
									credithours = credithours + (1* data[i][1]);	
							}else if (data[i][2] == "B+"){
									gradepoints = gradepoints + (3.33 * data[i][1]);
									credithours = credithours + (1* data[i][1]);	
							}else if (data[i][2] == "B"){
									gradepoints = gradepoints + (3.3 * data[i][1]);
									credithours = credithours + (1* data[i][1]);	
							}else if (data[i][2] == "B-"){
									gradepoints = gradepoints + (2.70 * data[i][1]);
									credithours = credithours + (1* data[i][1]);	
							}else if (data[i][2] == "C+"){
									gradepoints = gradepoints + (2.30 * data[i][1]);
									credithours = credithours + (1* data[i][1]);	
							}else if (data[i][2] == "C"){
									gradepoints = gradepoints + (2 * data[i][1]);
									credithours = credithours + (1* data[i][1]);	
							}else if (data[i][2] == "C-"){
									gradepoints = gradepoints + (1.70 * data[i][1]);
									credithours = credithours + (1* data[i][1]);	
							}else if (data[i][2] == "D+"){
									gradepoints = gradepoints + (1.30 * data[i][1]);
									credithours = credithours + (1* data[i][1]);	
							}else if (data[i][2] == "D"){
									gradepoints = gradepoints + (1.0 * data[i][1]);
									credithours = credithours + (1* data[i][1]);	
							}else if (data[i][2] == "D-"){
									gradepoints = gradepoints + (0.70 * data[i][1]);
									credithours = credithours + (1* data[i][1]);	
							}else if (data[i][2] == "F"){
									gradepoints = gradepoints + (0 * data[i][1]);
									credithours = credithours + (1* data[i][1]);	
							}else if (data[i][2] == "IP"){
									gradepoints = gradepoints + (0 * data[i][1]);
									credithours = credithours + (0* data[i][1]);	
							}else {
									gradepoints = gradepoints + (0 * data[i][1]);
									credithours = credithours + (0* data[i][1]);	
									}
						
					}
					
					var gpa = gradepoints/credithours
					gpa = Math.round(gpa * 100)/100;
					
					$("#GPACalc").replaceWith('<p id = "GPACalc">' + gpa + '</p>');

             courseTaken = $('#coursesTaken').dataTable({
                     "aaData": data,
					"aaSorting": [[ 0, "asc" ]],
               "aoColumns": [
					//{ "bVisible": true},
               { "sTitle": "Course ID" },
               { "sTitle": "Credits" },
               { "sTitle": "Grade" }
              
               ],
				
					 "paging": false,
               "bJQueryUI": true,
               "bAutoWidth": true,
               "sPaginationType": "full_numbers"
             });
		
					
					
		 			$('#coursesTaken').removeAttr("style");

				 	$('#coursesTaken tbody tr td').off();
				  	
				 	$('#coursesTaken tbody tr td').on('click', sto_rowClickHandler );

				

		

					$("#addButton").click(function(){
					
			

					fnAddCourseTaken();


				
					
					}); 


       },
		    error: function(XMLHttpRequest, textStatus, errorThrown){
		       alert(errorThrown);
		    }
   }); 

		
					

			function fnAddCourseTaken() {
				var course = $("input[name=courseTaken1]").val();
				var credits = $("input[name=courseCredits1]").val();
				var grade = $("input[name=Grade]").val();
				var major = $("input[name=major]").val();
				sto_addItem(course, credits,grade,major);
			   $( "tr:contains('" + course + "')").each(function() {
   		   courseNeeded.fnDeleteRow(this);

					
					var oSettings = $('#coursesTaken').dataTable().fnSettings();
					var rowCount = oSettings.fnRecordsTotal();
					var gradesForGPA = [];
					var creditsForGPA = [];
					for(var i=0;i<rowCount;i++) {
							var id = $('#coursesTaken').dataTable().fnGetData(i, 2);
						   gradesForGPA.push(id);
							var id2 = $('#coursesTaken').dataTable().fnGetData(i, 1);
						   creditsForGPA.push(id2);
						}				
						 gradesForGPA.push(grade);
						 creditsForGPA.push(credits);
					
					fnGPACalc(gradesForGPA, creditsForGPA);
  });
				
			}

			function fnGPACalc(grades, credits){

			var gradepoints= 0;
			var credithours = 0;
				
					for (var i = 0; i< grades.length; i++)
					{
							if (grades[i] == "A"){
									gradepoints = gradepoints + (4 * credits[i]);
									credithours = credithours + (1 *credits[i]);
							}else if (grades[i] == "A-"){
									gradepoints = gradepoints + (3.70 * credits[i]);
									credithours = credithours + (1* credits[i]);	
							}else if (grades[i] == "B+"){
									gradepoints = gradepoints + (3.33 * credits[i]);
									credithours = credithours + (1* credits[i]);	
							}else if (grades[i] == "B"){
									gradepoints = gradepoints + (3.3 * credits[i]);
									credithours = credithours + (1* credits[i]);	
							}else if (grades[i] == "B-"){
									gradepoints = gradepoints + (2.70 * credits[i]);
									credithours = credithours + (1* credits[i]);	
							}else if (grades[i] == "C+"){
									gradepoints = gradepoints + (2.30 * credits[i]);
									credithours = credithours + (1* credits[i]);	
							}else if (grades[i]== "C"){
									gradepoints = gradepoints + (2 * credits[i]);
									credithours = credithours + (1* credits[i]);	
							}else if (grades[i] == "C-"){
									gradepoints = gradepoints + (1.70 * credits[i]);
									credithours = credithours + (1* credits[i]);	
							}else if (grades[i]== "D+"){
									gradepoints = gradepoints + (1.30 * credits[i]);
									credithours = credithours + (1* credits[i]);	
							}else if (grades[i] == "D"){
									gradepoints = gradepoints + (1.0 * credits[i]);
									credithours = credithours + (1* credits[i]);	
							}else if (grades[i] == "D-"){
									gradepoints = gradepoints + (0.70 * credits[i]);
									credithours = credithours + (1* credits[i]);	
							}else if (grades[i]== "F"){
									gradepoints = gradepoints + (0 * credits[i]);
									credithours = credithours + (1* credits[i]);	
							}else if (grades[i] == "IP"){
									gradepoints = gradepoints + (0 * credits[i]);
									credithours = credithours + (0*  credits[i]);	
							}else {
									gradepoints = gradepoints + (0 * credits[i]);
									credithours = credithours + (0* credits[i]);	
									}
						
					}
					
					var gpa = gradepoints/credithours
					gpa = Math.round(gpa * 100)/100;
					
					$("#GPACalc").replaceWith('<p id = "GPACalc">' + gpa + '</p>');





}


 $.ajax({
      type: 'POST',
      url: OvrlDashphpURL,
      dataType: 'json',
      data: {
          action:'courseNeeded'
         
      },
      success: function(data){
    
			

             courseNeeded = $('#coursesNeeded').dataTable({
                     "aaData": data,
               "aoColumns": [
               { "sTitle": "Course ID" },
               { "sTitle": "Credits" },
					 { "sTitle": "Weight" },
               { "sTitle": "Relevance" },
               
               ],
					"paging": false,
               "bJQueryUI": true,
               "bAutoWidth": false
               
             });


 			$('#coursesNeeded').removeAttr("style");

       	$('#coursesNeeded tbody tr td').off();
        	
       	$('#coursesNeeded tbody tr td').on('click', sto_rowClickHandler2 );




function fnAddCourseNeeded() {

	var course2 = $("input[name=courseNeeded1]").val();
	var credits2 = $("input[name=courseCredits2]").val();
	var relev = $("input[name=relevance]").val();
	var major2 = $("input[name=major2]").val();
  $('#coursesNeeded').dataTable().fnAddData( [
	 '<input type="checkbox" name="myCheckbox" />',
    course2,
    credits2,
    relev
     ]
  );
     $('#coursesTaken').removeAttr("style");
  	  $('#coursesNeeded tbody tr td').off();
  	  $('#coursesNeeded tbody tr td').on('click', sto_rowClickHandler2 );
}




	



$("#addButton2").click(function(){
	fnAddCourseNeeded();	

}); 





       },
       error: function(XMLHttpRequest, textStatus, errorThrown){
          alert(errorThrown);
       }
   }); 

$.ajax({
       type: 'POST',
       url: OvrlDashphpURL,
       dataType: 'json',
       data: {
           action:'getUser',
           
       },
       success: function(data){
	
	
	$("#studName").append(' ' +data.name + '!!');


       },
       error: function(XMLHttpRequest, textStatus, errorThrown){
          alert(errorThrown);
       }
   }); 

var graddata = new Array();
$("#gradprogs").change(function(){
    
	for(var i = 0; i< graddata.length; i++)
			{
			if ($("#gradprogs").val() == graddata[i][0]) {
	  			//$('#data p').append(graddata[i][1]);
				$("#data p:first").replaceWith('<p>' + graddata[i][1] + '</p>');
			}
	
	}
   
});

$.ajax({
       type: 'POST',
       url: OvrlDashphpURL,
       dataType: 'json',
       data: {
           action:'getGradProgram',
           
       },
       success: function(data){
	
	graddata = data;
	
	for (var i = 0;i<data.length; i++) {

	var cs = data[i][0];
	
	$("#gradprogs").append('<option value ="'+ cs + '">'+ cs +'</option>');
	}


for (var i = 0; data.length;i++)
{
	if ($("#gradprogs").val() == data[i][0]) {
   $('#data p').append(data[i][1]);
}
}


       },
       error: function(XMLHttpRequest, textStatus, errorThrown){
          alert(errorThrown);
       }
   });

  



}




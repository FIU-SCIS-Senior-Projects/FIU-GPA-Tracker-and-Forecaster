 $(document).ready(function() {
     start();
 });

 function toggle() {
     $("#coursesTaken tbody td:nth-child(3) ").toggle();
     $(".GPACalcBox p:nth-child(2)").toggle();
 }
 var childTableDTNeeded;
 var childTableDT;
 var childTableTakenE
 var parentTable;
 var parentTableTaken;
 var childTable1;
 var childTable2;
 var courseNeeded;
 var coursesNeededDT;
  var coursesTakenDT;
 var courseTaken;
 var courseTakenBuckets;
 var courseNeededBuckets;
 var nCID = "";
 var nCredits = "";
 var nGrade = "";
 var nMajor = "";

 function sto_formatStoreManagerDetails(oTable, nTr) {
     var aData = oTable.fnGetData(nTr);
     var id = aData[0];
     var sOut = '';
     sOut += '<div id="itemDetails' + id + '">';
     sOut += '	<div class="buttonColumnDetails">';
     sOut += '		<button id="modifyItem' + id + '">Modify</button>';
     sOut += '		<button id="deleteItem' + id + '">>>></button>';
     sOut +=
         '		<div id = "pop" style = "display: none" title="Modify Grade" > ';
     //sOut += '			<p>ENTER NEW GRADE</p>';
     sOut += '			<form method = "post" name = "newcourseID">';
     //sOut += '			   <label for="nCID">Course ID</label><br>';
     //sOut += '				<input id = "nCID" placeholder =" New Course ID" size	= "8" type="text" name="nCID"><br>';
     sOut += '				<label for="nGrade">Grade:</label>';
     //sOut += '				<input id = "nCredits" placeholder =" New Credits " size	= "8" type="text" name="nCredits"><br>';
     sOut +=
         '				<input id = "nGrade" style="margin-left: 90px;" placeholder =" New Grade " size	= "8" type="text" name="nGrade"><br><br>';
     //sOut += '				<input id = "nMajor" placeholder =" New Major " size	= "8" type="text" name="nMajor"><br>';
     sOut += '				<button id = "modSubmit" type="button">Submit</button>';
     sOut += '			</form>';
     sOut += '		</div>';
     sOut += '	</div>';
     sOut += '</div>';
     return sOut;
 }

function sto_formatDataTable(oTable, nTr) {
     var aData = oTable.fnGetData(nTr);
     var id = aData[1];
     var sOut = '';
	   sOut += '<table id ="coursesTakenDT">';//'<div id="itemDetails' + id + '">';
     sOut += '<thead><tr><th></th><th></th><th></th></tr></thead>'; //'	<div class="buttonColumnDetails">';
     sOut += '<tbody></tbody></table>';//'		<button id="modifyItem' + id + '">Modify</button>';
   

     return sOut;
 }

function sto_formatDataTableNeeded(oTable, nTr) {
     var aData = oTable.fnGetData(nTr);
     var id = aData[1];
     var sOut = '';
	   sOut += '<table id ="coursesNeededDT">';//'<div id="itemDetails' + id + '">';
     sOut += '<thead><tr><th></th><th></th><th></th><th></th></tr></thead>'; //'	<div class="buttonColumnDetails">';
     sOut += '<tbody></tbody></table>';//'		<button id="modifyItem' + id + '">Modify</button>';
   

     return sOut;
 }


 function sto_formatStoreManagerDetails2(oTable, nTr) {
     var aData = oTable.fnGetData(nTr);
     var id = aData[0];
     var sOut = '';
     sOut += '<div id="itemDetails' + id + '">';
     sOut += '	<div class="buttonColumnDetails">';
     sOut += '		<button id="moveItem' + id + '"><<<</button>';
     sOut += '		<button id="modifyItem' + id + '">Modify</button>';
     sOut +=
         '		<div id = "pop2" style = "display: none" title="Modify Weight and Relevance" > ';
     //sOut += '			<p>ENTER NEW COURSE DETAILS</p>';
     sOut +=
         '			<form method = "post" id = "newGrade" name = "newcourseID">';
     sOut += '			   <label for="nWeight">Weight:    </label>';
     sOut +=
         '				<input style="margin-left: 60px;" id = "nWeight" placeholder =" New Weight" size	= "8" type="text" name="nWeight"><br>';
     sOut += '				<label for="nRelev">Relevance: </label>';
     //sOut += '				<input id = "nCredits" placeholder =" New Credits " size	= "8" type="text" name="nCredits"><br>';
     sOut +=
         '				<input style="margin-left: 31px;" id = "nRelev" placeholder ="New Relevance " size	= "8" type="text" name="nRelev"><br><br>';
     //sOut += '				<input id = "nMajor" placeholder =" New Major " size	= "8" type="text" name="nMajor"><br>';
     sOut += '				<button id = "modSubmit2" type="button">Submit</button>';
     sOut += '			</form>';
     sOut += '		</div>';
     sOut += '	</div>';
     sOut += '</div>';
     return sOut;
 }

 function sto_rowClickHandler() {
     var nTr = this.parentNode;
     var open = false;
     try {
         if ($(nTr).next().children().first().hasClass("ui-state-highlight"))
             open = true;
     } catch (err) {
         alert(err);
     }
     if (open) {
         /* This row is already open - close it */
         childTableDT.fnClose(nTr);
         $(nTr).css("color", "");
     } else {
         sto_openDetailsRow(nTr);
     }
 }

 function sto_rowClickHandler2() {
     var nTr = this.parentNode;
     var open = false;
     try {
         if ($(nTr).next().children().first().hasClass("ui-state-highlight"))
             open = true;
     } catch (err) {
         alert(err);
     }
     if (open) {
         /* This row is already open - close it */
         childTable1.fnClose(nTr);
         $(nTr).css("color", "");
     } else {
         sto_openDetailsRow2(nTr);
     }
 }

 function sto_rowClickHandler3() {
     var nTr = this.parentNode;
     var open = false;
     try {
         if ($(nTr).next().children().first().hasClass("ui-state-highlight"))
             open = true;
     } catch (err) {
         alert(err);
     }
     if (open) {
         /* This row is already open - close it */
         studRoster.fnClose(nTr);
         $(nTr).css("color", "");
     } else {
         sto_openDetailsRow3(nTr);
     }
 }

function sto_rowClickHandler4() {
     var nTr = this.parentNode;
     var open = false;
     try {
         if ($(nTr).next().children().first().hasClass("ui-state-highlight"))
             open = true;
     } catch (err) {
         alert(err);
     }
     if (open) {
         /* This row is already open - close it */
         childTable2.fnClose(nTr);
         $(nTr).css("color", "");
     } else {
         sto_openDetailsRow4(nTr);
     }
 }
function sto_rowClickHandler5() {
     var nTr = this.parentNode;
     var open = false;
     try {
         if ($(nTr).next().children().first().hasClass("ui-state-highlight"))
             open = true;
     } catch (err) {
         alert(err);
     }
     if (open) {
         /* This row is already open - close it */
         childTableTakenE.fnClose(nTr);
         $(nTr).css("color", "");
     } else {
         sto_openDetailsRow5(nTr);
     }
 }
 
 function addArrow(oTable, nTr) {
     var bData = oTable.fnGetData(nTr);
     sto_addItem(bData[0], bData[1], 'IP', 'CS');
     oTable.fnDeleteRow(nTr);
 }

 function sto_openDetailsRow2(nTr) {
     childTable1.fnOpen(nTr, sto_formatStoreManagerDetails2( childTable1,
         nTr), "ui-state-highlight");
     var aData =  childTable1.fnGetData(nTr);
     $("#modifyItem" + aData[0]).button();
     $("#moveItem" + aData[0]).button();
     var divId = "#itemDetails" + aData[0];
     $("#modifyItem" + aData[0]).click(function() {
         $("#pop2").dialog();
         $('#pop2').on('dialogclose', function(event) {
             childTable1.fnClose(nTr);
             (divId).empty();
             $(nTr).css("color", "#c5dbec");
             $("#pop2").remove();
         });
     });
     $("#modSubmit2").click(function() {
         nRelev = $("input[name=nRelev]").val();
         nWeight = $("input[name=nWeight]").val();
         sto_modWeight(childTable1, divId, nTr, nWeight, nRelev);
          childTable1.fnUpdate([aData[0], aData[1], nWeight, nRelev],
             nTr);
         $('#pop2').dialog('close');
     });
     $("#addArrow").click(function() {
         $(nTr).css("color", "#c5dbec");
         addArrow(childTable1, nTr);
     });
     $("#moveItem" + aData[0]).click(function() {
         $(nTr).css("color", "#c5dbec");
         addArrow(childTable1, nTr);
     });
 }

 function sto_openDetailsRow4(nTr) {
     childTable2.fnOpen(nTr, sto_formatStoreManagerDetails2( childTable2,
         nTr), "ui-state-highlight");
     var aData =  childTable2.fnGetData(nTr);
     $("#modifyItem" + aData[0]).button();
     $("#moveItem" + aData[0]).button();
     var divId = "#itemDetails" + aData[0];
     $("#modifyItem" + aData[0]).click(function() {
         $("#pop2").dialog();
         $('#pop2').on('dialogclose', function(event) {
             childTable2.fnClose(nTr);
             (divId).empty();
             $(nTr).css("color", "#c5dbec");
             $("#pop2").remove();
         });
     });
     $("#modSubmit2").click(function() {
         nRelev = $("input[name=nRelev]").val();
         nWeight = $("input[name=nWeight]").val();
         sto_modWeight(childTable2, divId, nTr, nWeight, nRelev);
          childTable2.fnUpdate([aData[0], aData[1], nWeight, nRelev],
             nTr);
         $('#pop2').dialog('close');
     });
     $("#addArrow").click(function() {
         $(nTr).css("color", "#c5dbec");
         addArrow(childTable2, nTr);
     });
     $("#moveItem" + aData[0]).click(function() {
         $(nTr).css("color", "#c5dbec");
         addArrow(childTable2, nTr);
     });
 }
 function sto_openDetailsRow5(nTr) {
  
childTableTakenE.fnOpen(nTr, sto_formatStoreManagerDetails(childTableTakenE, nTr),
         "ui-state-highlight");
     var aData = childTableTakenE.fnGetData(nTr);
     $("#modifyItem" + aData[0]).button();
     $("#deleteItem" + aData[0]).button();
     var divId = "#itemDetails" + aData[0];
     $("#modifyItem" + aData[0]).click(function() {
         $("#pop").dialog();
         $('#pop').on('dialogclose', function(event) {
             childTableTakenE.fnClose(nTr);
             $("#pop").remove();
         });
         (divId).empty();
         $(nTr).css("color", "#c5dbec");
     });
     $("#modSubmit").click(function() {
         nGrade = $("input[name=nGrade]").val();
         $('#nGrade').val(nGrade);
         sto_modCourse(childTableTakenE, divId, nTr, nGrade, nCID);
         childTableTakenE.fnUpdate([aData[0], aData[1], nGrade], nTr);
         $('#pop').dialog('close');
         childTableTakenE.fnClose(nTr);

         function fnGPACalc(grades, credits) {
             var gradepoints = 0;
             var credithours = 0;
             for (var i = 0; i < grades.length; i++) {
                 if (grades[i] == "A") {
                     gradepoints = gradepoints + (4 * credits[i]);
                     credithours = credithours + (1 * credits[i]);
                 } else if (grades[i] == "A-") {
                     gradepoints = gradepoints + (3.70 *
                         credits[i]);
                     credithours = credithours + (1 * credits[i]);
                 } else if (grades[i] == "B+") {
                     gradepoints = gradepoints + (3.33 *
                         credits[i]);
                     credithours = credithours + (1 * credits[i]);
                 } else if (grades[i] == "B") {
                     gradepoints = gradepoints + (3.3 * credits[
                         i]);
                     credithours = credithours + (1 * credits[i]);
                 } else if (grades[i] == "B-") {
                     gradepoints = gradepoints + (2.70 *
                         credits[i]);
                     credithours = credithours + (1 * credits[i]);
                 } else if (grades[i] == "C+") {
                     gradepoints = gradepoints + (2.30 *
                         credits[i]);
                     credithours = credithours + (1 * credits[i]);
                 } else if (grades[i] == "C") {
                     gradepoints = gradepoints + (2 * credits[i]);
                     credithours = credithours + (1 * credits[i]);
                 } else if (grades[i] == "C-") {
                     gradepoints = gradepoints + (1.70 *
                         credits[i]);
                     credithours = credithours + (1 * credits[i]);
                 } else if (grades[i] == "D+") {
                     gradepoints = gradepoints + (1.30 *
                         credits[i]);
                     credithours = credithours + (1 * credits[i]);
                 } else if (grades[i] == "D") {
                     gradepoints = gradepoints + (1.0 * credits[
                         i]);
                     credithours = credithours + (1 * credits[i]);
                 } else if (grades[i] == "D-") {
                     gradepoints = gradepoints + (0.70 *
                         credits[i]);
                     credithours = credithours + (1 * credits[i]);
                 } else if (grades[i] == "F") {
                     gradepoints = gradepoints + (0 * credits[i]);
                     credithours = credithours + (1 * credits[i]);
                 } else if (grades[i] == "IP") {
                     gradepoints = gradepoints + (0 * credits[i]);
                     credithours = credithours + (0 * credits[i]);
                 } else {
                     gradepoints = gradepoints + (0 * credits[i]);
                     credithours = credithours + (0 * credits[i]);
                 }
             }
             var gpa = gradepoints / credithours
             gpa = Math.round(gpa * 100) / 100;
             var text = $('#data p:first').text();
             var reqGrd = parseInt(text);
            
             $("#GPACalc").replaceWith('<p id = "GPACalc">' +
                 gpa + '</p>');
             if (gpa >= reqGrd) {
                 $("#GPACalc").css('color', '#E6C12B');
							var glow = $('#GPACalc');
				setInterval(function(){
    glow.hasClass('glow') ? glow.removeClass('glow') : glow.addClass('glow');
}, 2000);
             } else {
                 $("#GPACalc").css('color', 'black');
				    var glow = $('#GPACalc');
				setInterval(function(){
    glow.hasClass('glowoff') ? glow.removeClass('glowoff') : glow.addClass('glowoff');
}, 2000);
             }
         }
         var oSettings = $('#coursesTakenE').dataTable().fnSettings();
         var rowCount = oSettings.fnRecordsTotal();
         var gradesForGPA2 = [];
         var creditsForGPA2 = [];
         for (var i = 0; i < rowCount; i++) {
             var id = $('#coursesTakenE').dataTable().fnGetData(i, 2);
             gradesForGPA2.push(id);
             var id2 = $('#coursesTakenE').dataTable().fnGetData(i,
                 1);
             creditsForGPA2.push(id2);
         }
         fnGPACalc(gradesForGPA2, creditsForGPA2);
     });
     $("#deleteItem" + aData[0]).click(function() {
         var del = confirm("Delete course?");
         if (del == true) {
             sto_deleteItem(childTableTakenE, divId, nTr);
             childTableTakenE.fnClose(nTr);
             childTableTakenE.fnDeleteRow(nTr);
             alert("Course Info for " + aData[0] + " deleted!");

             function fnGPACalc(grades, credits) {
                 var gradepoints = 0;
                 var credithours = 0;
                 for (var i = 0; i < grades.length; i++) {
                     if (grades[i] == "A") {
                         gradepoints = gradepoints + (4 *
                             credits[i]);
                         credithours = credithours + (1 *
                             credits[i]);
                     } else if (grades[i] == "A-") {
                         gradepoints = gradepoints + (3.70 *
                             credits[i]);
                         credithours = credithours + (1 *
                             credits[i]);
                     } else if (grades[i] == "B+") {
                         gradepoints = gradepoints + (3.33 *
                             credits[i]);
                         credithours = credithours + (1 *
                             credits[i]);
                     } else if (grades[i] == "B") {
                         gradepoints = gradepoints + (3.3 *
                             credits[i]);
                         credithours = credithours + (1 *
                             credits[i]);
                     } else if (grades[i] == "B-") {
                         gradepoints = gradepoints + (2.70 *
                             credits[i]);
                         credithours = credithours + (1 *
                             credits[i]);
                     } else if (grades[i] == "C+") {
                         gradepoints = gradepoints + (2.30 *
                             credits[i]);
                         credithours = credithours + (1 *
                             credits[i]);
                     } else if (grades[i] == "C") {
                         gradepoints = gradepoints + (2 *
                             credits[i]);
                         credithours = credithours + (1 *
                             credits[i]);
                     } else if (grades[i] == "C-") {
                         gradepoints = gradepoints + (1.70 *
                             credits[i]);
                         credithours = credithours + (1 *
                             credits[i]);
                     } else if (grades[i] == "D+") {
                         gradepoints = gradepoints + (1.30 *
                             credits[i]);
                         credithours = credithours + (1 *
                             credits[i]);
                     } else if (grades[i] == "D") {
                         gradepoints = gradepoints + (1.0 *
                             credits[i]);
                         credithours = credithours + (1 *
                             credits[i]);
                     } else if (grades[i] == "D-") {
                         gradepoints = gradepoints + (0.70 *
                             credits[i]);
                         credithours = credithours + (1 *
                             credits[i]);
                     } else if (grades[i] == "F") {
                         gradepoints = gradepoints + (0 *
                             credits[i]);
                         credithours = credithours + (1 *
                             credits[i]);
                     } else if (grades[i] == "IP") {
                         gradepoints = gradepoints + (0 *
                             credits[i]);
                         credithours = credithours + (0 *
                             credits[i]);
                     } else {
                         gradepoints = gradepoints + (0 *
                             credits[i]);
                         credithours = credithours + (0 *
                             credits[i]);
                     }
                 }
                 var gpa = gradepoints / credithours
                 gpa = Math.round(gpa * 100) / 100;
                 var text = $('#data p:first').text();
                 var reqGrd = parseInt(text);
                 if (gpa > reqGrd) {
                     $("#GPACalc").css('color', ' #E6C12B');
						var glow = $('#GPACalc');
				setInterval(function(){
    glow.hasClass('glow') ? glow.removeClass('glow') : glow.addClass('glow');
}, 2000);
                 } else {
                     $("#GPACalc").css('color', ' black');
								    var glow = $('#GPACalc');
				setInterval(function(){
    glow.hasClass('glowoff') ? glow.removeClass('glowoff') : glow.addClass('glowoff');
}, 2000);
                 }
                 $("#GPACalc").replaceWith('<p id = "GPACalc">' +
                     gpa + '</p>');
                
             }
             var oSettings = $('#coursesTaken').dataTable().fnSettings();
             var rowCount = oSettings.fnRecordsTotal();
             var gradesForGPA2 = [];
             var creditsForGPA2 = [];
             for (var i = 0; i < rowCount; i++) {
                 var id = $('#coursesTaken').dataTable().fnGetData(
                     i, 2);
                 gradesForGPA2.push(id);
                 var id2 = $('#coursesTaken').dataTable().fnGetData(
                     i, 1);
                 creditsForGPA2.push(id2);
             }
             fnGPACalc(gradesForGPA2, creditsForGPA2);
         } else {
             courseTaken.fnClose(nTr);
         }
     });
 }

 function sto_openDetailsRow3(nTr) {
     studRoster.fnOpen(nTr, sto_formatStoreManagerDetails2(studRoster, nTr),
         "ui-state-highlight");
     var aData = studRoster.fnGetData(nTr);
     $("#modifyItem" + aData[0]).button();
     $("#deleteItem" + aData[0]).button();
     var divId = "#itemDetails" + aData[0];
     $("#modifyItem" + aData[0]).click(function() {
         adminLogin(aData[0]);
         $(location).attr('href', 'OvrlDash.html');
     });
     $("#deleteItem" + aData[0]).click(function() {
         var del = confirm("Delete course?");
         if (del == true) {
             sto_deleteItem2(divId, nTr);
         } else {
             studRoster.fnClose(nTr);
         }
     });
 }

 function adminLogin(adminUser) {
     var OvrlDashphpURL = 'OvrlDash.php';
     $.ajax({
         type: 'POST',
         url: OvrlDashphpURL,
         data: {
             type: '1',
             adminUser: adminUser
         },
         success: function(data) {},
         error: function(XMLHttpRequest, textStatus, errorThrown) {
             alert(errorThrown);
         }
     });
 }

 function sto_deleteItem2(divId, nTr) {
     // createLoadingDivAfter(divId,"Deleting Item");
     var OvrlDashphpURL = 'OvrlDash.php';
     var aData = courseNeeded.fnGetData(nTr);
     var name = aData[1];
     var id = aData[0];
     $.ajax({
         type: 'POST',
         url: OvrlDashphpURL,
         dataType: 'json',
         data: {
             action: 'deleteCourseNeeded',
             courseID: id
         },
         success: function(data) {
             //removeLoadingDivAfter(divId);
             if (data.success) {
                 courseNeeded.fnClose(nTr);
                 courseNeeded.fnDeleteRow(nTr);
             } else {
                 $(nTr).css("color", "");
                 courseNeeded.fnClose(nTr);
                 alert("data.success = false");
             }
         },
         error: function(XMLHttpRequest, textStatus, errorThrown) {
             alert(errorThrown);
         }
     });
 }

 function sto_openDetailsRow(nTr) {
     childTableDT.fnOpen(nTr, sto_formatStoreManagerDetails(childTableDT, nTr),
         "ui-state-highlight");
     var aData = childTableDT.fnGetData(nTr);
     $("#modifyItem" + aData[0]).button();
     $("#deleteItem" + aData[0]).button();
     var divId = "#itemDetails" + aData[0];
     $("#modifyItem" + aData[0]).click(function() {
         $("#pop").dialog();
         $('#pop').on('dialogclose', function(event) {
             childTableDT.fnClose(nTr);
             $("#pop").remove();
         });
         (divId).empty();
         $(nTr).css("color", "#c5dbec");
     });
     $("#modSubmit").click(function() {
         nGrade = $("input[name=nGrade]").val();
         $('#nGrade').val(nGrade);
         sto_modCourse(childTableDT, divId, nTr, nGrade, nCID);
        childTableDT.fnUpdate([aData[0], aData[1], nGrade], nTr);
         $('#pop').dialog('close');
         childTableDT.fnClose(nTr);

         function fnGPACalc(grades, credits) {
             var gradepoints = 0;
             var credithours = 0;
             for (var i = 0; i < grades.length; i++) {
                 if (grades[i] == "A") {
                     gradepoints = gradepoints + (4 * credits[i]);
                     credithours = credithours + (1 * credits[i]);
                 } else if (grades[i] == "A-") {
                     gradepoints = gradepoints + (3.70 *
                         credits[i]);
                     credithours = credithours + (1 * credits[i]);
                 } else if (grades[i] == "B+") {
                     gradepoints = gradepoints + (3.33 *
                         credits[i]);
                     credithours = credithours + (1 * credits[i]);
                 } else if (grades[i] == "B") {
                     gradepoints = gradepoints + (3.3 * credits[
                         i]);
                     credithours = credithours + (1 * credits[i]);
                 } else if (grades[i] == "B-") {
                     gradepoints = gradepoints + (2.70 *
                         credits[i]);
                     credithours = credithours + (1 * credits[i]);
                 } else if (grades[i] == "C+") {
                     gradepoints = gradepoints + (2.30 *
                         credits[i]);
                     credithours = credithours + (1 * credits[i]);
                 } else if (grades[i] == "C") {
                     gradepoints = gradepoints + (2 * credits[i]);
                     credithours = credithours + (1 * credits[i]);
                 } else if (grades[i] == "C-") {
                     gradepoints = gradepoints + (1.70 *
                         credits[i]);
                     credithours = credithours + (1 * credits[i]);
                 } else if (grades[i] == "D+") {
                     gradepoints = gradepoints + (1.30 *
                         credits[i]);
                     credithours = credithours + (1 * credits[i]);
                 } else if (grades[i] == "D") {
                     gradepoints = gradepoints + (1.0 * credits[
                         i]);
                     credithours = credithours + (1 * credits[i]);
                 } else if (grades[i] == "D-") {
                     gradepoints = gradepoints + (0.70 *
                         credits[i]);
                     credithours = credithours + (1 * credits[i]);
                 } else if (grades[i] == "F") {
                     gradepoints = gradepoints + (0 * credits[i]);
                     credithours = credithours + (1 * credits[i]);
                 } else if (grades[i] == "IP") {
                     gradepoints = gradepoints + (0 * credits[i]);
                     credithours = credithours + (0 * credits[i]);
                 } else {
                     gradepoints = gradepoints + (0 * credits[i]);
                     credithours = credithours + (0 * credits[i]);
                 }
             }
             var gpa = gradepoints / credithours
             gpa = Math.round(gpa * 100) / 100;
             var text = $('#data p:first').text();
             var reqGrd = parseInt(text);
            
             $("#GPACalc").replaceWith('<p id = "GPACalc">' +
                 gpa + '</p>');
             if (gpa >= reqGrd) {
                 $("#GPACalc").css('color', '#E6C12B');
							var glow = $('#GPACalc');
				setInterval(function(){
    glow.hasClass('glow') ? glow.removeClass('glow') : glow.addClass('glow');
}, 2000);
             } else {
                 $("#GPACalc").css('color', 'black');
				    var glow = $('#GPACalc');
				setInterval(function(){
    glow.hasClass('glowoff') ? glow.removeClass('glowoff') : glow.addClass('glowoff');
}, 2000);
             }
         }
         var oSettings = $('#coursesTaken').dataTable().fnSettings();
         var rowCount = oSettings.fnRecordsTotal();
         var gradesForGPA2 = [];
         var creditsForGPA2 = [];
         for (var i = 0; i < rowCount; i++) {
             var id = $('#coursesTaken').dataTable().fnGetData(i, 2);
             gradesForGPA2.push(id);
             var id2 = $('#coursesTaken').dataTable().fnGetData(i,
                 1);
             creditsForGPA2.push(id2);
         }
         fnGPACalc(gradesForGPA2, creditsForGPA2);
     });
     $("#deleteItem" + aData[0]).click(function() {
         var del = confirm("Delete course?");
         if (del == true) {
             sto_deleteItem(courseTaken, divId, nTr);
             courseTaken.fnClose(nTr);
             courseTaken.fnDeleteRow(nTr);
             alert("Course Info for " + aData[0] + " deleted!");

             function fnGPACalc(grades, credits) {
                 var gradepoints = 0;
                 var credithours = 0;
                 for (var i = 0; i < grades.length; i++) {
                     if (grades[i] == "A") {
                         gradepoints = gradepoints + (4 *
                             credits[i]);
                         credithours = credithours + (1 *
                             credits[i]);
                     } else if (grades[i] == "A-") {
                         gradepoints = gradepoints + (3.70 *
                             credits[i]);
                         credithours = credithours + (1 *
                             credits[i]);
                     } else if (grades[i] == "B+") {
                         gradepoints = gradepoints + (3.33 *
                             credits[i]);
                         credithours = credithours + (1 *
                             credits[i]);
                     } else if (grades[i] == "B") {
                         gradepoints = gradepoints + (3.3 *
                             credits[i]);
                         credithours = credithours + (1 *
                             credits[i]);
                     } else if (grades[i] == "B-") {
                         gradepoints = gradepoints + (2.70 *
                             credits[i]);
                         credithours = credithours + (1 *
                             credits[i]);
                     } else if (grades[i] == "C+") {
                         gradepoints = gradepoints + (2.30 *
                             credits[i]);
                         credithours = credithours + (1 *
                             credits[i]);
                     } else if (grades[i] == "C") {
                         gradepoints = gradepoints + (2 *
                             credits[i]);
                         credithours = credithours + (1 *
                             credits[i]);
                     } else if (grades[i] == "C-") {
                         gradepoints = gradepoints + (1.70 *
                             credits[i]);
                         credithours = credithours + (1 *
                             credits[i]);
                     } else if (grades[i] == "D+") {
                         gradepoints = gradepoints + (1.30 *
                             credits[i]);
                         credithours = credithours + (1 *
                             credits[i]);
                     } else if (grades[i] == "D") {
                         gradepoints = gradepoints + (1.0 *
                             credits[i]);
                         credithours = credithours + (1 *
                             credits[i]);
                     } else if (grades[i] == "D-") {
                         gradepoints = gradepoints + (0.70 *
                             credits[i]);
                         credithours = credithours + (1 *
                             credits[i]);
                     } else if (grades[i] == "F") {
                         gradepoints = gradepoints + (0 *
                             credits[i]);
                         credithours = credithours + (1 *
                             credits[i]);
                     } else if (grades[i] == "IP") {
                         gradepoints = gradepoints + (0 *
                             credits[i]);
                         credithours = credithours + (0 *
                             credits[i]);
                     } else {
                         gradepoints = gradepoints + (0 *
                             credits[i]);
                         credithours = credithours + (0 *
                             credits[i]);
                     }
                 }
                 var gpa = gradepoints / credithours
                 gpa = Math.round(gpa * 100) / 100;
                 var text = $('#data p:first').text();
                 var reqGrd = parseInt(text);
                 if (gpa > reqGrd) {
                     $("#GPACalc").css('color', ' #E6C12B');
						var glow = $('#GPACalc');
				setInterval(function(){
    glow.hasClass('glow') ? glow.removeClass('glow') : glow.addClass('glow');
}, 2000);
                 } else {
                     $("#GPACalc").css('color', ' black');
								    var glow = $('#GPACalc');
				setInterval(function(){
    glow.hasClass('glowoff') ? glow.removeClass('glowoff') : glow.addClass('glowoff');
}, 2000);
                 }
                 $("#GPACalc").replaceWith('<p id = "GPACalc">' +
                     gpa + '</p>');
                
             }
             var oSettings = $('#coursesTaken').dataTable().fnSettings();
             var rowCount = oSettings.fnRecordsTotal();
             var gradesForGPA2 = [];
             var creditsForGPA2 = [];
             for (var i = 0; i < rowCount; i++) {
                 var id = $('#coursesTaken').dataTable().fnGetData(
                     i, 2);
                 gradesForGPA2.push(id);
                 var id2 = $('#coursesTaken').dataTable().fnGetData(
                     i, 1);
                 creditsForGPA2.push(id2);
             }
             fnGPACalc(gradesForGPA2, creditsForGPA2);
         } else {
             courseTaken.fnClose(nTr);
         }
     });
 }

 function sto_addItem(courseID, credits, grade, major) {
     //createLoadingDivAfter(containerId,"Creating Item");
     var OvrlDashphpURL = 'OvrlDash.php';
     $.ajax({
         type: 'POST',
         url: OvrlDashphpURL,
         dataType: 'json',
         data: {
             action: 'addCourse',
             courseID: courseID,
             credits: credits,
             grade: grade,
             major: major
         },
         success: function(data) {
             if (data.success) {
                 courseTaken.fnAddData([
                     courseID,
                     credits,
                     grade
                 ]);
               
             } else {
                 alert("failed to add course");
             }
         },
         error: function(XMLHttpRequest, textStatus, errorThrown) {}
     });
 }

 function sto_modCourse(oTable, divId, nTr, nGrade, nCID) {
     // createLoadingDivAfter(divId,"Deleting Item");
     var OvrlDashphpURL = 'OvrlDash.php';
     var aData = oTable.fnGetData(nTr);
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
             action: 'modCourse',
             modifiedGrade: newGrade,
             modifiedCourse: newCourse,
             courseID: id,
             credits: credits,
             grade: grade,
             major: major
         },
         success: function(data) {
             //removeLoadingDivAfter(divId);
             if (data.success) {
                 $(nTr).css("color", "");
                 oTable.fnClose(nTr);
                 //courseTaken.fnDeleteRow(nTr);
             } else {
                 $(nTr).css("color", "");
                 oTable.fnClose(nTr);
                 alert("data.success = false");
             }
         },
         error: function(XMLHttpRequest, textStatus, errorThrown) {
             alert(errorThrown);
         }
     });
 }

 function sto_modWeight(oTable, divId, nTr, nWeight, nRelev) {
     // createLoadingDivAfter(divId,"Deleting Item");
     var OvrlDashphpURL = 'OvrlDash.php';
     var aData = oTable.fnGetData(nTr);
     var id = aData[0];
     var newRelev = nRelev;
     var newWeight = nWeight;
     $.ajax({
         type: 'POST',
         url: OvrlDashphpURL,
         dataType: 'json',
         data: {
             action: 'modWeight',
             modifiedWeight: newWeight,
             modifiedRelevance: newRelev,
             courseID: id
         },
         success: function(data) {
             //removeLoadingDivAfter(divId);
             if (data.success) {
                 $(nTr).css("color", "");
                 oTable.fnClose(nTr);
                 
             } else {
                 $(nTr).css("color", "");
                 oTable.fnClose(nTr);
                 alert("data.success = false");
             }
         },
         error: function(XMLHttpRequest, textStatus, errorThrown) {
             alert(errorThrown);
         }
     });
 }

 function sto_deleteItem(oTable, divId, nTr) {
     // createLoadingDivAfter(divId,"Deleting Item");
     var OvrlDashphpURL = 'OvrlDash.php';
     var aData = oTable.fnGetData(nTr);
     var credits = aData[1];
     var id = aData[0];
     var grade = aData[2];

     $.ajax({
         type: 'POST',
         url: OvrlDashphpURL,
         dataType: 'json',
         data: {
             action: 'deleteItem',
             courseID: id
         },
         success: function(data) {
             //removeLoadingDivAfter(divId);
             if (data.success) {
                 oTable.fnClose(nTr);
                 oTable.fnDeleteRow(nTr);
                
             } else {
                 $(nTr).css("color", "");
                 oTable.fnClose(nTr);
                 alert("data.success = false");
             }
         },
         error: function(XMLHttpRequest, textStatus, errorThrown) {
             alert(errorThrown);
         }
     });
 }


 function start() {

var OvrlDashphpURL = 'OvrlDash.php';
  $.ajax({
         type: 'POST',
         url: OvrlDashphpURL,
         dataType: 'json',
         data: {
             action: 'getMajorBuckets',
         },
         success: function(data) {
            
          
			 courseTakenBuckets = $('#parentTableTaken').dataTable({
        "aaData": data,
                 "aaSorting": [
                     [0, "asc"]
                 ],
                 "aoColumns": [
                     //{ "bVisible": true},
                     {
                         "sTitle": ""
                     }, {
                         "sTitle": "Courses Taken"
                     }
                 ], order: [1, "asc"],
        columnDefs: [{
            sortable: false,
            targets: [0]
        }],
"bJQueryUI": true,
"retrieve": true
    });

            // $('#parentTableTaken').removeAttr("style");
             $('#parentTableTaken tbody tr td').off();
             $('#parentTableTaken tbody tr td').on('click',
                 clickBucket);
            
	 function clickBucket() {
     var nTr = this.parentNode;
     var open = false;
     try {
         if ($(nTr).next().children().first().hasClass("ui-state-highlight"))
             open = true;
     } catch (err) {
         alert(err);
     }
     if (open) {
         /* This row is already open - close it */
        courseTakenBuckets.fnClose(nTr);
         $(nTr).css("color", "");
     } else {
        openBucket(nTr);
     }
 }

function openBucket(nTr){
		
   courseTakenBuckets.fnOpen(nTr, sto_formatDataTable(courseTakenBuckets,
         nTr), "ui-state-highlight");
	var aData =  courseTakenBuckets.fnGetData(nTr);
	var bucket = aData[1];
	var childTableDT;
var OvrlDashphpURL = 'OvrlDash.php';
 $.ajax({
         type: 'POST',
         url: OvrlDashphpURL,
         dataType: 'json',
         data: {
             action: 'getMajorBucketsCourse',
				 bucket: bucket
         },
         success: function(data) {
             childTableDT = $('#coursesTakenDT' ).dataTable({
                 "aaData": data,
                 "aoColumns": [{
                     "sTitle": "Course ID"
                 }, {
                     "sTitle": "Credits"
                 }, {
                     "sTitle": "Grade"
                 }, ],
                
                 "bAutoWidth": false,
                 "sPaginationType": "full_numbers",
						 "retrieve": true
		});		
			  $('#coursesTakenDT tbody tr td').off();
             $('#coursesTakenDT tbody tr td').on('click',
			 sto_rowClickHandlerTaken);

function sto_rowClickHandlerTaken() {
     var nTr = this.parentNode;
     var open = false;
     try {
         if ($(nTr).next().children().first().hasClass("ui-state-highlight"))
             open = true;
     } catch (err) {
         alert(err);
     }
     if (open) {
         /* This row is already open - close it */
         childTableDT.fnClose(nTr);
         $(nTr).css("color", "");
     } else {
         sto_openDetailsRowTaken(nTr);
     }
 }

function sto_openDetailsRowTaken(nTr) {
     childTableDT.fnOpen(nTr, sto_formatStoreManagerDetails(childTableDT, nTr),
         "ui-state-highlight");
     var aData = childTableDT.fnGetData(nTr);
     $("#modifyItem" + aData[0]).button();
     $("#deleteItem" + aData[0]).button();
     var divId = "#itemDetails" + aData[0];
  $("#modifyItem" + aData[0]).click(function() {
         $("#pop").dialog();
         $('#pop').on('dialogclose', function(event) {
             childTableDT.fnClose(nTr);
             $("#pop").remove();
         });
         (divId).empty();
         $(nTr).css("color", "#c5dbec");
     });
     $("#modSubmit").click(function() {
         nGrade = $("input[name=nGrade]").val();
         $('#nGrade').val(nGrade);
         sto_modCourse(childTableDT, divId, nTr, nGrade, nCID);
        childTableDT.fnUpdate([aData[0], aData[1], nGrade], nTr);
         $('#pop').dialog('close');
         childTableDT.fnClose(nTr);
});
 $("#deleteItem" + aData[0]).click(function() {
         var del = confirm("Delete course?");
         if (del == true) {
             sto_deleteItem( childTableDT, divId, nTr);
             childTableDT.fnClose(nTr);
              childTableDT.fnDeleteRow(nTr);
             alert("Course Info for " + aData[0] + " deleted!");

}else {
             childTableDT.fnClose(nTr);
         }

});

}




},
 error: function(XMLHttpRequest, textStatus, errorThrown) {
             alert(errorThrown);
         }

     });

     var aData =  courseTakenBuckets.fnGetData(nTr);
     $("#modifyItem" + aData[0]).button();
     $("#moveItem" + aData[0]).button();
     var divId = "#itemDetails" + aData[0];
     $("#modifyItem" + aData[0]).click(function() {
         $("#pop2").dialog();
         $('#pop2').on('dialogclose', function(event) {
            courseTakenBuckets.fnClose(nTr);
             (divId).empty();
             $(nTr).css("color", "#c5dbec");
             $("#pop2").remove();
         });
     });
     $("#modSubmit2").click(function() {
         nRelev = $("input[name=nRelev]").val();
         nWeight = $("input[name=nWeight]").val();
         sto_modWeight( courseTakenBuckets, divId, nTr, nWeight, nRelev);
          courseTakenBuckets.fnUpdate([aData[0], aData[1], nWeight, nRelev],
             nTr);
         $('#pop2').dialog('close');
     });
    
     $("#moveItem" + aData[0]).click(function() {
         $(nTr).css("color", "#c5dbec");
         addArrow(courseTakenBuckets, nTr);
     });

}

         },
         error: function(XMLHttpRequest, textStatus, errorThrown) {
             alert(errorThrown);
         }

     });


$.ajax({
         type: 'POST',
         url: OvrlDashphpURL,
         dataType: 'json',
         data: {
             action: 'getMajorBucketsNeeded',
         },
         success: function(data) {
            
          
			 courseNeededBuckets = $('#parentTable').dataTable({
        "aaData": data,
                 "aaSorting": [
                     [0, "asc"]
                 ],
                 "aoColumns": [
                     //{ "bVisible": true},
                     {
                         "sTitle": ""
                     }, {
                         "sTitle": "Courses Needed"
                     }
                 ], order: [1, "asc"],
        columnDefs: [{
            sortable: false,
            targets: [0]
        }],
"bJQueryUI": true,
"retrieve": true
    });

            // $('#parentTableTaken').removeAttr("style");
             $('#parentTable tbody tr td').off();
             $('#parentTable tbody tr td').on('click',
                 clickBucket);
            
	 function clickBucket() {
     var nTr = this.parentNode;
     var open = false;
     try {
         if ($(nTr).next().children().first().hasClass("ui-state-highlight"))
             open = true;
     } catch (err) {
         alert(err);
     }
     if (open) {
         /* This row is already open - close it */
        courseNeededBuckets.fnClose(nTr);
         $(nTr).css("color", "");
     } else {
        openBucket(nTr);
     }
 }

function openBucket(nTr){
		
   courseNeededBuckets.fnOpen(nTr, sto_formatDataTableNeeded(courseNeededBuckets,
         nTr), "ui-state-highlight");
	var aData =  courseNeededBuckets.fnGetData(nTr);
	var bucket = aData[1];
	var childTableDTNeeded;
var OvrlDashphpURL = 'OvrlDash.php';
 $.ajax({
         type: 'POST',
         url: OvrlDashphpURL,
         dataType: 'json',
         data: {
             action: 'getMajorBucketsCourseNeeded',
				 bucket: bucket
         },
         success: function(data) {
             childTableDTNeeded = $('#coursesNeededDT' ).dataTable({
                 "aaData": data,
                 "aoColumns": [{
                     "sTitle": "Course ID"
                 }, {
                     "sTitle": "Credits"
                 }, {
                     "sTitle": "Weight"
                 }, {
                     "sTitle": "Relevance"
                 }, ],
                
                 "bAutoWidth": false,
                 "sPaginationType": "full_numbers",
						 "retrieve": true
		});		
			  $('#coursesNeededDT tbody tr td').off();
             $('#coursesNeededDT tbody tr td').on('click',
			 sto_rowClickHandlerNeeded);

function sto_rowClickHandlerNeeded() {
     var nTr = this.parentNode;
     var open = false;
     try {
         if ($(nTr).next().children().first().hasClass("ui-state-highlight"))
             open = true;
     } catch (err) {
         alert(err);
     }
     if (open) {
         /* This row is already open - close it */
         childTableDTNeeded.fnClose(nTr);
         $(nTr).css("color", "");
     } else {
         sto_openDetailsRowNeeded(nTr);
     }
 }

function sto_openDetailsRowNeeded(nTr) {
     childTableDTNeeded.fnOpen(nTr, sto_formatStoreManagerDetails2(childTableDTNeeded, nTr),
         "ui-state-highlight");
     var aData = childTableDTNeeded.fnGetData(nTr);
     $("#modifyItem" + aData[0]).button();
     $("#moveItem" + aData[0]).button();
var divId = "#itemDetails" + aData[0];
     $("#modifyItem" + aData[0]).click(function() {
         $("#pop2").dialog();
         $('#pop2').on('dialogclose', function(event) {
             childTableDTNeeded.fnClose(nTr);
             (divId).empty();
             $(nTr).css("color", "#c5dbec");
             $("#pop2").remove();
         });
     });
     $("#modSubmit2").click(function() {
         nRelev = $("input[name=nRelev]").val();
         nWeight = $("input[name=nWeight]").val();
         sto_modWeight(childTableDTNeeded, divId, nTr, nWeight, nRelev);
         childTableDTNeeded.fnUpdate([aData[0], aData[1], nWeight, nRelev],
             nTr);
         $('#pop2').dialog('close');
     });
  
     $("#moveItem" + aData[0]).click(function() {
         $(nTr).css("color", "#c5dbec");
         addArrow(childTableDTNeeded, nTr);
     });
}




},
 error: function(XMLHttpRequest, textStatus, errorThrown) {
             alert(errorThrown);
         }

     });

     var aData =  courseNeededBuckets.fnGetData(nTr);
     $("#modifyItem" + aData[0]).button();
     $("#moveItem" + aData[0]).button();
     var divId = "#itemDetails" + aData[0];
     $("#modifyItem" + aData[0]).click(function() {
         $("#pop2").dialog();
         $('#pop2').on('dialogclose', function(event) {
            courseNeededBuckets.fnClose(nTr);
             (divId).empty();
             $(nTr).css("color", "#c5dbec");
             $("#pop2").remove();
         });
     });
     $("#modSubmit2").click(function() {
         nRelev = $("input[name=nRelev]").val();
         nWeight = $("input[name=nWeight]").val();
         sto_modWeight( courseNeededBuckets, divId, nTr, nWeight, nRelev);
          courseNeededBuckets.fnUpdate([aData[0], aData[1], nWeight, nRelev],
             nTr);
         $('#pop2').dialog('close');
     });
     $("#addArrow").click(function() {
         $(nTr).css("color", "#c5dbec");
         addArrow(courseNeededBuckets, nTr);
     });
     $("#moveItem" + aData[0]).click(function() {
         $(nTr).css("color", "#c5dbec");
         addArrow(courseNeededBuckets, nTr);
     });

}

         },
         error: function(XMLHttpRequest, textStatus, errorThrown) {
             alert(errorThrown);
         }

     });
     $("#myonoffswitch").click(function() {
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
             action: 'editStudent'
         },
         success: function(data) {
             studRoster = $('#studRost').dataTable({
                 "aaData": data,
                 "aaSorting": [
                     [0, "asc"]
                 ],
                 "aoColumns": [
                     //{ "bVisible": true},
                     {
                         "sTitle": "Username"
                     }, {
                         "sTitle": "Last name"
                     }, {
                         "sTitle": "First name"
                     }, {
                         "sTitle": "Email"
                     }
                 ],
                 "bJQueryUI": true,
                 "bAutoWidth": true,
                 "sPaginationType": "full_numbers"
             });
             $('#studRost').removeAttr("style");
             $('#studRost tbody tr td').off();
             $('#studRost tbody tr td').on('click',
                 sto_rowClickHandler3);
         },
         error: function(XMLHttpRequest, textStatus, errorThrown) {
             alert(errorThrown);
         }
     });
     $.ajax({
         type: 'POST',
         url: OvrlDashphpURL,
         dataType: 'json',
         data: {
             action: 'courseTaken1'
         },
         success: function(data) {
         //              $('.GPATable').html('<table cellpadding="0" cellspacing="0"  style="width:95%" class="display" id="coursesTaken"></table>');
             var gradepoints = 0;
             var credithours = 0;
             for (var i = 0; i < data.length; i++) {
                 if (data[i][2] == "A") {
                     gradepoints = gradepoints + (4 * data[i][1]);
                     credithours = credithours + (1 * data[i][1]);
                 } else if (data[i][2] == "A-") {
                     gradepoints = gradepoints + (3.70 * data[i]
                         [1]);
                     credithours = credithours + (1 * data[i][1]);
                 } else if (data[i][2] == "B+") {
                     gradepoints = gradepoints + (3.33 * data[i]
                         [1]);
                     credithours = credithours + (1 * data[i][1]);
                 } else if (data[i][2] == "B") {
                     gradepoints = gradepoints + (3.3 * data[i]
                         [1]);
                     credithours = credithours + (1 * data[i][1]);
                 } else if (data[i][2] == "B-") {
                     gradepoints = gradepoints + (2.70 * data[i]
                         [1]);
                     credithours = credithours + (1 * data[i][1]);
                 } else if (data[i][2] == "C+") {
                     gradepoints = gradepoints + (2.30 * data[i]
                         [1]);
                     credithours = credithours + (1 * data[i][1]);
                 } else if (data[i][2] == "C") {
                     gradepoints = gradepoints + (2 * data[i][1]);
                     credithours = credithours + (1 * data[i][1]);
                 } else if (data[i][2] == "C-") {
                     gradepoints = gradepoints + (1.70 * data[i]
                         [1]);
                     credithours = credithours + (1 * data[i][1]);
                 } else if (data[i][2] == "D+") {
                     gradepoints = gradepoints + (1.30 * data[i]
                         [1]);
                     credithours = credithours + (1 * data[i][1]);
                 } else if (data[i][2] == "D") {
                     gradepoints = gradepoints + (1.0 * data[i]
                         [1]);
                     credithours = credithours + (1 * data[i][1]);
                 } else if (data[i][2] == "D-") {
                     gradepoints = gradepoints + (0.70 * data[i]
                         [1]);
                     credithours = credithours + (1 * data[i][1]);
                 } else if (data[i][2] == "F") {
                     gradepoints = gradepoints + (0 * data[i][1]);
                     credithours = credithours + (1 * data[i][1]);
                 } else if (data[i][2] == "IP") {
                     gradepoints = gradepoints + (0 * data[i][1]);
                     credithours = credithours + (0 * data[i][1]);
                 } else {
                     gradepoints = gradepoints + (0 * data[i][1]);
                     credithours = credithours + (0 * data[i][1]);
                 }
             }
             var gpa = gradepoints / credithours
             gpa = Math.round(gpa * 100) / 100;
             $("#GPACalc").replaceWith('<p id = "GPACalc">' +
                 gpa + '</p>');

  

/*
             courseTaken = $('#coursesTaken').dataTable({
                 "aaData": data,
                 "aaSorting": [
                     [0, "asc"]
                 ],
                 "aoColumns": [
                     //{ "bVisible": true},
                     {
                         "sTitle": "Course ID"
                     }, {
                         "sTitle": "Credits"
                     }, {
                         "sTitle": "Grade"
                     }
                 ],
                 "bJQueryUI": true,
                 "bAutoWidth": true,
                 "sPaginationType": "full_numbers"
             });
             $('#coursesTaken').removeAttr("style");
             $('#coursesTaken tbody tr td').off();
             $('#coursesTaken tbody tr td').on('click',
                 sto_rowClickHandler);


*/
             $("#addButton").click(function() {
                 fnAddCourseTaken();
             });
             var reqGrdtext = $('#data p:first').text();
             var curGPAtext = $('#GPACalc').text();
             var curGPA = parseFloat(curGPAtext);
             var reqGrd = parseFloat(reqGrdtext);
             if (curGPA >= reqGrdtext) {
                 $("#GPACalc").css('color', ' #E6C12B');
								var glow = $('#GPACalc');
				setInterval(function(){
    glow.hasClass('glow') ? glow.removeClass('glow') : glow.addClass('glow');
}, 2000);
             } else {
                 $("#GPACalc").css('color', 'black');
						    var glow = $('#GPACalc');
				setInterval(function(){
    glow.hasClass('glowoff') ? glow.removeClass('glowoff') : glow.addClass('glowoff');
}, 2000);
             }
         },
         error: function(XMLHttpRequest, textStatus, errorThrown) {
             alert(errorThrown);
         }
     });

     function fnAddCourseTaken() {
         var course = $("input[name=courseTaken1]").val();
         var credits = $("input[name=courseCredits1]").val();
         var grade = $("input[name=Grade]").val();
         var major = $("input[name=major]").val();
         sto_addItem(course, credits, grade, major);
         $("tr:contains('" + course + "')").each(function() {
             courseNeeded.fnDeleteRow(this);
             var oSettings = $('#coursesTaken').dataTable().fnSettings();
             var rowCount = oSettings.fnRecordsTotal();
             var gradesForGPA = [];
             var creditsForGPA = [];
             for (var i = 0; i < rowCount; i++) {
                 var id = $('#coursesTaken').dataTable().fnGetData(
                     i, 2);
                 gradesForGPA.push(id);
                 var id2 = $('#coursesTaken').dataTable().fnGetData(
                     i, 1);
                 creditsForGPA.push(id2);
             }
             gradesForGPA.push(grade);
             creditsForGPA.push(credits);
             fnGPACalc(gradesForGPA, creditsForGPA);
         });
     }

     function fnGPACalc(grades, credits) {
         var gradepoints = 0;
         var credithours = 0;
         for (var i = 0; i < grades.length; i++) {
             if (grades[i] == "A") {
                 gradepoints = gradepoints + (4 * credits[i]);
                 credithours = credithours + (1 * credits[i]);
             } else if (grades[i] == "A-") {
                 gradepoints = gradepoints + (3.70 * credits[i]);
                 credithours = credithours + (1 * credits[i]);
             } else if (grades[i] == "B+") {
                 gradepoints = gradepoints + (3.33 * credits[i]);
                 credithours = credithours + (1 * credits[i]);
             } else if (grades[i] == "B") {
                 gradepoints = gradepoints + (3.3 * credits[i]);
                 credithours = credithours + (1 * credits[i]);
             } else if (grades[i] == "B-") {
                 gradepoints = gradepoints + (2.70 * credits[i]);
                 credithours = credithours + (1 * credits[i]);
             } else if (grades[i] == "C+") {
                 gradepoints = gradepoints + (2.30 * credits[i]);
                 credithours = credithours + (1 * credits[i]);
             } else if (grades[i] == "C") {
                 gradepoints = gradepoints + (2 * credits[i]);
                 credithours = credithours + (1 * credits[i]);
             } else if (grades[i] == "C-") {
                 gradepoints = gradepoints + (1.70 * credits[i]);
                 credithours = credithours + (1 * credits[i]);
             } else if (grades[i] == "D+") {
                 gradepoints = gradepoints + (1.30 * credits[i]);
                 credithours = credithours + (1 * credits[i]);
             } else if (grades[i] == "D") {
                 gradepoints = gradepoints + (1.0 * credits[i]);
                 credithours = credithours + (1 * credits[i]);
             } else if (grades[i] == "D-") {
                 gradepoints = gradepoints + (0.70 * credits[i]);
                 credithours = credithours + (1 * credits[i]);
             } else if (grades[i] == "F") {
                 gradepoints = gradepoints + (0 * credits[i]);
                 credithours = credithours + (1 * credits[i]);
             } else if (grades[i] == "IP") {
                 gradepoints = gradepoints + (0 * credits[i]);
                 credithours = credithours + (0 * credits[i]);
             } else {
                 gradepoints = gradepoints + (0 * credits[i]);
                 credithours = credithours + (0 * credits[i]);
             }
         }
         var gpa = gradepoints / credithours
         gpa = Math.round(gpa * 100) / 100;
         var text = $('#data p:first').text();
         var reqGrd = parseFloat(text);
         if (gpa >= reqGrd) {
             $("#GPACalc").css('color', ' #E6C12B');
			
         } else {
             $("#GPACalc").css('color', 'black');
         }
         $("#GPACalc").replaceWith('<p id = "GPACalc">' + gpa + '</p>');
         if (gpa >= reqGrd) {
             $("#GPACalc").css('color', '#E6C12B');
					var glow = $('#GPACalc');
				setInterval(function(){
    glow.hasClass('glow') ? glow.removeClass('glow') : glow.addClass('glow');
}, 2000);
         } else {
             $("#GPACalc").css('color', 'black');
				    var glow = $('#GPACalc');
				setInterval(function(){
    glow.hasClass('glowoff') ? glow.removeClass('glowoff') : glow.addClass('glowoff');
}, 2000);
         }
     }


function getTakenElectives(thiss) {

 $.ajax({
         type: 'POST',
         url: OvrlDashphpURL,
         dataType: 'json',
         data: {
             action: 'courseTakenElectives'
         },
         success: function(data) {
           

        var row = parentTableTaken.row($(thiss).closest("tr"));
        
        if(row.child() == undefined){
            $(thiss).html("-");
            var $table2 = $("<table id = 'coursesTakenE'><thead><tr><th></th><th></th><th></th></tr></thead><tbody></tbody></table>");
            $table2.attr("id", "coursesTakenE");
             childTableTakenE = $table2.dataTable({
                 "aaData": data,
                 "aaSorting": [
                     [0, "asc"]
                 ],
                 "aoColumns": [
                     //{ "bVisible": true},
                     {
                         "sTitle": "Course ID"
                     }, {
                         "sTitle": "Credits"
                     }, {
                         "sTitle": "Grade"
                     }
                 ],
                 
                 "bAutoWidth": true,
                 "sPaginationType": "full_numbers"
             });
            
            row.child(childTableTakenE.api().table().container());
            row.child.show();
        } else {
            $(thiss).html("+");
            row.child(false);
        }
    
 		$('#coursesTakenE tbody tr td').off();
             $('#coursesTakenE tbody tr td ').on('click',
                 sto_rowClickHandler5);

},
         error: function(XMLHttpRequest, textStatus, errorThrown) {
             alert(errorThrown);
         }
     });

}

            
     $.ajax({
         type: 'POST',
         url: OvrlDashphpURL,
         dataType: 'json',
         data: {
             action: 'getUser',
         },
         success: function(data) {
             $("#studName").append(', ' + data.name);
         },
         error: function(XMLHttpRequest, textStatus, errorThrown) {
             alert(errorThrown);
         }
     });
     var graddata = new Array();
     $("#gradprogs").change(function() {
         for (var i = 0; i < graddata.length; i++) {
             if ($("#gradprogs").val() == graddata[i][0]) {
                 //$('#data p').append(graddata[i][1]);
                 $("#data p:first").replaceWith('<p>' + graddata[i]
                     [1] + '</p>');
                 //var reqGrd = parseInt(graddata[i][1]);
                 var reqGrdtext = $('#data p:first').text();
                 var curGPAtext = $('#GPACalc').text();
                 var curGPA = parseFloat(curGPAtext);
                 var reqGrd = parseFloat(reqGrdtext);
                 //alert("Target gpa: " + reqGrd);
                 //alert(" cur gpa: " + curGPA);
                 if (curGPA >= reqGrdtext) {
                     $("#GPACalc").css('color', ' #E6C12B');
						   	var glow = $('#GPACalc');
				setInterval(function(){
    glow.hasClass('glow') ? glow.removeClass('glow') : glow.addClass('glow');
}, 2000);
                 } else {
                     $("#GPACalc").css('color', ' black');
						    var glow = $('#GPACalc');
				setInterval(function(){
    glow.hasClass('glowoff') ? glow.removeClass('glowoff') : glow.addClass('glowoff');
}, 2000);
                 }
             }
         }
     });
     $.ajax({
         type: 'POST',
         url: OvrlDashphpURL,
         dataType: 'json',
         data: {
             action: 'getGradProgram',
         },
         success: function(data) {
             graddata = data;
             for (var i = 0; i < data.length; i++) {
                 var cs = data[i][0];
                 $("#gradprogs").append('<option value ="' + cs +
                     '">' + cs + '</option>');
             }
             for (var i = 0; data.length; i++) {
                 if ($("#gradprogs").val() == data[i][0]) {
                     $('#data p').append(data[i][1]);
                 }
             }
         },
         error: function(XMLHttpRequest, textStatus, errorThrown) {
             alert(errorThrown);
         }

     });



 }
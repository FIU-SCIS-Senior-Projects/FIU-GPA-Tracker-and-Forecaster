var course;
var maintab;

$(document).ready(function(){
    course = getUrlVars()["id"];
    getCourse();
    makeTabs();
});

function getCourse()
{
    $.ajax({
        type: 'POST',
        url: 'tabs.php',
        data: {
            action: 'tabs',
            course: course
        },
        dataType: 'json',
        success: function(data) {
            var tabs = new Array();
            for(var i = 0; i < data.length; i++)
            {
                tabs.push(data[i]);
            }
            makeTabs(tabs)
        }
    });
}

function makeTabs(tabs)
{
    $('#tabs').html(""); //clear div
    $('#tabs').append("<ul></ul>");
    var div;
    var div = '';
    div += '<div id="addTab">';
    div += '    <form>';
    div += '         <table>';
    div += '             <thead>';
    div += '                 <tr>';
    div += '                     <th>Assessment Type</th>';
    div += '                     <th>Percentage</th>';
    div += '                 </tr>';
    div += '             </thead>';
    div += '             <tbody>';
    div += '                 <tr>';
    div += '                     <td><input type="text" id="assesment"></td>';
    div += '                     <td><input type="text" id="percentage"></td>';
    div += '                 </tr>';
    div += '             </tbody>';
    div += '         </table>';
    div += '         <button type="button" id="addBreak">Add Assessment</button>';
    div += '    </form>';
    div += '</div>';
    $('#tabs').append(div);
    $('#tabs').attr("tabindex", 0);
    $('#tabs ul').append('<li><a href="#addTab">Add Assesment</a></li>');

    for(var i = 0; i<tabs.length; i++)
    {
        $('#tabs ul').append('<li><a href="#' + tabs[i] + '"> ' + tabs[i] + '</a></li>');
        createDiv(tabs[i]);
    }


    $('#addBreak').click(function(){
        addAssesment();
    })

    maintab = $('#tabs').tabs();

    maintab.find( ".ui-tabs-nav" ).sortable({
        axis: "x",
        stop: function() {
            tabs.tabs( "refresh" );
        }
    });

}

function createDiv(assessment)
{
    var div = '';
    div += '<div id="'+ assessment +'">';
    div +=     '<form>';
    div +=         '<h1>Add Grade</h1>';
    div +=         '<input type="text" id="grade'+ assessment + '"><br>';
    div +=         '<button type="button" id="button' + assessment +'">Add Grade</button><br>';
    div += '        <button type="button" id="remove' + assessment +'">Remove Bucket</button><br>';
    div +=     '</form>';
    div += '<table cellpadding="0" cellspacing="0" border="0" class="display" id="' + assessment +'grades"></table>';
    div += '</div>';

    $('#tabs').append(div);
    var currCourse;
    $.ajax({
        type: 'POST',
        url: 'tabs.php',
        data: {
            action: 'getGrades',
            assessment: assessment,
            course: course
        },
        dataType: 'json',
        success: function(data) {
            currCourse = $('#' + assessment + 'grades').dataTable({
                "aaData": data,
                "aoColumns": [
                    {"sTitle": ""},
                    {"sTitle": "Grade"}
                ],
                "bJQueryUI": true,
                "bAutoWidth": false,
                "sPaginationType": "full_numbers"
            });
            $('#' + assessment + 'grades ' + 'tbody tr td').off();
            $('#' + assessment + 'grades ' + 'tbody tr td').on('click', curr_rowClickHandler);

            function curr_rowClickHandler()
            {
                var nTr = this.parentNode;
                var open= false;

                try{
                    if($(nTr).next().children().first().hasClass("ui-state-highlight"))
                        open=true;
                }catch(err){
                    alert(err);
                }

                if (open){
                    //This row is already open - close it
                    currCourse.fnClose( nTr );
                    $(nTr).css("color","");
                }else{
                    curr_openDetailsRow(nTr);
                }
            }

            function curr_openDetailsRow(nTr){
                currCourse.fnOpen( nTr, curr_formatStoreManagerDetails(currCourse, nTr), "ui-state-highlight" );
                var aData = currCourse.fnGetData( nTr );
                $("#" + assessment + "Remove"+aData[0]).button();
                $("#" + assessment + "Modify"+aData[0]).button();

                var divId = "#" + assessment + "Details"+aData[0];

                $("#" + assessment + "Remove"+aData[0]).click(function(){
                    remove_assessment(aData[1], nTr);
                });

                $("#" + assessment + "Modify"+aData[0]).click(function(){
                    modify_assessment(aData[1],aData[0], nTr);
                });
            }

            function curr_formatStoreManagerDetails ( oTable, nTr )
            {
                var aData = oTable.fnGetData( nTr );
                var id = aData[0];
                var sOut = '';
                sOut += '<div id="' + assessment +'Details'+id+'">';
                sOut += '    <div class="buttonColumnDetails">';
                sOut += '        <button id="' + assessment + 'Remove'+id+'">Remove</button><br>';
                sOut += '        <button id="' + assessment + 'Modify'+id+'">Modify</button><br>';
                sOut += '    </div>';
                sOut += '</div>';
                return sOut;

            }

            function remove_assessment(grade, nTr)
            {
                var del = confirm("Delete grade?");
                if (del == true) {
                    $.ajax({
                        type: 'POST',
                        url: 'tabs.php',
                        data: {
                            action: 'removeGrade',
                            assessment: assessment,
                            grade: grade,
                            course: course
                        },
                        dataType: 'text',
                        success: function (data) {
                            if (data == 'true') {
                                currCourse.fnClose(nTr);
                                currCourse.fnDeleteRow(nTr);
                            }
                            else {
                                alert("Error: Course was not removed.");
                            }
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown){
                            alert(errorThrown);
                        }
                    });
                }
            }

            function modify_assessment(grade, id, nTr)
            {
                var row = parseInt(id.slice(-1)) - 1;

                var div = '';
                div += '<div id="Modify'+ id +'">';
                div +=     '<form>';
                div +=         '<h1>Modify Grade</h1>';
                div +=         '<input type="text" id="grade'+ id + '"><br>';
                div +=         '<button type="button" id="button' + id +'">Modify Grade</button><br>';
                div +=     '</form>';
                div += '</div>';

                $('#' + assessment).append(div);

                $('#Modify' + id).dialog({
                    modal: true
                });

                $("#button" + id).click(function(){
                    var newGrade = $('#grade' + id).val();

                    $.ajax({
                        type: 'POST',
                        url: 'tabs.php',
                        data: {
                            action: 'modifyGrade',
                            course: course,
                            assessment: assessment,
                            grade: grade,
                            newGrade: newGrade
                        },
                        dataType: 'text',
                        success: function(data) {
                            if(data == "true")
                            {
                                alert("Grade Modified");
                                currCourse.fnUpdate(newGrade, row, 1);
                            }
                        }
                    });
                    $('#Modify' + id).dialog('close');
                    $('#Modify'+ id).remove();
                });
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
            alert(errorThrown);
        }
    });


    $('#button' + assessment).click(function(){
        addGrade(assessment, currCourse);
    });

    $('#' + 'remove' + assessment).click(function(){
        removeAssessment(assessment);
    });
}

function removeAssessment(assessment)
{
    $.ajax({
        type: 'POST',
        url: 'tabs.php',
        data: {
            action: 'removeBucket',
            course: course,
            assessment: assessment
        },
        dataType: 'text',
        success: function(data) {
            if(data == "true")
            {
                $("#" + assessment).remove();
                $("li[aria-controls = '" + assessment +"']").remove();
                maintab.tabs("refresh");
            }
        }
    });
}

function addGrade(assessment,  currCourse)
{
    var grade = $('#grade' + assessment).val();
    $.ajax({
        type: 'POST',
        url: 'tabs.php',
        data: {
            action: 'addGrade',
            course: course,
            assesment: assessment,
            grade: grade
        },
        dataType: 'text',
        success: function(data) {
            if(data == "true")
            {
                alert("Grade Added");
                currCourse.dataTable().fnAddData([
                    "Grade" + (currCourse.fnSettings().fnRecordsTotal() + 1),
                    grade
                ]);
            }
        }
    });
}

function addAssesment()
{
    var assessment = $('#assesment').val();
    var percentage = $('#percentage').val();
    $.ajax({
        type: 'POST',
        url: 'tabs.php',
        data: {
            action: 'add',
            course: course,
            assesment: assessment,
            percentage: percentage
        },
        dataType: 'text',
        success: function(data) {
            if(data=="true")
            {
                //location.reload();
                $('#tabs ul').append('<li><a href="#' + assessment + '"> ' + assessment + '</a></li>');
                createDiv(assessment);
                maintab.tabs("refresh");
            }
        }
    });
}

function getUrlVars() {
    var map = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        map[key] = value;
    });
    return map;
}
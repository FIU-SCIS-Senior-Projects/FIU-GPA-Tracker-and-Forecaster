$(document).ready(function() {
    start();
} );

var currCourse;
var breakdown = null;
var $dialog;
var breakRowNum;

function start() {
    $('#current_course').html('<table cellpadding="0" cellspacing="0" border="0" class="display" id="ajax1"></table>');

    $.ajax({
        type: 'POST',
        url: 'getCurrCourse.php',
        data: {
            action: 'currCourses'},
        dataType: 'json',
        success: function(data) {
            currCourse = $('#ajax1').dataTable({
                "aaData": data,
                "aoColumns": [
                    {"sTitle": "Course ID"},
                    {"sTitle": "Course Name"},
                    {"sTitle": "Credits"}
                ],
                "bJQueryUI": true,
                "bAutoWidth": false,
                "sPaginationType": "full_numbers"
            });
            $('#ajax1 tbody tr td').off();
            $('#ajax1 tbody tr td').on('click', curr_rowClickHandler);
        }
    });
}

function curr_rowClickHandler(){
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
    $("#Remove"+aData[0]).button();
    $("#Breakdown"+aData[0]).button();
    $("#Grades"+aData[0]).button();

    var divId = "#courseDetails"+aData[0];
    $("#Remove"+aData[0]).click(function(){
        /*$(nTr).css("color","#c5dbec");
        $(divId).empty();
        curr_openForm(divId, false, nTr, aData[0]);*/
        remove_course(aData[0], nTr);

    });

    $("#Breakdown"+aData[0]).click(function(){
        location.href = 'breakdown.html?id=' + aData[0];
    });
}

function curr_formatStoreManagerDetails ( oTable, nTr )
{
    var aData = oTable.fnGetData( nTr );
    var id = aData[0];
    var sOut = '';
    sOut += '<div id="courseDetails'+id+'">';
    sOut += '    <div class="buttonColumnDetails">';
    sOut += '        <button id="Remove'+id+'">Remove</button><br>';
    sOut += '        <button id="Breakdown'+id+'">Add/Change Breakdown</button><br>';
    sOut += '    </div>';
    sOut += '</div>';
    return sOut;
}

function remove_course(id, nTr) {
    var del = confirm("Delete course?");
    if (del == true) {
        $.ajax({
            type: 'POST',
            url: 'getCurrCourse.php',
            data: {
                action: 'remove',
                id: id
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
            }
        });
    }
}

function add_breakdown(course)
{
    if(breakdown == null)
    {
        var div =create_div(course);
        $dialog = $(div);

        $dialog.dialog({
            modal: true,
            width: 600
        });

        breakdown = $('#add_breakdown').dataTable({
            "aoColumns": [
                {"sTitle": "Name"},
                {"sTitle": "Percentage"},
            ],
            "bJQueryUI": true,
            "bAutoWidth": false,
            "sPaginationType": "full_numbers"
        });
    }
    else{
        $dialog.dialog({
            modal: true,
            width: 600
        });
        breakdown.clear();
        //breakdown.draw();
    }
    breakRowNum = 0;
    addBreakRow(breakRowNum);

    $('#addRow').click(function(){
        addBreakRow();
    });
}

function addBreakRow()
{
    var display = new Array();
    display.push('<input type="text" name="name' + breakRowNum +'">');
    display.push('<input type="text" name="per' + breakRowNum + '">');
    breakdown.fnAddData(display);
    breakRowNum++;
}

function create_div(course)
{
    var sout = '';
    sout += '<div id="dialog" title="Add Breakdown for ' + course + '">';
    sout += '    <form id="formDialog">';
    sout += '        <table cellpadding="0" cellspacing="0" border="0" class="display" id="add_breakdown"></table>';
    sout += '        <input type="text" name="action" style="display: none" value="add_breakdown" id="actionText">';
    sout += '        <button type="button" id="addRow">Add Row</button>';
    sout += '        <button type="button" id="removeRow">Remove Row</button>';
    sout += '        <input type="button" onclick="breakdown_submit()" value="Submit">';
    sout += '    </form>';
    sout += '</div>';
    return sout;
}

function breakdown_submit()
{
    $('#dialog').dialog('close');
    /*
    var pvars = new Array();
    for(var i= 0; i<breakRowNum; i++)
    {
        pvars.push($(['[name ="name' + course + '"]']).val());
        pvars.push($(['[name ="name' + course + '"]']).val());
    }

    $.ajax({
        type: 'POST',
        url: 'getCurrCourse.php',
        data: {
            action: 'currCourses'},
        dataType: 'text',
        success: function(){
            alert("Breakdown Added");
        }
    });
    */
    breakRowNum = 0;
}
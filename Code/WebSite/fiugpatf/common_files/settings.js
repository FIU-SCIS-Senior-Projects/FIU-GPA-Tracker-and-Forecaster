$(document).ready(function() {
    start();
} );

function start() {
    $('#settingsDiv').html('<table cellpadding="0" cellspacing="0" border="0" class="display" id="settings"></table>');

    $.ajax({
        type: 'POST',
        url: 'settings.php',
        data: {
            action: 'prepareTable'},
        dataType: 'json',
        success: function(data) {
            currCourse = $('#settings').dataTable({
                "aaData": data,
                "aoColumns": [
                    {"sTitle": "Action"},
                    {"sTitle": ""}
                ],
                "bJQueryUI": true,
                "bAutoWidth": false,
                "sPaginationType": "full_numbers"
            });
			$('#ExportButton').click(function(){
				exportData();
			});
			
			importData();
			//importWhatif();
        }
    });
}

function exportData()
{
	$.ajax({
        type: 'POST',
        url: 'settings.php',
        data: {
            action: 'exportData'},
        dataType: 'text',
        success: function(data) {
			if(data.length > 0){
				download('export.xml', data);
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
		    alert(errorThrown);
		}
	});
}

function importData()
{
	document.getElementById("ImportFile").click();
	var control = document.getElementById("ImportFile");
	control.addEventListener("change", function(event) {
		var file = control.files[0];
		var fData = new FormData();
		fData.append('selectedfile', this.files[0]);
		var reader = new FileReader();
		reader.onload = function(event) {
			var contents = event.target.result;
			var xhr = new XMLHttpRequest;
			$.ajax({
				type: 'POST',
				url: 'settings.php',
				data: {
					action: 'importData',
					file:   contents
				},
				dataType: 'text',
				success: function(data) {
					if(data == "true")
					{
						alert("File imported correctly!");
					}
					else
					{
						alert(data);
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown){
					alert(errorThrown);
				}
			});
		};
		reader.onerror = function(event) {
			alert("File could not be read! Code " + event.target.error.code);
		};
		reader.readAsText(this.files[0]);
		}, false); 

}

function importWhatif()
{
	document.getElementById("Whatif").click();
	var control = document.getElementById("Whatif");
	control.addEventListener("change", function(event) {
		var file = control.files[0];
		var fData = new FormData();
		fData.append('selectedfile', this.files[0]);
		var reader = new FileReader();
		reader.onload = function(event) {
			var contents = event.target.result;
			var xhr = new XMLHttpRequest;
			$.ajax({
				type: 'POST',
				url: 'settings.php',
				data: {
					action: 'importWhatif',
					file:   contents
				},
				dataType: 'text',
				success: function(data) {
					if(data == "true")
					{
						alert("File imported correctly!");
					}
					else
					{
						alert(data);
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown){
					alert(errorThrown);
				}
			});
		};
		reader.onerror = function(event) {
			alert("File could not be read! Code " + event.target.error.code);
		};
		reader.readAsText(this.files[0]);
		}, false); 

}

function download(filename, text) {
   var pom = document.createElement('a');
   pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
   pom.setAttribute('download', filename);    
   if (document.createEvent) {
       var event = document.createEvent('MouseEvents');
       event.initEvent('click', true, true);
       pom.dispatchEvent(event);
   }
   else {
       pom.click();
   }
} 

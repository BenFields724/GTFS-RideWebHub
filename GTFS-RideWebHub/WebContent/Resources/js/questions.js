var answer;
var def = '<p>Please Select the option that best describes your data:<br>\
	<input onclick= updateAns(this) type="radio" name="dataType" value="1"> Complete unvalidated GTFS-ride feed<br>\
	<input onclick= updateAns(this) type="radio" name="dataType" value="2"> Complete validated GTFS-ride feed<br>\
	<input onclick= updateAns(this) type="radio" name="dataType" value="3"> Partial GTFS-ride feed<br>\
	<input onclick= updateAns(this) type="radio" name="dataType" value="4"> GTFS feed<br>\
	<input  type="submit" value= "Submit" onclick="return checkAnswer()"> \
</p>';

$(document).ready(function(){
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		  // Great success! All the File APIs are supported.
		//alert('Supported');
		} else {
		  alert('The File APIs are not fully supported in this browser.');
		}
	
});


function checkAnswer(passForm)
{
	//str = "you chose "+ answer;
	//alert(str);
	if(answer=='1')
		{
		//unvalidated gtfs-ride file
			$('#dataPanel').html('<p>Please validate your feed before continue with the data upload process.' +
				'The validation tool can be found at <a target=# href="https://github.com/ODOT-PTS/transitfeed-ride">https://github.com/ODOT-PTS/transitfeed-ride</a></p>');
			$('#dataPanel').append('<input type=button value="Back" onclick="refresh()">');
		}
	else if(answer=='2')
		{
			//complete validated gtfs-ride feed
		$('#dataPanel').html('<p><strong>Complete Validated GTFS-ride feed</strong><br>Please load the feed files:</p>'+
				'<h1>GTFS Files:</h1>'+
				'<div class="fileButton"><strong>agency.txt </strong><input type="file" id="agencyFile"></div><br>'+
				'<div class="fileButton"><strong>stops.txt </strong><input type="file" id="stopsFile"></div><br>'+
				'<div class="fileButton"><strong>routes.txt </strong><input type="file" id="stopsFile"></div><br>'+
				'<div class="fileButton"><strong>trips.txt </strong><input type="file" id="stopsFile"></div><br>'+
				'<div class="fileButton"><strong>stop_times.txt </strong><input type="file" id="stopsFile"></div><br>'+
				'<div class="fileButton"><strong>calendar.txt </strong><input type="file" id="stopsFile"></div><br>'+
				'<div class="fileButton">calendar_dates.txt <input type="file" id="stopsFile"></div><br>'+
				'<div class="fileButton">fare_attributes.txt <input type="file" id="stopsFile"></div><br>'+
				'<div class="fileButton">fare_rules.txt <input type="file" id="stopsFile"></div><br>'+
				'<div class="fileButton">shapes.txt <input type="file" id="stopsFile"></div><br>'+
				'<div class="fileButton">frequencies.txt <input type="file" id="stopsFile"></div><br>'+
				'<div class="fileButton">transfers.txt <input type="file" id="stopsFile"></div><br>'+
				'<div class="fileButton">feed_info.txt <input type="file" id="stopsFile"></div><br>'+
				'<h1>GTFS-ride Files:</h1>'+
				'<div class="fileButton">board_alight.txt <input type="file" id="stopsFile"></div><br>'+
				'<div class="fileButton">trip_capacity.txt <input type="file" id="stopsFile"></div><br>'+
				'<div class="fileButton">rider_trip.txt <input type="file" id="stopsFile"></div><br>'+
				'<div class="fileButton">ridership.txt <input type="file" id="stopsFile"></div><br>'+
				'<div class="fileButton"><strong>ride_feed_info.txt </strong><input type="file" id="stopsFile"></div><br>'+
				'<div class="requiredNote">Note: Red colored files are required</div><br>');
		
	$('#dataPanel').prepend('<input type=button value="Back" onclick="refresh()">');
	$('#dataPanel').prepend('<input type=button value="Upload to Database" onclick=#0>');
	$('#dataPanel').prepend('<input type=button value="Create Zip" onclick=#0>');
	$('.fileButton').css("color","black");
		}
	else if(answer=='3')
		{
		//partial gtfs ride feed
		$('#dataPanel').html('<p>Partial GTFS-ride feed<br>TODO:Ask what files they have and what are incomplete with a form</p>');
	$('#dataPanel').append('<input type=button value="Back" onclick="refresh()">');
		}
	else if(answer=='4')
		{
		//only gtfs data
		$('#dataPanel').html('<p>GTFS feed<br> TODO:Load gtfs feed and then create new gtfs-ride files</p>');
	$('#dataPanel').append('<input type=button value="Back" onclick="refresh()">');
		}
	
	var selectedContent = $('li[data-content="Data Entry"]');
	var slectedContentHeight = selectedContent.innerHeight();
	$('.cd-tabs-content').animate({
		'height': slectedContentHeight
	}, 200);
	return false;
}

function refresh()
{
	$('#dataPanel').html(def);
	var selectedContent = $('li[data-content="Data Entry"]');
	var slectedContentHeight = selectedContent.innerHeight();
	$('.cd-tabs-content').animate({
		'height': slectedContentHeight
	}, 200);
	return false;
}

function updateAns(formButtom)
{
	answer = formButtom.value;
}
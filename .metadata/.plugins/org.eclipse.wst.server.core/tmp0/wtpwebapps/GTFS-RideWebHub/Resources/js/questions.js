var answer;
var fileEdit;
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
		
		$('#dataPanel').html('<p>'+
				'Choose the local(s) zip file(s)<br>'+
				'Note : your browser will process the zip file, don\'t choose a file too big !<br>'+
				'<input type="file" id="file" name="file" multiple /><br />'+
				'<div id="result_block" class="hidden">'+
				  '<p>Content :</p>'+
				  '<div id="result"></div>'+
				  '<input type=button value="load" onclick="testLoad()">'+
				'</div></p>');
		
	$('#dataPanel').append(' <input type=button value="Upload to Database" onclick=#0> ');
	$('#dataPanel').append('<input type=button value="Create Zip" onclick=#0>  ');
	$('#dataPanel').append('<input type=button value="Back" onclick="refresh()">');
	$('.fileButton').css("color","black");
		}
	else if(answer=='3')
		{
		//partial gtfs ride feed
		$('#dataPanel').html('<p><strong>Please select and upload your GTFS feed file in a zip file format</strong></p>'+
		'<div class="fileButton"><strong>GTFS feed: </strong><input type="file" id="GTFSFeed"></div><br>');

		
			$('#dataPanel').append(
				'<p>Select the files that need to be completed: <br>'+
					'<input type="checkbox" name="files" value="1"> Rider_feed_info.txt<br>'+
					'<input type="checkbox" name="files" value="2"> board_alight.txt<br>'+
					'<input type="checkbox" name="files" value="3">rider_trip.txt<br>'+
					'<input type="checkbox" name="files" value="4"> ridership.txt<br>'+
					'<input type="checkbox" name="files" value="5"> trip_capacity.txt<br>'+
					'<input type="submit" value="Continue"></p>'
					);

			$('#dataPanel').append(' <input type=button value="Upload to Database" onclick=#0> ');
			$('#dataPanel').append('<input type=button value="Create Zip" onclick=#0>  ');
			$('#dataPanel').append('<input type=button value="Back" onclick="refresh()">');
			$('.fileButton').css("color","black");
		}
	else if(answer=='4')
		{
		//only gtfs data
		$('#dataPanel').html('<p><strong>Please select and upload your GTFS feed file in a zip file format</strong></p>'+
		'<div class="fileButton"><strong>GTFS feed: </strong><input type="file" id="GTFSFeed"></div><br>');
		$('#dataPanel').append('<p>Please enter the data for your GTFS-ride feed:<br>'+
				'ride_feed_info.txt <input type="submit" onclick="enterData(1)" value="Edit"> <br>'+
				'board_alight.txt <input type="submit" onclick="enterData(2)" value="Edit"> <br>'+
				'rider_trip.txt <input type="submit" onclick="enterData(3)" value="Edit"> <br>'+
				'ridership.txt <input type="submit" onclick="enterData(4)" value="Edit"> <br>'+
				'trip_capacity.txt <input type="submit" onclick="enterData(5)" value="Edit"> <br>'
				);
		

			$('#dataPanel').append(' <input type=button value="Upload to Database" onclick=#0> ');
			$('#dataPanel').append('<input type=button value="Create Zip" onclick=#0>  ');
			$('#dataPanel').append('<input type=button value="Back" onclick="refresh()">');
			$('.fileButton').css("color","black");
			$('#dataPanel').append('<div id="editData"></div>');
		}
	
	var selectedContent = $('li[data-content="Data Entry"]');
	var slectedContentHeight = selectedContent.innerHeight();
	$('.cd-tabs-content').animate({
		'height': slectedContentHeight
	}, 200);
	return false;
}

function clearEdit(){
	$('#editData').html("");
	var selectedContent = $('li[data-content="Data Entry"]');
	var slectedContentHeight = selectedContent.innerHeight();
	$('.cd-tabs-content').animate({
		'height': slectedContentHeight
	}, 200);
}

function enterData(i){
	if(i==1)
		{
			$('#editData').html('<br><div class="editPanel">'+
					'<br><strong>ride_files</stong> <input type="number" name="numFiles" min="0" max="6"><br>'+
					'ride_start_date <input type="text" name="ride_start_date"> (format YYYYMMDD)<br>'+
					'ride_end_date <input type="text" name="ride_end_date"> (format YYYYMMDD)<br>'+
					'gtfs_feed_date <input type="text" name="gtfs_feed_date"> (format YYYYMMDD)<br>'+
					'default_currency_type <input type="text" name="default_currency_type"> <br>'+
					'ride_feed_version <input type="text" name="ride_feed_version"> <br>'+
					'</div>');
		}
	else if(i==2)
	{
		$('#editData').html('<br><div class="editPanel">'+
				'<br><strong>trip_id</stong> <input type="text" name="trip_id"><br>'+
				'<strong>stop_id</strong> <input type="text" name="stop_id"><br>'+
				'<strong>stop_sequence</strong> <input type="text" name="stop_sequence"> <br>'+
				'<strong>record_use</strong> <input type="text" name="record_use"> <br>'+
				'schedule_relationship <input type="text" name="schedule_relationship"> <br>'+
				'boardings <input type="text" name="boardings"> <br>'+
				'alightings <input type="text" name="alightings"> <br>'+
				'current_load <input type="text" name="current_load"> <br>'+
				'load_type <input type="text" name="load_type"> <br>'+
				'rack_down <input type="text" name="rack_down"> <br>'+
				'bike_boardings <input type="text" name="bike_boardings"> <br>'+
				'bike_alightings <input type="text" name="bike_alightings"> <br>'+
				'ramp_used <input type="text" name="ramp_used"> <br>'+
				'ramp_boardings <input type="text" name="ramp_boardings"> <br>'+
				'ramp_alightings <input type="text" name="ramp_alightings"> <br>'+
				'service_date <input type="text" name="service_date"> <br>'+
				'service_arrival_time <input type="text" name="service_arrival_time"> <br>'+
				'service_departure_time <input type="text" name="service_departure_time"> <br>'+
				'source <input type="text" name="source"> <br>'+
		'</div>');
	}
	else if(i==3)
	{
		$('#editData').html('<br><div class="editPanel">'+
				'<br><strong>rider_id</stong> <input type="text" name="rider_id"><br>'+
				'agency_id <input type="text" name="agency_id"><br>'+
				'trip_id <input type="text" name="trip_id"> <br>'+
				'boarding_stop_id <input type="text" name="boarding_stop_id"> <br>'+
				'boarding_stop_sequence <input type="text" name="boarding_stop_sequence"> <br>'+
				'alighting_stop_id <input type="text" name="alighting_stop_id"> <br>'+
				'alighting_stop_sequence <input type="text" name="alighting_stop_sequence"> <br>'+
				'service_date <input type="text" name="service_date"> <br>'+
				'boarding_time <input type="text" name="boarding_time"> <br>'+
				'alighting_time <input type="text" name="alighting_time"> <br>'+
				'rider_type <input type="text" name="rider_type"> <br>'+
				'rider_type_description <input type="text" name="rider_type_description"> <br>'+
				'fare_paid <input type="text" name="fare_paid"> <br>'+
				'transaction_type <input type="text" name="transaction_type"> <br>'+
				'fare_media <input type="text" name="fare_media"> <br>'+
				'accompanying_device <input type="text" name="accompanying_device"> <br>'+
				'transfer_status <input type="text" name="transfer_status"> <br>'+
		'</div>');
	}
	else if(i==4)
	{
		$('#editData').html('<br><div class="editPanel">'+
				'<br><strong>total_boardings</stong> <input type="text" name="total_boardings"><br>'+
				'<strong>total_alightings</strong> <input type="text" name="total_alightings"><br>'+
				'<strong>ridership_start_date</strong> <input type="text" name="ridership_start_date"> <br>'+
				'<strong>ridership_end_date</strong> <input type="text" name="ridership_end_date"> <br>'+
				'ridership_start_time <input type="text" name="ridership_start_time"> <br>'+
				'ridership_end_time <input type="text" name="ridership_end_time"> <br>'+
				'service_id <input type="text" name="service_id"> <br>'+
				'monday <input type="text" name="monday"> <br>'+
				'tuesday <input type="text" name="tuesday"> <br>'+
				'wednesday <input type="text" name="wednesday"> <br>'+
				'thursday <input type="text" name="thursday"> <br>'+
				'friday <input type="text" name="friday"> <br>'+
				'saturday <input type="text" name="saturday"> <br>'+
				'sunday <input type="text" name="sunday"> <br>'+
				'agency_id <input type="text" name="agency_id"> <br>'+
				'route_id <input type="text" name="route_id"> <br>'+
				'direction_id <input type="text" name="direction_id"> <br>'+
				'trip_id <input type="text" name="trip_id"> <br>'+
				'stop_id <input type="text" name="stop_id"> <br>'+
		'</div>');
	}
	else if(i==5)
	{
		$('#editData').html('<br><div class="editPanel">'+
				'<br>agency_id<input type="text" name="agency_id"><br>'+
				'<trip_id <input type="text" name="trip_id"><br>'+
				'service_date <input type="text" name="service_date"> <br>'+
				'vehicle_description <input type="text" name="vehicle_description"> <br>'+
				'seated_capacity <input type="text" name="seated_capacity"> <br>'+
				'standing_capacity <input type="text" name="standing_capacity"> <br>'+
				'wheelchair_capacity <input type="text" name="wheelchair_capacity"> <br>'+
				'bike_capacity <input type="text" name="bike_capacity"> <br>'+
		'</div>');
	}
	
	$('#editData').append('<input type=button value="Create" onclick=#0>');
	$('#editData').append('<input type="submit" value="close" onclick="clearEdit()">');
	var selectedContent = $('li[data-content="Data Entry"]');
	var slectedContentHeight = selectedContent.innerHeight();
	$('.cd-tabs-content').animate({
		'height': slectedContentHeight
	}, 200);
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
 $(document).ready(function() {
    $('select').material_select();
    $('.dropdown-content li > a, .dropdown-content li > span').css({'color': 'black', 'line-height': '12px', 'padding': '5px 0', 'padding-left': '10px'});
 	$('.dropdown-content li').css({'min-height': '35px'});
 	$('.input-field.col .dropdown-content [type="checkbox"] + label').css({'top': '-11px'});
 });

$('.datepicker').pickadate({
	selectMonths: true, // Creates a dropdown to control month
	selectYears: 15, // Creates a dropdown of 15 years to control year,
	today: 'Today',
	clear: 'Clear',
	close: 'Ok',
	closeOnSelect: false // Close upon selecting a date,
});


 $(document).ready(function() {

 	//Getting the values from the user
 	function eventful() {

 		//Value from user for artist
 		var artistname = $("#artist-name").val().trim();

 		//Value from user for zipcode
 		var zipcode = $("#zip-code").val();
		
		//Value from user for distance radius
		var distanceradius = $("#distance-form").val() 		

 	 
		var url = "http://api.eventful.com/json/events/search?";
		var apikey = "app_key=dXWwC4cHg4gX4NfZ&";
		var search = "keywords=" + artistname;
		var position = "&location=" + zipcode;
		var distance = "&within=" + distanceradius;
	 	var queryURL = url + apikey + search + position + distance + queryURL;

	 		//The AJAX function for pulling data from the API
			$.ajax({
				
			    url: queryURL,

			    dataType: 'jsonp',

			    crossDomain: true,

			    success: function(json) {

			        console.log(json);

			        var bandname = json.events.event[0].performers.performer.name;

			        $(".card-title").html(bandname);

			        var bandimage = json.events.event[0].image.medium.url;

			        $(".card-image").html("<img src=" + bandimage + "/img>");
			    }
			});
	};

	//When the submit button is clicked, it calls the eventful function
    $(document).on("click", "#submit", eventful);

 });
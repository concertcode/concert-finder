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
 		var zipcode = parseInt($("#zip-code").val())
		
		//Value from user for distance radius
		var distanceradius = parseInt($("#distance-form").val()); 		

 	 
	// var url = "http://api.eventful.com/json/performers/search?";
	// var apikey = "app_key=dXWwC4cHg4gX4NfZ&";
	// var search = "keywords=" + artistname;
	// var position = "&where=32.746682,-117.162741"
	// // var distance = "&within=" + distanceradius;
 // 	var queryURL = url + apikey + search + position + queryURL;
 		var queryURL = 'https://api.eventful.com/json/performers/search?app_key=dXWwC4cHg4gX4NfZ&keywords=korn&where=32.746682,-117.162741&within=100'

 		
      //The AJAX function for pulling data from the API
      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response){
      	console.log(response)
      });

	};

	//When the submit button is clicked, it calls the eventful function
    $(document).on("click", "#submit", eventful);

 });
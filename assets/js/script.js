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
 	$("#submit").on("click", function(){

 		event.preventDefault();

 		//Value from user for artist
 		var artistname = $("#artist-name").val().trim();

 		//Value from user for zipcode
 		var zipcode = parseInt($("#zip-code").val())
		
		//Value from user for distance radius
		var distanceradius = $("#distance-form").val(); 		
		

 	});


 	});
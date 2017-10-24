$(document).ready(function() {

    $('select').material_select();
    $('.dropdown-content li > a, .dropdown-content li > span').css({'color': 'black', 'line-height': '12px', 'padding': '5px 0', 'padding-left': '10px'});
 	$('.dropdown-content li').css({'min-height': '35px'});
 	$('.input-field.col .dropdown-content [type="checkbox"] + label').css({'top': '-11px'});

	$('.datepicker').pickadate({
		selectMonths: true, // Creates a dropdown to control month
		selectYears: 15, // Creates a dropdown of 15 years to control year,
		today: 'Today',
		clear: 'Clear',
		close: 'Ok',
		closeOnSelect: false // Close upon selecting a date,
	});

	// Last.FM API
 	$("#submit").on("click", function(){
 		var similarBands
 		var artistName = $("#artist-name").val().trim();
 		console.log(artistName);

 		var queryURL = "http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=" + artistName + "&api_key=afc4afb74959db18d42a677803c3ac59&format=json"

	    $.ajax({
	        url: queryURL,
	        method: 'GET'
	    }).done(function(response) {
	    	for (var i=0; i < response.similarartists.artist.length; i++) {
	    		console.log(response.similarartists.artist[i].name);
	    		console.log(response.similarartists.artist[i].image[5]['#text']);
	    	};
	    });
 	});
});
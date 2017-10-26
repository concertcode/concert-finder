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

    $("body").bind('keypress', function(e) {
        if(e.keyCode==13){
             $('#submit').trigger('click');
             $("input").blur();
        };
    });

	// Last.FM API
 	$("#submit").on("click", function(){
 		var similarBands
 		var artistName = $("#artist-name").val().trim();
	    var zipCode = $("#zip-code").val().trim();
	    var distanceRadius = $("#distance-form").val().trim();

	    var eventfulUrl = "https://api.eventful.com/json/events/search";
		var apiKey = "?app_key=dXWwC4cHg4gX4NfZ";
		var search = "&keywords=" + artistName;
		var position = "&location=" + zipCode;
		var distance = "&within=" + distanceRadius;
	 	var eventfulQuery = eventfulUrl + apiKey + search + position + distance;

 		var similarArtistQuery = "https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=" + artistName + "&api_key=afc4afb74959db18d42a677803c3ac59&format=json"
 		var searchArtistQuery = "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + artistName + "&api_key=afc4afb74959db18d42a677803c3ac59&format=json"

 		// Get name and image of main band
	    $.ajax({
	        url: searchArtistQuery,
	        method: 'GET'
	    }).done(function(response) {
	    	var bandName = response.artist.name
<<<<<<< HEAD
		    $(".card-title").html(bandName);
		    
=======
		    $("#display-band").html(bandName);

>>>>>>> master
		    var bandImage = response.artist.image[5]['#text']
		    $(".card-image").html("<img src=" + bandImage + "/img>");
	    });

 		// Get name and image of similar bands
	    $.ajax({
	        url: similarArtistQuery,
	        method: 'GET'
	    }).done(function(response) {
	    	for (var i=0; i < response.similarartists.artist.length; i++) {
	    		// console.log(response.similarartists.artist[i].name);
	    		// console.log(response.similarartists.artist[i].image[5]['#text']);
	    	};
	    });
	    $("label").attr("class", "white-text")
	    $("input:text").val("")
	    $(".select-dropdown").val("Distance")

	    // Eventful API
		$.ajax({	
		    url: eventfulQuery,
		    method: 'GET',
		    dataType: 'jsonp',
		    crossDomain: true,
	    }).done(function(response) {
	    	console.log(response)

		});
 	});

<<<<<<< HEAD
 	//Getting the values from the user
 	function eventful() {

 		//Value from user for artist
 		var artistname = $("#artist-name").val().trim();

 		//Value from user for zipcode
 		var zipcode = $("#zip-code").val();
 		console.log(zipcode)
		
		//Value from user for distance radius
		var distanceradius = $("#distance-form").val() 		

 	 
		var url = "http://api.eventful.com/json/events/search?";
		var apikey = "app_key=dXWwC4cHg4gX4NfZ&";
		var search = "keywords=" + artistname;
		var position = "&postal_code=" + zipcode;
		console.log(position);
		// var distance = "&within=" + distanceradius;
	 	var queryURL = url + apikey + search + position + queryURL;

 		//The AJAX function for pulling data from the API
		$.ajax({	
		    url: queryURL,
		    dataType: 'jsonp',
		    crossDomain: true,

		    success: function(json) {
		        // console.log(json);
		        // var bandname = json.events.event[0].performers.performer[0].name;
		        // $(".card-title").html(bandname);
		        // var bandimage = json.events.event[0].image.medium.url;
		        // $(".card-image").html("<img src=" + bandimage + "/img>");
		    }
		});
	};


	//When the submit button is clicked, it calls the eventful function
    $(document).on("click", "#submit", eventful);

=======
	$('.datepicker').pickadate({
		selectMonths: true, // Creates a dropdown to control month
		selectYears: 15, // Creates a dropdown of 15 years to control year,
		today: 'Today',
		clear: 'Clear',
		close: 'Ok',
		closeOnSelect: false // Close upon selecting a date,
	});
>>>>>>> master
 });


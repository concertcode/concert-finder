$(document).ready(function() {
    // Dropdown menu
    $('select').material_select();
    $('.dropdown-content li > a, .dropdown-content li > span').css({'color': 'black', 'line-height': '12px', 'padding': '5px 0', 'padding-left': '10px'});
    $('.dropdown-content li').css({'min-height': '35px'});
    $('.input-field.col .dropdown-content [type="checkbox"] + label').css({'top': '-11px'});

    // Sumbit with enter key
    $(document).bind('keypress', function(e) {
        if(e.keyCode==13){
             $('#submit').trigger('click');
             $("input").blur();
        }
    });

    // Submission code block
    $("#submit").on("click", function(){
        // The table is made visable and cleared
        $("#concert-table").show();
        $("#concert-results").html("");

        // Form values retrieved
        try {var artistName = $("#artist-name").val().trim();} catch(err) {}
        try {var zipCode = $("#zip-code").val().trim();} catch(err) {}
        try {var distanceRadius = $("#distance-form").val().trim();} catch(err) {}

        // last.fm url queries
        var lastFmUrl = "https://ws.audioscrobbler.com/2.0/?";
        var lastFmApiKey = "&api_key=afc4afb74959db18d42a677803c3ac59";
        var lastFmJson = "&format=json";
        var similarBandsLimit = "&limit=" + "50";
        var searchArtistQuery = lastFmUrl + "method=artist.getinfo&artist=" + artistName + lastFmApiKey + lastFmJson;
        var similarArtistQuery = lastFmUrl + "method=artist.getsimilar&artist=" + artistName + lastFmApiKey + similarBandsLimit + lastFmJson;

        // Get name and image of main band from last.fm
        $.ajax({
            url: searchArtistQuery,
            method: 'GET'
        }).done(function(response) {
            var bandName = response.artist.name;
            $("#display-band").html(bandName);

            var bandImage = response.artist.image[5]['#text'];
            $(".card-image").html("<img src=" + bandImage + "/img>");
        });

        // Form appearance reset after submission
        $("label").attr("class", "white-text");
        $("input:text").val("");
        $(".select-dropdown").val("Distance");

        // Eventful API function
        var eventfulApi = function(band) { 
            // Eventful url query
            var eventfulUrl = "https://api.eventful.com/json/events/search";
            var apiKey = "?app_key=dXWwC4cHg4gX4NfZ";
            var search = "&keywords=" + band;
            var position = "&location=" + zipCode;
            var distance = "&within=" + distanceRadius;
            var eventfulQuery = eventfulUrl + apiKey + search + position + distance;

            // Eventful ajax
            $.ajax({
                url: eventfulQuery,
                method: 'GET',
                dataType: 'jsonp',
                crossDomain: true
            }).done(function(response) {
                try {
                    // Loop through each event if there are any
                    for (var i=0; i < response.events.event.length; i++) {
                        // Get event data

                        // Event Title
                        try {
                            var title = response.events.event[i].title;
                        } catch(err) {
                            var title = "title missing";
                        }

                        // City Name
                        try {
                            var city = response.events.event[i].city_name;
                        } catch(err) {
                            var city = "city missing";
                        }

                        // Venue Name
                        try {
                            var venue = response.events.event[i].venue_name;
                        } catch(err) {
                            var venue = "venue missing";
                        }

                        // Event Date
                        try {
                            var date = response.events.event[i].start_time.substring(0, 10);
                        } catch(err) {
                            var date = "date missing";
                        }

                        // Event Latitude
                        try {
                            var latitude = response.events.event[i].latitude;
                        } catch(err) {
                            var latitude = "latitude missing";
                        }

                        // Event Longitude
                        try {
                            var longitude = response.events.event[i].longitude;
                        } catch(err) {
                            var longitude = "longitude missing";
                        }

                        // Display event data in table
                        var rowCount = $('table tr').length;
                        if (rowCount < 15) {
                            $("#concert-results").append("<tr>" +
                                                     "<td>" + title + "</td>" +
                                                     "<td>" + city + "</td>" +
                                                     "<td>" + venue + "</td>" +
                                                     "<td>" + date + "</td>" +
                                                     "<td><input class='map-button' type='button' name='map-button' value='Map' " +
                                                     "latitude='" + latitude + "' longitude='" + longitude + "'></td>" +
                                                     "</tr>");
                        }
                        // Update results counter
                        $("#result-counter").html("Results: " + rowCount);
                    }
                } catch(err) {
                }

                // Tell the user if there are no events
                var rowCount = $('table tr').length;
                if (rowCount === 1) {
                    $("#result-counter").html("");
                    $("#concert-results").html("<td id='empty-table'>No results! Try again.</td>")
                } else if (rowCount > 1) {
                    $("#empty-table").remove();
                }
            }); // Eventful ajax
        } // Eventful function

        // Get names of similar bands from last.fm
        $.ajax({
            url: similarArtistQuery,
            method: "GET"
        }).done(function(response) {
            // Start an array with the main band
            var similarBandsList = [artistName];

            // Add similar bands to the array
            for (var i=1; i < response.similarartists.artist.length; i++) {
                similarBandsList.push(response.similarartists.artist[i].name);
            }

            // Loop through the Eventful API for every band
            for (var i=0; i<similarBandsList.length; i++) {
                eventfulApi(similarBandsList[i]);
            }
        });
    }); // Click submit button
});
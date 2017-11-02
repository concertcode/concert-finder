//Peter Peck's code for team project

var map, infoWindow;

//At first start, this function is called in the HTML googlemap link and loads this inital map
function startMap(){

    //Grabs the ID 'map' and inputs the Google map of the US
    var startmap = new google.maps.Map(document.getElementById('map'),{

        zoom: 4,

        center: {lat: 37.0902, lng: -95.7129}

    });

}

function initMap(latitudeConcert, longConcert, pos, venueName){

    var directionsDisplay = new google.maps.DirectionsRenderer;

    var directionsService = new google.maps.DirectionsService;
    
    //Grabs the ID 'map' and inputs the Google map
    var map = new google.maps.Map(document.getElementById('map'));

    directionsDisplay.setMap(map);

    //We then call this function to calculate and display the route with the parameters
    calculateAndDisplayRoute(directionsService, directionsDisplay, latitudeConcert, longConcert, pos, map, venueName);

        //If the modes of travel is being changed, we call the calculateAndDisplayRoute function to recalculate
        $(".card #mode").change(function(){

           calculateAndDisplayRoute(directionsService, directionsDisplay, latitudeConcert, longConcert, pos, map);

        });
};

function calculateAndDisplayRoute(directionsService, directionsDisplay,latitudeConcert, longConcert, pos, map, venueName){

	//We grab the current value of travel mode
	var selectedMode = document.getElementById('mode').value;

    var trip = {
         //Position of the user
        origin: {lat: pos.lat, lng: pos.lng}, 

        //Destination of the concert venue
        destination: {lat: Number(latitudeConcert), lng: Number(longConcert)},  

        travelMode: google.maps.TravelMode[selectedMode]
    }

    directionsService.route(trip, function(response, status){

        if (status == 'OK') {

            directionsDisplay.setDirections(response);

            var infowindow2 = new google.maps.InfoWindow();

            var ETA1 = response.routes[0].legs[0].distance.text;

            var ETA2 = response.routes[0].legs[0].duration.text;

            //Prints content onto the HTML
            $("#ETA").html("<strong>ETA:" + "</strong><br>" + "Travel Mode: " + trip.travelMode + "<br>" + "Distance: " + ETA1 + "<br>" + "Duration: " + ETA2 + "<br>" 
            + "<a href='https://www.google.com/maps/search/?api=1&query=" + venueName
            + "' target='_blank'>" + response.routes[0].copyrights  + "</a>");
        } 
    });
};


//When the user clicks the button, "map", the following is excuted
$(document).on("click", ".map-button", function(){

    //Grabbing the current lat of this current button for the dest
    var latitudeConcert = $(this).attr("latitude");

    //Grabbing the current lng of this current button for the dest
    var longConcert = $(this).attr("longitude");

    //Grabbing the current venue name for this current button
    var venueName = $(this).attr("venue");

    infoWindow = new google.maps.InfoWindow;

    //If the user allows their current location, we excute the following code
    if (navigator.geolocation){

        //This is a Google map api call function
        navigator.geolocation.getCurrentPosition(function(position){

            //Putting the user's lat and lng into an object
            var pos = {

                lat: position.coords.latitude,

                lng: position.coords.longitude,

            };

            //The different travel modes panel shows on the Google map
            $("#floating-panel").show();

            //Then we call the function, 'initMap' with these parameters 
            initMap(latitudeConcert, longConcert, pos, venueName);

        }, function(){

            handleLocationError(true, infoWindow, map.getCenter());

        });

        if (navigator.userAgent.match(/Chrome|AppleWebKit/)){ 

            window.location.href = "#map";

            window.location.href = "#map";  /* these take twice */

        } else {

            window.location.hash = "map";

        };

     //If the user blocks their current location, this Google alert box shows up
    } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
});


//When user clicks submit a second time for a second result, it resets the map by calling the start map function.
$("#submit").on("click", function(){

    //Hides travel mode panel on the map
    $("#floating-panel").hide();

    //Executes function onClick
    startMap();

}) 
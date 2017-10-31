var map, infoWindow;

//At first start, this function is called in the HTML googlemap link and loads this inital map
function startMap() {

    //Grabs the ID 'map' and inputs the Google map of the US
    var startmap = new google.maps.Map(document.getElementById('map'), {

        zoom: 4,

        center: {lat: 37.0902, lng: -95.7129}

    });

}

function initMap(latitudeconcert, longconcert, pos) {

    var directionsDisplay = new google.maps.DirectionsRenderer;

    var directionsService = new google.maps.DirectionsService;
    
    //Grabs the ID 'map' and inputs the Google map
    var map = new google.maps.Map(document.getElementById('map'));

    directionsDisplay.setMap(map);

    //We then call this function to calculate and display the route with the parameters
    calculateAndDisplayRoute(directionsService, directionsDisplay, latitudeconcert, longconcert, pos);

        //If the modes of travel is being changed, we call the calculateAndDisplayRoute function to recalculate
        $(".card #mode").change(function() {

           calculateAndDisplayRoute(directionsService, directionsDisplay, latitudeconcert, longconcert, pos);

        });
};

function calculateAndDisplayRoute(directionsService, directionsDisplay,latitudeconcert, longconcert, pos) {

	//We grab the current value of travel mode
	var selectedMode = document.getElementById('mode').value;

    //This is Google map api call
    directionsService.route({

        //Position of the user
        origin: {lat: pos.lat, lng: pos.lng}, 

        //Destination of the concert venue
        destination: {lat: Number(latitudeconcert), lng: Number(longconcert)},  

        travelMode: google.maps.TravelMode[selectedMode]

        //A predefined Google map api function
    }, function(response, status) {

        if (status == 'OK') {

            directionsDisplay.setDirections(response);

        } 

    });
};


//When the user clicks the button, "map", the following is excuted
$(document).on("click", ".map-button", function(){

    //Grabbing the current lat of this current button for the dest
    var latitudeconcert = $(this).attr("latitude");

    //Grabbing the current lng of this current button for the dest
    var longconcert = $(this).attr("longitude");

    infoWindow = new google.maps.InfoWindow;

    //If the user allows their current location, we excute the following code
    if (navigator.geolocation){

        //This is a Google map api call function
        navigator.geolocation.getCurrentPosition(function(position) {

            //Putting the user's lat and lng into an object
            var pos = {

                lat: position.coords.latitude,

                lng: position.coords.longitude,

            };

            //The different travel modes panel shows on the Google map
            $("#floating-panel").show();

            //Then we call the function, 'initMap' with these parameters 
            initMap(latitudeconcert, longconcert, pos);

        }, function() {

            handleLocationError(true, infoWindow, map.getCenter());

        });
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

    startMap();

}) 
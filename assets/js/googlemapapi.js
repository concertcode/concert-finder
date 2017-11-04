//Peter Peck's code for team project

var map, infoWindow, infowindow2;

//At first start, this function is called in the HTML googlemap link and loads this initial map
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
    calculateAndDisplayRoute(directionsService, directionsDisplay, latitudeConcert, longConcert, pos, venueName);

        //If the modes of travel is being changed, we call the calculateAndDisplayRoute function to recalculate
        $(".card #mode").change(function(){

           calculateAndDisplayRoute(directionsService, directionsDisplay, latitudeConcert, longConcert, pos, venueName);

        });
};

function calculateAndDisplayRoute(directionsService, directionsDisplay,latitudeConcert, longConcert, pos, venueName){

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

            //Prints content onto the HTML
            $("#ETA").html("<div>" + "<span id='venueName'> " + venueName + "</a></span>" 
            	+ "<br><strong>ETA:" + "</strong><br>" + "Distance: " 
                + response.routes[0].legs[0].distance.text + "<br>" 
                + "Duration: " + response.routes[0].legs[0].duration.text + "<br>" 
                + "<a href='https://www.google.com/maps/dir/?api=1&origin=" + pos.lat + "," + pos.lng + "&destination=" + venueName
                + "' target='_blank'>" + " Open in Google Maps" + "</a></div>");
        } 
    });
};



//When user blocks their location, put's a marker on the location instead
function blockedLocation(latitudeConcert, longConcert, venueName){

    var image = 'https://cdn3.iconfinder.com/data/icons/map-markers-1/512/music-32.png';

    var DestLatLng = {lat: Number(latitudeConcert), lng: Number(longConcert)};

    map = new google.maps.Map(document.getElementById('map'),{

        center: DestLatLng,

        zoom: 13

    });

    var contentString = "<div id='iw-container'> " + "<div class='iw-title'>" + venueName + "</div>" + "<br><br>" 
    + "<a href='https://www.google.com/maps/dir/?api=1&destination=" + venueName 
    + "' target='_blank'>" + " Open in Google Maps" + "</a></div>";

    var infowindow2 = new google.maps.InfoWindow({

      content: contentString

    });

    //Place a marker on the venue
    var marker = new google.maps.Marker({

        position: DestLatLng,

        map: map,

        icon: image,

        title: venueName

    });

    //If marker is clicked, opens infowindow
    marker.addListener('click', function() {

      infowindow2.open(map, marker);

      map.setCenter(marker.position);

    });
}


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
    if (navigator.geolocation && navigator.userAgent.match(/Chrome|AppleWebKit/)){

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

            //If user blocks their location, runs this function
            blockedLocation(latitudeConcert, longConcert, venueName);

          });

        //Looks in the HTML page for this href with this id and the page jumps to it
        window.location.href = "#map";

    } 

    else {

    	//Look for the hashtag map 
        window.location.hash = "map"

        //If user blocks their location, runs this function
        //With the pre-defined way Google calls their functions, we have to call this function a second time
        blockedLocation(latitudeConcert, longConcert, venueName);
    }

});


//When user clicks submit a second time for a second result, it resets the map by calling the start map function
$("#submit").on("click", function(){

    //Hides travel mode panel on the map
    $("#floating-panel").hide();

    //Grabs the values from the inputs
    var artistName = $("#artist-name").val();

    var zipCode = $("#zip-code").val();

    var distanceRadius = $("#distance-data").val();

    //If the form is formed out, then refresh the page
    if(artistName && zipCode && distanceRadius){

	    //Executes function 
	    startMap();

	}
});
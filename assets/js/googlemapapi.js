var map, infoWindow;

function startMap() {

    var startmap = new google.maps.Map(document.getElementById('map'), {

        zoom: 4,

        center: {lat: 37.0902, lng: -95.7129}

    });

}

function initMap(latitudeconcert, longconcert, pos) {

    var directionsDisplay = new google.maps.DirectionsRenderer;

    var directionsService = new google.maps.DirectionsService;

    var map = new google.maps.Map(document.getElementById('map'), {

        zoom: 14,

        center: {lat: 37.77, lng: -122.447}

    });

    directionsDisplay.setMap(map);

    calculateAndDisplayRoute(directionsService, directionsDisplay, latitudeconcert, longconcert, pos);

        $(".card #mode").change(function() {

           calculateAndDisplayRoute(directionsService, directionsDisplay, latitudeconcert, longconcert, pos);

        });
};

function calculateAndDisplayRoute(directionsService, directionsDisplay,latitudeconcert, longconcert, pos) {

    var selectedMode = document.getElementById('mode').value;

    directionsService.route({

    origin: {lat: pos.lat, lng: pos.lng}, 

    destination: {lat: Number(latitudeconcert), lng: Number(longconcert)},  

    travelMode: google.maps.TravelMode[selectedMode]

    }, function(response, status) {

    if (status == 'OK') {

        directionsDisplay.setDirections(response);

    } 
    
    // else {

    //     window.alert('Directions request failed due to ' + status);

    // }

    });
};



$(document).on("click", ".map-button", function(){

    var latitudeconcert = $(this).attr("latitude");

    var longconcert = $(this).attr("longitude");

    infoWindow = new google.maps.InfoWindow;

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function(position) {

            var pos = {

                lat: position.coords.latitude,

                lng: position.coords.longitude,

            };

            $("#floating-panel").show();

            initMap(latitudeconcert, longconcert, pos);

        }, function() {

            handleLocationError(true, infoWindow, map.getCenter());

        });
        
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
});





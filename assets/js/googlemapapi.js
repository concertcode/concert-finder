var map, infoWindow;

function initMap(latitudeconcert, longconcert) {

    var directionsDisplay = new google.maps.DirectionsRenderer;

    var directionsService = new google.maps.DirectionsService;

    var map = new google.maps.Map(document.getElementById('map'), {

        zoom: 14,

        center: {lat: 37.77, lng: -122.447}

    });

    infoWindow = new google.maps.InfoWindow;

// Try HTML5 geolocation.
/*if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition(function(position) {
var pos = {
lat: position.coords.latitude,
lng: position.coords.longitude,
zoom: 15
};

infoWindow.setPosition(pos);
infoWindow.setContent('Location found.');
infoWindow.open(map);
// map.setCenter(pos);
}, function() {
handleLocationError(true, infoWindow, map.getCenter());
});
} else {
// Browser doesn't support Geolocation
handleLocationError(false, infoWindow, map.getCenter());
}*/

    directionsDisplay.setMap(map);

    calculateAndDisplayRoute(directionsService, directionsDisplay, latitudeconcert, longconcert);

// document.getElementById('mode').addEventListener('change', function() {

// });
}

function calculateAndDisplayRoute(directionsService, directionsDisplay,latitudeconcert, longconcert) {

    console.log(typeof latitudeconcert);

    console.log(typeof longconcert);

    var selectedMode = document.getElementById('mode').value;

    directionsService.route({

    origin: {lat: 41.9994210, lng: -87.6658960},  // Haight.

    destination: {lat: latitudeconcert, lng: longconcert},  // Ocean Beach.

    // Note that Javascript allows us to access the constant
    // using square brackets and a string value as its
    // "property."

    travelMode: google.maps.TravelMode[selectedMode]

    }, function(response, status) {

    if (status == 'OK') {

        directionsDisplay.setDirections(response);

    } else {

        window.alert('Directions request failed due to ' + status);

    }

    });
}


// function initMap() {
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: 37.0902, lng: -95.7129},

//     zoom: 15
//   });
//   infoWindow = new google.maps.InfoWindow;

//   // Try HTML5 geolocation.
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function(position) {
//       var pos = {
//         lat: position.coords.latitude,
//         lng: position.coords.longitude,
//         zoom: 15
//       };

//       infoWindow.setPosition(pos);
//       infoWindow.setContent('Location found.');
//       infoWindow.open(map);
//       map.setCenter(pos);
//     }, function() {
//       handleLocationError(true, infoWindow, map.getCenter());
//     });
//   } else {
//     // Browser doesn't support Geolocation
//     handleLocationError(false, infoWindow, map.getCenter());
//   }
// }

// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//   infoWindow.setPosition(pos);
//   infoWindow.setContent(browserHasGeolocation ?
//                         'Error: The Geolocation service failed.' :
//                         'Error: Your browser doesn\'t support geolocation.');
//   infoWindow.open(map);
// }





$(document).on("click", ".map-button", function(){

    var latitudeconcert = $(this).attr("latitude");

    var longconcert = $(this).attr("longitude");

    $("#floating-panel").show();

    initMap(latitudeconcert, longconcert);

})





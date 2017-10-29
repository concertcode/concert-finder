// function initMap() {
//         var map = new google.maps.Map(document.getElementById('map'), {
//           center: {lat: 41.8781, lng: -87.6298},
//           zoom: 12
//         });

//         var input = document.getElementById('pac-input');

//         var autocomplete = new google.maps.places.Autocomplete(input);
//         autocomplete.bindTo('bounds', map);

//         map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

//         var infowindow = new google.maps.InfoWindow();
//         var infowindowContent = document.getElementById('infowindow-content');
//         infowindow.setContent(infowindowContent);
//         var marker = new google.maps.Marker({
//           map: map
//         });
//         marker.addListener('click', function() {
//           infowindow.open(map, marker);
//         });

//         autocomplete.addListener('place_changed', function() {
//           infowindow.close();
//           var place = autocomplete.getPlace();
//           if (!place.geometry) {
//             return;
//           }

//           if (place.geometry.viewport) {
//             map.fitBounds(place.geometry.viewport);
//           } else {
//             map.setCenter(place.geometry.location);
//             map.setZoom(17);
//           }

//           // Set the position of the marker using the place ID and location.
//           marker.setPlace({
//             placeId: place.place_id,
//             location: place.geometry.location
//           });
//           marker.setVisible(true);

//           infowindowContent.children['place-name'].textContent = place.name;
//           infowindowContent.children['place-address'].textContent =
//               place.formatted_address;
//           infowindow.open(map, marker);
//         });
//       }


    function initMap() {
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var directionsService = new google.maps.DirectionsService;
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 14,
          center: {lat: 37.77, lng: -122.447}
        });
        directionsDisplay.setMap(map);

        calculateAndDisplayRoute(directionsService, directionsDisplay);
        document.getElementById('mode').addEventListener('change', function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay);
        });
      }

      function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        var selectedMode = document.getElementById('mode').value;
        directionsService.route({
          origin: {lat: 37.77, lng: -122.447},  // Haight.
          destination: {lat: 37.768, lng: -122.511},  // Ocean Beach.
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
      

      $(document).on("click", )

      



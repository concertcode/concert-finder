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




      var map, infoWindow;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 37.0902, lng: -95.7129},

          zoom: 3
        });
        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            var marker = new google.maps.Marker({
              position: pos,
              map: map,
              title: 'Your Location'
             });

            var infowindow = new google.maps.InfoWindow();
            var infowindowContent = document.getElementById('infowindow-content');
            infowindow.setContent(infowindowContent);

                map.setZoom(10);
                map.setCenter(marker.getPosition());
                infowindow.open(map, marker);
                infowindowContent.children['place-name'].textContent = "Your Location";
                infowindow.open(map, marker);

            infoWindow.setPosition(pos);
            infoWindow.setContent(marker);
            
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }

      
$(document).ready(function(){

  $.getJSON("https://api.jcdecaux.com/vls/v1/stations?apiKey=xxxxxxxxxxxxxxxxxxxxxxxx&contract=lyon", function(daCaux) {

      let markers = [];
      for (let i=0; i<daCaux.length; i++) {

        let markerIcon = function() {
          let dispo = JSON.parse(daCaux[i].available_bikes);
          let iconOpen = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|a1d488",
                         new google.maps.Size(21, 34),
                         new google.maps.Point(0,0),
                         new google.maps.Point(10, 34));

          let iconClosed = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|f46868",
                           new google.maps.Size(21, 34),
                           new google.maps.Point(0,0),
                           new google.maps.Point(10, 34));

          if (dispo > 0)
                  {
                  return iconOpen;
              } else {
                  return iconClosed;
                  };
            };

        let latLng = new google.maps.LatLng(daCaux[i].position.lat , daCaux[i].position.lng);
        let marker = new google.maps.Marker({
        position: latLng,
        map: map,
        animation: google.maps.Animation.DROP,
        icon:markerIcon(),
        });

        markers.push(marker);

      }

      let markerCluster = new MarkerClusterer(map, markers, {imagePath: "images/m"});
  });
});

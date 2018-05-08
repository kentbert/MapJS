let map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: new google.maps.LatLng(45.75,4.85),
    mapTypeId: 'terrain',
    disableDefaultUI: true,
  });
}

$(document).ready(function() {
  $.when(
    $.getScript( "sliderino.js" ),
    $.getScript( "markers.js" ),
    $.getScript( "stations.js" ),
    $.getScript( "signature.js" ),
    $.Deferred(function( deferred ){
        $( deferred.resolve );
    })
  ).done(function(data) {

    ElSliderino();
    signature();

    $.getJSON("https://api.jcdecaux.com/vls/v1/stations?apiKey=bd36deba0672e9f5273b4c8b7bffe3436d2cbb92&contract=lyon", function(dataVelov) {

      let markers = [];

      for (let i=0; i<dataVelov.length; i++) {

      let address = dataVelov[i].address;
          status = dataVelov[i].status;
          dispo = dataVelov[i].available_bikes;
          lat = dataVelov[i].position.lat;
          lng = dataVelov[i].position.lng;

      let marker = MarkerStation(address, status, dispo, lat, lng, map);
      let infos = InfosStation(marker, address, status, dispo, map);
      let disporesa = DispoResa(dispo);

      markers.push(marker);

      };

      let markerCluster = new MarkerClusterer(map, markers, {imagePath: "images/m"});

    });
  });
});

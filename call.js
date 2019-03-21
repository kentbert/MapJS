// Google Maps
let map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: new google.maps.LatLng(45.75,4.85),
    mapTypeId: 'terrain',
    disableDefaultUI: true,
  });
}

// Appel des différents fichiers JS de l'app
$(document).ready(function() {
  $.when(
    $.getScript( "sliderino.js" ),
    $.getScript( "markers.js" ),
    $.getScript( "signature.js" ),
    $.getScript( "stations.js" ),
  ).done(function(data) {

    leSlider();
    Signature();

// JSON JCDecaux
    $.getJSON("https://api.jcdecaux.com/vls/v1/stations?apiKey=tmoccchhh&contract=lyon", function(dataVelov) {

// Création des markers
      let markers = [];

// Pour chaque objet du tableau, creer un nouveau set de données
      for (let i=0; i<dataVelov.length; i++) {

      let address = dataVelov[i].address;
          status = dataVelov[i].status;
          dispo = dataVelov[i].available_bikes;
          lat = dataVelov[i].position.lat;
          lng = dataVelov[i].position.lng;
          marker = MarkerStation(address, status, dispo, lat, lng, map);
          infos = InfosStation(marker, address, status, dispo, map);

// Pousser le marker sur la map (api google)
      markers.push(marker);
      };

// Regroupement de markers Maps (api google)
      let markerCluster = new MarkerClusterer(map, markers, {imagePath: "images/m"});
    });
  });
});

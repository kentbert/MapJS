$(document).ready(function() {
  $.when(
    $.getScript( "sliderino.js" ),
    $.getScript( "markers.js" ),
    $.Deferred(function( deferred ){
        $( deferred.resolve );
    })
  ).done(function(data) {

    ElSliderino();

    $.getJSON("https://api.jcdecaux.com/vls/v1/stations?apiKey=xxxxxxxxxxxxxxxe3436d2cbb92&contract=lyon", function(dataVelov) {

      let markers = [];

      for (let i=0; i<dataVelov.length; i++) {

      let address = dataVelov[i].address;
          status = dataVelov[i].status;
          dispo = dataVelov[i].available_bikes;
          lat = dataVelov[i].position.lat;
          lng = dataVelov[i].position.lng;

        MarkerStation(address, status, dispo, lat, lng);

      };


    });
  });
});

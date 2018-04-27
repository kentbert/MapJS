$( document ).ready(function() {
  $.getJSON("https://api.jcdecaux.com/vls/v1/stations?apiKey=bd36deba0672e9f5273b4c8b7bffe3436d2cbb92&contract=lyon", function(daCaux) {
    stationInfos(daCaux);
  });
});

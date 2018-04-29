let map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: new google.maps.LatLng(45.75,4.85),
    mapTypeId: 'terrain',
    disableDefaultUI: true,
  });
}

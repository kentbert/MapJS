function MarkerStation(address, status, lat, lng) {
  let latLng = new google.maps.LatLng(lat,lng);
  let marker = new google.maps.Marker({
  position: latLng,
  map: map,
  animation: google.maps.Animation.DROP,
  });
}

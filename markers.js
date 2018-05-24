function MarkerStation(address, status, dispo, lat, lng, map) {

    let latLng = new google.maps.LatLng(lat, lng);
    let marker = new google.maps.Marker({
    position: latLng,
    map: map,
    });

    return marker;
};

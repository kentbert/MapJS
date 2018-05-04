function InfosStation(marker, address, status, dispo, map) {
  google.maps.event.addListener(marker, "click", function(){

    $("#station").toggle(true);

    document.getElementById("address").innerHTML =
    "Vous êtes à la station <strong class='uppercase'>" + address + ("</strong>.");

    document.getElementById("dispo").innerHTML =
    "Il reste <strong>" + dispo + " vélos" + ("</strong>.") ;
  });
};

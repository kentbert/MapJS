function InfosStation(marker, address, status, dispo, map) {
  google.maps.event.addListener(marker, "click", function(){

    $("#station").toggle(true);

    document.getElementById("address").innerHTML =
    "Vous êtes à la station <strong class='uppercase'>" + address + "</strong>.";

    document.getElementById("dispo").innerHTML =
    "Il reste <strong>" + dispo + " vélos" + "</strong>.";

    document.getElementById("resa").innerHTML =
    DispoResa(dispo);

    document.getElementById("resaup").onclick = function(){
      sessionStorage.setItem("address", address, "date", date);
    };
  });
};

let resaUp = "<button class='bg-indigo hover:bg-indigo-dark text-white font-bold py-2 px-4 rounded m-4' id='resaup'>Reserver !</button>"
let resaDown = "<button class='bg-indigo text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed m-4'>Indisponible</div>"

let date = new Date().getTime()

function DispoResa (dispo) {
  if (dispo > 0)
    {
      return resaUp;
    }
  else {
      return resaDown;
    };
};

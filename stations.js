let cacheDataInfos_json = sessionStorage.getItem("reservation", "start");
    cacheDataInfos = JSON.parse(cacheDataInfos_json);

    // Variables temps
    dateResa = new Date().getTime();
    existingIntervalId = 0;
    fiveMinutes = 60 * 5,
    display = document.querySelector('#time');

    // Boutons réservation
    resaUp = "<button class='bg-green text-white text-3xl p-4 w-full hover:background-green-dark rounded-lg' id='resaup'><i class='fas fa-check'></i> Reserver !</button>";
    resaDown = "<button class='bg-indigo text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed mx-8 my-4'>Indisponible</div>";

function startTimer(duration, display, time) {

  var start = sessionStorage.getItem("start"),
        diff,
        minutes,
        seconds;

  if (start === null) { // si
  start = Date.now();
  sessionStorage.setItem("start", start);
  }

    function timer() {
        // Obtenir le nombre de secondes depuis que startimer a été call
        diff = duration - (((Date.now() - start) / 1000) | 0);

        // Même chose mais en tronquant la virgule
        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.innerHTML = "<p class='text-lg leading-loose'>Il reste <span class='bg-red text-white text-xl rounded-lg p-2'>" + minutes + "</span> minutes et <span class='bg-red text-white text-xl rounded-lg p-2'>" + seconds + "</span> secondes à votre réservation.</p>";

        if (diff <= 0) {
            // Ajouter une seconde pour que le timer commence à la bonne durée
            start = Date.now() + 1000;
        }
    }
    // Tout en s'assurant que le timer n'attend pas une seconde entière avant de démarrer
    timer();
    existingIntervalId = setInterval(timer, 1000);
}

// Si il y a un élément dans la sessionstorage, alors reprendre le timer
if (sessionStorage.length > 0) {
  $(".containerslider").toggle(false);

  startTimer(fiveMinutes, display);

  document.getElementById("alert").innerHTML =
  "<div class='bg-blue text-white p-8 text-lg font-thin m-2 rounded-lg'><p>Une réservation a été précédemment enregistrée pour l'adresse <strong class='uppercase font-bold'>" + cacheDataInfos.address + "</strong></p></div>"
  } else {};

// La fonction principale qui gère le clic sur une station
function InfosStation(marker, adresse, status, dispo, map) {

  google.maps.event.addListener(marker, "click", function(){

    window.scrollTo(0,0);

    $(".containerslider").toggle(false);
    $("#station").toggle(true);

    document.getElementById("adresse").innerHTML =
    "Vous êtes à la station <strong class='font-bold'>" + adresse + "</strong>.";

    document.getElementById("clearZig").innerHTML =
    "<button class='text-green-dark'><i class='fas fa-sync-alt'></i> Recommencer la signature</button>"

    document.getElementById("dispo").innerHTML =
    "Il reste <strong>" + dispo + " vélos" + "</strong>.";

    document.getElementById("resa").innerHTML =
    DispoResa(dispo);

    $("#station").addClass("w-full sm:w-full md:w-full lg:w-2/5 xl:w-2/5");
    $("#map").addClass("w-full sm:w-full md:w-full lg:w-3/5 xl:w-3/5");

    // Lorsque le bouton réservé est cliqué
    document.getElementById("resaup").onclick = function(){
      sessionStorage.clear();
      clearInterval(existingIntervalId);
      startTimer(fiveMinutes, display);
      sessionStorage.setItem("reservation", JSON.stringify({address : adresse, time : dateResa}));
      sessionStorage.getItem("start"),
      document.getElementById("alert").innerHTML =
      "<div class='bg-green text-white p-8 text-lg font-thin m-2 rounded-lg'><p>Station <strong class='uppercase'>" + adresse + "</strong> réservée !</p>"
      $("#alerte").toggle(false);
      window.scrollTo(0,0);
    };
  });
};

$(function() {
  $("body").click(function(e) {
    if (e.target.id == "canvas" || $(e.target).parents("#canvas").length) {
      $("#resaup").toggle(true);
    } else {
      $("#resaup").toggle(false);
    }
  });
})

function DispoResa (dispo) {
  if (dispo > 0) {
      return resaUp;
    }
  else {
      return resaDown;
    };
};

let cacheDataInfos_json = sessionStorage.getItem("reservation", "start", "adresse");
    cacheDataInfos = JSON.parse(cacheDataInfos_json);

    // Variables temps
    existingIntervalId = 0;
    twentyMinutes = 10 * 1,
    display = document.querySelector('#time');


    // Boutons réservation
    resaUp = "<button class='bg-green text-white text-3xl p-4 w-full hover:background-green-dark rounded-lg mt-2' id='resaup'><i class='fas fa-check'></i> Reserver !</button>";
    resaDown = "<button class='bg-red text-white text-3xl p-4 w-full rounded-lg rounded opacity-50 cursor-not-allowed mt-2'>Indisponible</div>";

function startTimer(duration, display, time, twentyMinutes) {

let start = sessionStorage.getItem("start"),
    diff,
    minutes,
    seconds;

  if (start === null) {
    start = Date.now();
    sessionStorage.setItem("start", start);
    setTimeout(function(){
      sessionStorage.clear();
      location.reload();
    }, 10000);
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

// Sessionstorage remplie
if (sessionStorage.length > 0) {
  $(".containerslider").toggle(false); // On cache par défaut le tuto

  startTimer(twentyMinutes, display); // On reprend le timer

  document.getElementById("alert").innerHTML =
  "<div class='bg-blue text-white p-8 text-lg font-thin m-2 rounded-lg'><p>Une réservation a été précédemment enregistrée pour l'adresse <strong class='uppercase font-bold'>" + cacheDataInfos.address + "</strong></p></div>"
};

// La fonction principale qui gère le clic sur une station
function InfosStation(marker, adresse, status, dispo, map) {

  google.maps.event.addListener(marker, "click", function(){

    window.scrollTo(0,0);

    // Affichage de l'encart de station
    $("#station").toggle(true);
    $("#station").addClass("w-full sm:w-full md:w-full lg:w-2/5 xl:w-2/5");
    $("#map").addClass("w-full sm:w-full md:w-full lg:w-3/5 xl:w-3/5");

    // Masquage du slider et du bouton de réservation...
    $(".containerslider").toggle(false);
    $("#resa").toggle(false);

    // ... Car celui-ci nécessite un clic sur l'élement canvas pour s'afficher
    $("#canvas" ).mousedown(function() {
      $("#resa").toggle(true);
    });

    document.getElementById("ladresse").innerHTML =
    "Vous êtes à la station <strong class='font-bold'>" + adresse + "</strong>.";

    document.getElementById("clearSig").innerHTML =
    "<button class='text-green-dark'><i class='fas fa-sync-alt'></i> Recommencer la signature</button>"

    dispoCount(adresse, status, dispo);

    document.getElementById("resa").innerHTML =
    dispoResa(dispo);

    // Lorsque le bouton réserver est cliqué
    document.getElementById("resaup").onclick = function(){
      sessionStorage.clear();
      clearInterval(existingIntervalId);
      startTimer(twentyMinutes, display);
      sessionStorage.setItem("reservation", JSON.stringify({address : adresse}));
      sessionStorage.getItem("start"),
      document.getElementById("alert").innerHTML =
      "<div class='bg-green text-white p-8 text-lg font-thin m-2 rounded-lg'><p>Station <strong class='uppercase'>" + adresse + "</strong> réservée !</p>"
      $("#alerte").toggle(false);
      window.scrollTo(0,0);
    };
  });
};

function dispoCount (adresse, status, dispo) {
  if (dispo === 0) {
    document.getElementById("dispo").innerHTML =
    "Il n'y a plus de vélo disponible."
    }
  else if (dispo === 1) {
    document.getElementById("dispo").innerHTML =
    "Il ne reste plus qu'un vélo !"
    }
  else {
    document.getElementById("dispo").innerHTML =
    "Il reste " + dispo + " vélos."
  }
}


function dispoResa (dispo) {
  if (dispo > 0) {
      return resaUp;
    }
  else {
      $("#resa").toggle(true);
      return resaDown;
    };
};

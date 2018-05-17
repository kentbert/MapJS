let cacheDataInfos_json = sessionStorage.getItem("reservation", "start");
let cacheDataInfos = JSON.parse(cacheDataInfos_json);
let dateResa = new Date().getTime();

var existingIntervalId = 0;
function startTimer(duration, display, time) {

  var start = sessionStorage.getItem("start"),
        diff,
        minutes,
        seconds;

  if (start === null) {
  start = Date.now();
  sessionStorage.setItem("start", start);
  }

    function timer() {
        // get the number of seconds that have elapsed since
        // startTimer() was called
        diff = duration - (((Date.now() - start) / 1000) | 0);

        // does the same job as parseInt truncates the float
        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.innerHTML = "<p class='text-lg leading-loose'>Il reste <span class='bg-red text-white text-xl rounded-lg p-2'>" + minutes + "</span> minutes et <span class='bg-red text-white text-xl rounded-lg p-2'>" + seconds + "</span> secondes à votre réservation.</p>";

        if (diff <= 0) {
            // add one second so that the count down starts at the full duration
            // example 05:00 not 04:59
            start = Date.now() + 1000;
        }
    }
    // we don't want to wait a full second before the timer starts
    timer();
    existingIntervalId = setInterval(timer, 1000);
}

let fiveMinutes = 60 * 5,
    display = document.querySelector('#time');

if (sessionStorage.length > 0) {
  $(".containerslider").toggle(false);

  startTimer(fiveMinutes, display);

  document.getElementById("alert").innerHTML =
  "<div class='bg-blue text-white p-8 text-lg font-thin m-2 rounded-lg'><p>Une réservation a été précédemment enregistrée pour l'adresse <strong class='uppercase font-bold'>" + cacheDataInfos.address + "</strong></p></div>"
  } else {};

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


let resaUp = "<button class='bg-green text-white text-3xl p-4 w-full hover:background-green-dark rounded-lg' id='resaup'><i class='fas fa-check'></i> Reserver !</button>";
let resaDown = "<button class='bg-indigo text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed mx-8 my-4'>Indisponible</div>";

function DispoResa (dispo) {
  if (dispo > 0) {
      return resaUp;
    }
  else {
      return resaDown;
    };
};

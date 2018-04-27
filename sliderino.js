$(".close").click(function(){
    $(".containerslider").toggle();
});

var slides = document.querySelectorAll("#slider .card");
var currentSlide = 0;

function nextCard() {
    changeCard(currentSlide+1);
}

function previousCard() {
    changeCard(currentSlide-1);
}

function changeCard(i) {
    slides[currentSlide].className = "card inactive";
    currentSlide = (i+slides.length)%slides.length;
    slides[currentSlide].className = "card active";
}

var next = document.getElementById("next");
var previous = document.getElementById("previous");

next.onclick = function() {
    nextCard();
};
previous.onclick = function() {
    previousCard();
};

document.onkeyup=function(nav){
  if(nav.which == 69) {
    nextCard();
  }
  else if(nav.which == 65) {
    previousCard();
  }
}

function Signature() {

  let canvasWidth = 300;                           //canvas width
  let canvasHeight = 180;                           //canvas height
  let canvas = document.getElementById('canvas');  //canvas element
  let context = canvas.getContext("2d");           //context element
  let clickX = new Array();
  let clickY = new Array();
  let clickDrag = new Array();
  let paint;

  canvas.addEventListener("mousedown", mouseDown, false);
  canvas.addEventListener("mousemove", mouseXY, false);
  document.body.addEventListener("mouseup", mouseUp, false);

  //Mobile
  canvas.addEventListener("touchstart", mouseDown, false);
  canvas.addEventListener("touchmove", mouseXY, true);
  canvas.addEventListener("touchend", mouseUp, false);
  document.body.addEventListener("touchcancel", mouseUp, false);

  function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height); // Clears the canvas

  context.strokeStyle = "#000000";  //set the "ink" color
  context.lineJoin = "miter";       //line join
  context.lineWidth = 2;            //"ink" width

  for (var i = 0; i < clickX.length; i++) {
    context.beginPath();                               //create a path
    if (clickDrag[i] && i) {
    	context.moveTo(clickX[i - 1], clickY[i - 1]);  //move to
    } else {
    	context.moveTo(clickX[i] - 1, clickY[i]);      //move to
    }
    context.lineTo(clickX[i], clickY[i]);              //draw a line
    context.stroke();                                  //filled with "ink"
    context.closePath();                               //close path
    }
  }

  // Recommencer signature
  $('#clearSig , #resa').click(
    function clearSig() {
      clickX = new Array();
      clickY = new Array();
      clickDrag = new Array();
      context.clearRect(0, 0, canvas.width, canvas.height);
      $("#imgData").html('');
      $("#resa").toggle(false);
    }
  );

  function addClick(x, y, dragging) {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
  }

  function mouseXY(e) {
    if (paint) {
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    draw();
    }
  }

  function mouseUp() {
    paint = false;
  }

  function mouseDown(e) {
    let mouseX = e.pageX - this.offsetLeft;
    let mouseY = e.pageY - this.offsetTop;

    paint = true;
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
    draw();
  }
};

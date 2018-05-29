window.onload = function() {
  var canvas = document.createElement("canvas");

  canvas.width = 600;
  canvas.height = 800;
  canvas.id = "canvas";

  document.body.prepend(canvas);

  new Game(canvas).start();
};
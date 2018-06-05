//"use strict";

window.onload = function() {
  var canvas = document.createElement("canvas");
  canvas.width = 600;
  canvas.height = 800;
  canvas.id = "canvas";

  document.body.prepend(canvas);
  Painter.setCanvas(canvas);

  var game = new Game(canvas);
  game.start();

  document.onkeydown = function(e) {
    game.onkeydown(e.keyCode);
  };
};
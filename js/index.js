window.onload = function() {
  var canvas = document.createElement("canvas");

  canvas.width = 600;
  canvas.height = 800;
  canvas.id = "canvas";

  document.body.prepend(canvas);

  this.game = new Game(canvas);
  this.game.start();

  document.onkeydown = function(e) {
    this.game.onkeydown(e.keyCode);
  }.bind(this);
};
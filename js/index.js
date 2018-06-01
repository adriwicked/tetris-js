window.onload = function() {
  var canvas = document.createElement("canvas");
  canvas.width = 600;
  canvas.height = 800;
  canvas.id = "canvas";

  document.body.prepend(canvas);
  Painter.setCanvas(canvas);

  this.game = new Game(canvas);
  this.game.start();

  document.onkeydown = function(e) {
    if (e.keyCode === 82) {
      delete this.game;
      this.game = new Game(canvas);
      this.game.start();
    }
    this.game.onkeydown(e.keyCode);
  }.bind(this);
};
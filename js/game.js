function Game() {
  this.frameCounter = 0;
  this.framesTick = 15;

  this.board = new Board();
  //this.board.onPieceSet = this.createNewPiece;
  
  this.fallingPiece = new TPiece();
}

Game.prototype.start = function() {
  setInterval(function() {        

    this.tickUpdate();

    Painter.clearCanvas();
    Painter.drawBoard(this.board);
    Painter.drawPiece(this.fallingPiece);

  }.bind(this), 32);
}

Game.prototype.tickUpdate = function () {
  this.frameCounter++;

  if (this.frameCounter >= this.framesTick) {
    this.frameCounter = 0;
    
    this.fallingPiece.down(this.board);
  }
}

Game.prototype.createNewPiece = function() {  
  this.fallingPiece = new TPiece();
};

Game.prototype.TOP = 38;
Game.prototype.DOWN = 40;
Game.prototype.LEFT = 37;
Game.prototype.RIGHT = 39;

Game.prototype.onkeydown = function(key) {
  switch(key) {
    case this.TOP:
      this.fallingPiece.rotate();      
      break;
    case this.RIGHT:
      this.fallingPiece.move(true);
      break;
    case this.DOWN: 
      this.fallingPiece.down();     
      break;
    case this.LEFT:
      this.fallingPiece.move(false);
      break;
  }
}
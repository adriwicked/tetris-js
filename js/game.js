function Game() {
  this.frameCounter = 0;
  this.framesTick = 15;

  this.board = new Board();
  
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
    
    // Piece move down logic
    if (!this.checkCollision(this.board, this.fallingPiece.getPossiblePieceState("down"))) {
      this.fallingPiece.down();
    } else {
      this.board.setPieceInBoard(this.fallingPiece);
      this.createNewPiece();
    }
  }
}

Game.prototype.createNewPiece = function() {  
  this.fallingPiece = new TPiece();
};

Game.prototype.checkCollision = function(board, piece) {  
  for (var row = 0; row < piece.shape.length; row++) {    
    for (var col = 0; col < piece.shape[0].length; col++) {
      if (piece.shape[row][col] !== 0 && board.boardMatrix[row + piece.y][col + piece.x] !== 0) {
        return true;
      }
    }
  }
  return false;
};

Game.prototype.movePieceDown = function() {  
  if (!this.checkCollision(this.board, this.fallingPiece.getPossiblePieceState("down"))) {
    this.fallingPiece.down();     
  }
};

Game.prototype.movePiece = function(right) {  
  if(right) {
    if (!this.checkCollision(this.board, this.fallingPiece.getPossiblePieceState("right"))) {
      this.fallingPiece.move(right);
    }
  } else {
    if (!this.checkCollision(this.board, this.fallingPiece.getPossiblePieceState("left"))) {
      this.fallingPiece.move(right);
    }
  }
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
    case this.DOWN: 
      this.movePieceDown();
      break;
    case this.RIGHT:
      this.movePiece(true);
      break;
    case this.LEFT:
      this.movePiece(false);
      break;
  }
}
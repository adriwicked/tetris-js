function Game() {
  this.frameCounter = 0;
  this.framesTick = 40;

  this.board = new Board();
  
  this.fallingPiece = new TPiece();
}

Game.prototype.start = function() {
  setInterval(function() {        

    this.tickUpdate();

    Painter.clearCanvas();
    Painter.drawBackground();
    Painter.drawBoard(this.board);
    Painter.drawPiece(this.board.getGhost(this.fallingPiece), true);
    Painter.drawPiece(this.fallingPiece, false);    

  }.bind(this), 32);
}

Game.prototype.tickUpdate = function () {
  this.frameCounter++;

  if (this.frameCounter >= this.framesTick) {
    this.frameCounter = 0;
        
    // Piece move down logic
    if (!this.board.checkCollision(this.fallingPiece.getPossiblePieceState("down"))) {
      this.fallingPiece.down();
    } else {
      this.board.setPieceInBoard(this.fallingPiece);
      this.createNewPiece();
    }
    
    this.clearLines();
  }
}

Game.prototype.clearLines = function() {  
  var lines = this.board.checkLines();
    if (lines.length > 0) {
      this.board.clearLines(lines);
    }
};

Game.prototype.createNewPiece = function() {  
  this.fallingPiece = PieceFactory();
};

Game.prototype.movePieceDown = function() {  
  if (!this.board.checkCollision(this.fallingPiece.getPossiblePieceState("down"))) {
    this.fallingPiece.down();     
  }
};

Game.prototype.movePiece = function(right) {  
  if(right) {
    if (!this.board.checkCollision(this.fallingPiece.getPossiblePieceState("right"))) {
      this.fallingPiece.move(right);
    }
  } else {
    if (!this.board.checkCollision(this.fallingPiece.getPossiblePieceState("left"))) {
      this.fallingPiece.move(right);
    }
  }
};

Game.prototype.rotatePiece = function() {
  if (!this.board.checkCollision(this.fallingPiece.getPossiblePieceState("rotation"))) {
    this.fallingPiece.rotate();
  }
}

Game.prototype.dropPiece = function() {
  var ghost = this.board.getGhost(this.fallingPiece);  
  this.board.setPieceInBoard(ghost);
  this.clearLines();
  this.createNewPiece();
}

Game.prototype.TOP = 38;
Game.prototype.DOWN = 40;
Game.prototype.LEFT = 37;
Game.prototype.RIGHT = 39;
Game.prototype.SPACE = 32;

Game.prototype.onkeydown = function(key) {
  switch(key) {
    case this.TOP:
      this.rotatePiece();     
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
    case this.SPACE:
      this.dropPiece();
      break;
  }
}
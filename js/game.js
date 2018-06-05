function Game() {
  this.frameCounter = 0;
  this.framesTick = 40;
  this.pieceQueueLength = 3;
  this.board = undefined;
  this.fallingPiece = undefined;
  this.retainedPiece = undefined;
  this.nextPieces = [];
  this.intervalId = undefined;
  this.linesCleared = 0;

  this.init();
}

Game.prototype.init = function() {
  this.board = new Board();
  this.fallingPiece = undefined;
  this.retainedPiece = undefined;
  this.nextPieces = [];
  this.linesCleared = 0;

  for (var i = 0; i < this.pieceQueueLength; i++) {
    this.nextPieces.push(PieceFactory.getNewPiece()); 
  }
}

Game.prototype.start = function() {
  this.createNewPiece();
  
  if (!this.intervalId) {
    this.intervalId = setInterval(function() {        
    
      this.tickUpdate();
      
      Painter.clearCanvas();
      Painter.drawBackground();
      Painter.drawBoard(this.board);
      Painter.drawPiece(this.board.getGhost(this.fallingPiece.clone()), true);
      Painter.drawPiece(this.fallingPiece, false);
      if (this.retainedPiece) {
        Painter.drawRetainedPiece(this.retainedPiece);
      }
      Painter.drawNextPieces(this.nextPieces);
      Painter.drawTitle("I R O N T E T R I S");
      Painter.drawLineCounter("Lines: " + this.linesCleared);
      
    }.bind(this), 32);
  }
}

Game.prototype.stop =  function() {
  clearInterval(this.intervalId); 
  this.intervalId = undefined; 
}

Game.prototype.restart = function() {  
  this.stop();
  this.init();
  this.start();
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
      this.checkLost();
      this.createNewPiece();
    }

    // Check lines and clear them
    this.clearLines();
  }
}

Game.prototype.clearLines = function() {  
  var lines = this.board.checkLines();
  if (lines.length > 0) {
    this.linesCleared += lines.length;
    this.board.clearLines(lines);
  }
};

Game.prototype.checkLost = function() {
  if (this.board.checkLost()) {
    this.lose();
  }
}

Game.prototype.lose = function () {
  alert("You lost");
  this.restart();
}

Game.prototype.createNewPiece = function() {  
  this.fallingPiece = this.nextPieces.shift();
  this.nextPieces.push(PieceFactory.getNewPiece()); 
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
  this.checkLost();
  var ghost = this.board.getGhost(this.fallingPiece);  

  if (ghost.position.y >= 0) {
    this.board.setPieceInBoard(ghost);
  } else {
    this.lose();
  }
  this.clearLines();
  this.createNewPiece();
}

Game.prototype.retainPiece = function() {
  if (this.retainedPiece) {
    var auxPiece = this.fallingPiece.clone();
    auxPiece.resetPosition();
  
    if (this.retainedPiece) {
      this.fallingPiece = this.retainedPiece;
    }
  
    this.retainedPiece = auxPiece;
  } else {
    this.retainedPiece = this.fallingPiece;
    this.retainedPiece.resetPosition();
    this.createNewPiece();
  }

}

Game.prototype.onkeydown = function(key) {
  switch(key) {
    case TOP:
      this.rotatePiece();     
      break;
    case DOWN: 
      this.movePieceDown();
      break;
    case RIGHT:
      this.movePiece(true);
      break;
    case LEFT:
      this.movePiece(false);
      break;
    case SPACE:
      this.dropPiece();
      break;
    case SHIFT:
      this.retainPiece();
      break;
    case R:
      this.restart();
      break;
  }
}
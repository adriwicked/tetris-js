function Game() {
  this.frameCounter = 0;
  this.framesTick = 40;

  this.board = undefined;
  this.pieceRetainedViewer = undefined;
  this.intervalId = undefined;

  this.init();
}

Game.prototype.init = function() {
  this.board = new Board();
  this.pieceRetainedViewer = new PieceViewer({ x: 0, y: 0 });
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
      Painter.drawPieceInViewer(this.pieceRetainedViewer.piece, this.pieceRetainedViewer);
      Painter.drawText("I R O N T E T R I S");
      
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
      this.createNewPiece();
    }

    // Check lines and clear them
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
  this.pieceRetainedViewer.changePiece(this.fallingPiece.clone());
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
  }
}
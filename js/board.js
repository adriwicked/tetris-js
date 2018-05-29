function Board(ctx) {
  this.ctx = ctx;
  this.cellSize = 30;
  this.cellSeparation = 3;
  this.boardPosition = { x: 40, y: 40 };
  this.boardMatrix = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
  ];

  this.fallingPiece = null;
}

Board.prototype.update = function() {
  this.drawBoard();
}

Board.prototype.tickUpdate = function() {
  if (this.fallingPiece.checkCollision()) {
    this.setPieceInBoard();
    this.checkLines();
  } else {
    this.fallingPiece.fall();
  }
}

Board.prototype.drawBoard =  function() {
  this.ctx.beginPath();
  for (var col = 0; col < this.boardMatrix[0].length; col++) {
    for (var row = 0; row < this.boardMatrix.length; row++) {
      this.ctx.fillStyle = this.boardMatrix[row][col] === 0 ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 200, 0, 1)";
      this.ctx.fillRect(this.boardPosition.x + (this.cellSize + this.cellSeparation) * col,
                        this.boardPosition.y + (this.cellSize + this.cellSeparation) * row,
                        this.cellSize,
                        this.cellSize);
    }
  }
  this.drawFallingPiece();
  this.ctx.closePath();
};

Board.prototype.drawFallingPiece = function() {
  this.ctx.fillStyle = "rgba(200, 0, 0, 1)";
  for (var row = 0; row < this.fallingPiece.shape.length; row++) {
    for (var col = 0; col < this.fallingPiece.shape[0].length; col++) {
      if (this.fallingPiece.shape[row][col] === 1) {
        this.ctx.fillRect(this.boardPosition.x + (this.cellSize + this.cellSeparation) * this.fallingPiece.position.x + (this.cellSize + this.cellSeparation) * col,
                          this.boardPosition.y + (this.cellSize + this.cellSeparation) * this.fallingPiece.position.y + (this.cellSize + this.cellSeparation) * row,
                          this.cellSize,
                          this.cellSize);
      }
    }
  }
}

Board.prototype.setPieceInBoard = function() {
  for (var i = 0; i < this.fallingPiece.shape.length; i++) {
    for (var j = 0; j < this.fallingPiece.shape[0].length; j++) {
      this.boardMatrix[this.fallingPiece.position.y + i][this.fallingPiece.position.x + j] =
      this.fallingPiece.shape[i][j];
    }
  }
}

Board.prototype.checkLines = function() {
  
}
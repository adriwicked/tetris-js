function Board() {  
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
    [0,0,0,0,1,1,0,0,0,0],
    [1,0,0,0,1,1,0,0,0,0],
    [1,1,0,1,1,1,1,0,0,0],
    [1,1,1,1,1,1,1,1,0,0]
  ];  
}

Board.prototype.setPieceInBoard = function(piece) {
  for (var i = 0; i < piece.shape.length; i++) {
    for (var j = 0; j < piece.shape[0].length; j++) {
      if (piece.shape[i][j] === 1)
        this.boardMatrix[piece.position.y + i][piece.position.x + j] = piece.shape[i][j];
    }
  }  

  if (this.onPieceSet) this.onPieceSet();
}

Board.prototype.onPieceSet = null;

Board.prototype.checkLines = function() {
  
}
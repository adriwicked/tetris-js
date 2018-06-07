function Board() {  
  this.boardMatrix = [
    [9,0,0,0,0,0,0,0,0,0,0,9], // This row won't be painted. It's just to spawn pieces in range.
    [9,0,0,0,0,0,0,0,0,0,0,9],
    [9,0,0,0,0,0,0,0,0,0,0,9],
    [9,0,0,0,0,0,0,0,0,0,0,9],
    [9,0,0,0,0,0,0,0,0,0,0,9],
    [9,0,0,0,0,0,0,0,0,0,0,9],
    [9,0,0,0,0,0,0,0,0,0,0,9],
    [9,0,0,0,0,0,0,0,0,0,0,9],
    [9,0,0,0,0,0,0,0,0,0,0,9],
    [9,0,0,0,0,0,0,0,0,0,0,9],
    [9,0,0,0,0,0,0,0,0,0,0,9],
    [9,0,0,0,0,0,0,0,0,0,0,9],
    [9,0,0,0,0,0,0,0,0,0,0,9],
    [9,0,0,0,0,0,0,0,0,0,0,9],
    [9,0,0,0,0,0,0,0,0,0,0,9],
    [9,0,0,0,0,0,0,0,0,0,0,9],
    [9,0,0,0,0,0,0,0,0,0,0,9],
    [9,9,9,9,9,9,9,9,9,9,9,9],
  ];  
}

Board.prototype.setPieceInBoard = function(piece) {
  for (var i = 0; i < piece.shape.length; i++) {
    for (var j = 0; j < piece.shape[0].length; j++) {
      if (piece.shape[i][j] === 1) {
        this.boardMatrix[piece.position.y + i][piece.position.x + j] = piece.shape[i][j];
      }
    }
  }  
}

Board.prototype.checkCollision = function(piece) {  
  for (var row = 0; row < piece.shape.length; row++) {    
    for (var col = 0; col < piece.shape[0].length; col++) {
      if (piece.shape[row][col] !== 0 && this.boardMatrix[(row + piece.position.y)][(col + piece.position.x)] !== 0) {
        return true;
      }
    }
  }
  return false;
};

Board.prototype.checkLost = function() {
  return this.boardMatrix[0].includes(1);
}

Board.prototype.checkLines = function() {
  var rowsWithLine = [];
  for (var row = 0; row < this.boardMatrix.length - 1; row++) {
    if(!this.boardMatrix[row].includes(0)) {
      rowsWithLine.push(row);
    }
  }
  return rowsWithLine;
}

Board.prototype.clearLines = function(rows) {
  for (var i = 0; i < rows.length; i++) {
    this.boardMatrix.splice(rows[i], 1);
    this.boardMatrix.unshift([9,0,0,0,0,0,0,0,0,0,0,9]);
  }
}

Board.prototype.getGhost = function(piece) {
  return this._getGhost(piece);
}

Board.prototype._getGhost = function(piece) {
  if (this.checkCollision(piece)) {
    piece.position.y--;
    return piece;
  } else {
    piece.position.y++;
    return this._getGhost(piece);
  }
}
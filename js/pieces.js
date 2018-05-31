function Piece() {  
  this.position = { x: 3, y: 2 };
  this.shape = [[]];
  this.rotationPosition = 0;
  this.color = "rgba(200, 0, 0, 1)";
}

Piece.prototype.down = function(board) {  
  if (!this.checkCollision(board, { x: this.position.x, y: this.position.y + 1, shape: this.shape })) {
    this.position.y++;
  } else {
    board.setPieceInBoard(this);
  }
}

Piece.prototype.move = function(right) {
  right ? this.position.x++ : this.position.x--;
}

Piece.prototype.rotate = function() {  
  this.rotationPosition === 3 ? this.rotationPosition = 0 : this.rotationPosition++;      
  this.shape = this.rotations[this.rotationPosition];
}

Piece.prototype.checkCollision = function(board, nextPos) {  
  
  for (var row = 0; row < nextPos.shape.length; row++) {    
    for (var col = 0; col < nextPos.shape[0].length; col++) {
      if (nextPos.shape[row][col] === 1 && board.boardMatrix[row + nextPos.y][col + nextPos.x] === 1) {
        return true;
      }
    }
  }
  
  return false;
}

function TPiece() {
  Piece.call(this)

  this.rotations = [
    [[0,1,0,0],
     [1,1,1,0],
     [0,0,0,0],
     [0,0,0,0]],
    
    [[0,1,0,0],
     [0,1,1,0],
     [0,1,0,0],
     [0,0,0,0]],
    
    [[0,0,0,0],
     [1,1,1,0],
     [0,1,0,0],
     [0,0,0,0]],
    
    [[0,1,0,0],
     [1,1,0,0],
     [0,1,0,0],
     [0,0,0,0]],
  ];
  
  this.shape = this.rotations[0];
  this.color = "rgba(0, 200, 0, 1)";
}

TPiece.prototype = Object.create(Piece.prototype);
TPiece.prototype.constructor = Piece;

function IPiece() {
  Piece.call(this)

  this.rotations = [
    [[0,1,0,0],
     [0,1,0,0],
     [0,1,0,0],
     [0,1,0,0]],
    
    [[0,0,0,0],
     [1,1,1,1],
     [0,0,0,0],
     [0,0,0,0]],
    
    [[0,1,0,0],
     [0,1,0,0],
     [0,1,0,0],
     [0,1,0,0]],
    
    [[0,0,0,0],
     [1,1,1,1],
     [0,0,0,0],
     [0,0,0,0]]
  ];
  
  this.shape = this.rotations[0];
  this.color = "rgba(0, 0, 200, 1)";
}

IPiece.prototype = Object.create(Piece.prototype);
IPiece.prototype.constructor = Piece;
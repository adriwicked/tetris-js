function Piece() {
  this.shape = [[]];
  this.position = { x: 3, y: -1 };
  this.rotationPosition = 0;
}

Piece.prototype.fall = function() {
  this.position.y++;
}

Piece.prototype.checkCollision = function(board) {
  // Aquí debería tener ya referencia a shape?

  return false;
}

Piece.prototype.rotate = function(clockWise) {
  if (clockWise) {
    this.rotationPosition === 3 ? this.rotationPosition = 0 : this.rotationPosition++;
  } else {
    this.rotationPosition === 0 ? this.rotationPosition = 3 : this.rotationPosition--;
  }

  this.shape = this.rotations[this.rotationPosition];
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
    
    [[0,0,1,0],
     [0,0,1,0],
     [0,0,1,0],
     [0,0,1,0]],
    
    [[0,0,0,0],
     [0,0,0,0],
     [1,1,1,1],
     [0,0,0,0]],
  ];
  
  this.shape = this.rotations[0];
}

IPiece.prototype = Object.create(Piece.prototype);
IPiece.prototype.constructor = Piece;
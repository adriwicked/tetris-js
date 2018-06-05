function Piece() {  
  this.position = { x: 4, y: 0 };
  this.shape = [[]];
  this.rotationPosition = 0;
}

Piece.prototype.resetPosition = function() {
  this.position = { x: 4, y: 0 };
  this.shape = this.rotations[0]
}

Piece.prototype.down = function() {  
  this.position.y++;
}

Piece.prototype.move = function(right) {
  right ? this.position.x++ : this.position.x--;
}

Piece.prototype.rotate = function() {  
  this.rotationPosition === 3 ? this.rotationPosition = 0 : this.rotationPosition++;      
  this.shape = this.rotations[this.rotationPosition];
}

Piece.prototype.getPossiblePieceState = function(state) {
  var potentialPieceState = {
    shape: this.shape,
    position: {
      x: this.position.x,
      y: this.position.y
    }
  };
  
  switch (state) {
    case "down":
    potentialPieceState.position.y = this.position.y + 1;
    break;
    case "right":
    potentialPieceState.position.x = this.position.x + 1;
    break;
    case "left":
    potentialPieceState.position.x = this.position.x - 1;
    break;
    case "rotation":
    var possibleRotation = this.rotationPosition === 3 ? 0 : this.rotationPosition + 1;      
    potentialPieceState.shape = this.rotations[possibleRotation];
    break;
  }
  
  return potentialPieceState;
}

Piece.prototype.clone = function() {
  var pieceClone = JSON.parse(JSON.stringify(this));
  pieceClone.__proto__ = this.__proto__;
  return pieceClone;
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
}

IPiece.prototype = Object.create(Piece.prototype);
IPiece.prototype.constructor = Piece;

function OPiece() {
  Piece.call(this)

  this.rotations = [
    [[1,1,0,0],
     [1,1,0,0],
     [0,0,0,0],
     [0,0,0,0]],
    
    [[1,1,0,0],
     [1,1,0,0],
     [0,0,0,0],
     [0,0,0,0]],
    
    [[1,1,0,0],
     [1,1,0,0],
     [0,0,0,0],
     [0,0,0,0]],
    
    [[1,1,0,0],
     [1,1,0,0],
     [0,0,0,0],
     [0,0,0,0]],
  ];
  
  this.shape = this.rotations[0];
}

OPiece.prototype = Object.create(Piece.prototype);
OPiece.prototype.constructor = Piece;

function LPiece() {
  Piece.call(this)

  this.rotations = [
    [[1,0,0,0],
     [1,1,1,0],
     [0,0,0,0],
     [0,0,0,0]],
    
    [[0,1,1,0],
     [0,1,0,0],
     [0,1,0,0],
     [0,0,0,0]],
    
    [[0,0,0,0],
     [1,1,1,0],
     [0,0,1,0],
     [0,0,0,0]],
    
    [[0,1,0,0],
     [0,1,0,0],
     [1,1,0,0],
     [0,0,0,0]],
  ];
  
  this.shape = this.rotations[0];
}

LPiece.prototype = Object.create(Piece.prototype);
LPiece.prototype.constructor = Piece;

function JPiece() {
  Piece.call(this)

  this.rotations = [
    [[0,0,1,0],
     [1,1,1,0],
     [0,0,0,0],
     [0,0,0,0]],
    
    [[0,1,0,0],
     [0,1,0,0],
     [0,1,1,0],
     [0,0,0,0]],
    
    [[0,0,0,0],
     [1,1,1,0],
     [1,0,0,0],
     [0,0,0,0]],
    
    [[1,1,0,0],
     [0,1,0,0],
     [0,1,0,0],
     [0,0,0,0]],
  ];
  
  this.shape = this.rotations[0];
}

JPiece.prototype = Object.create(Piece.prototype);
JPiece.prototype.constructor = Piece;

function SPiece() {
  Piece.call(this)

  this.rotations = [
    [[0,1,1,0],
     [1,1,0,0],
     [0,0,0,0],
     [0,0,0,0]],
    
    [[0,1,0,0],
     [0,1,1,0],
     [0,0,1,0],
     [0,0,0,0]],
    
    [[0,1,1,0],
     [1,1,0,0],
     [0,0,0,0],
     [0,0,0,0]],
    
    [[0,1,0,0],
     [0,1,1,0],
     [0,0,1,0],
     [0,0,0,0]],
  ];
  
  this.shape = this.rotations[0];
}

SPiece.prototype = Object.create(Piece.prototype);
SPiece.prototype.constructor = Piece;

function ZPiece() {
  Piece.call(this)

  this.rotations = [
    [[1,1,0,0],
     [0,1,1,0],
     [0,0,0,0],
     [0,0,0,0]],
    
    [[0,0,1,0],
     [0,1,1,0],
     [0,1,0,0],
     [0,0,0,0]],
    
    [[1,1,0,0],
     [0,1,1,0],
     [0,0,0,0],
     [0,0,0,0]],
    
    [[0,0,1,0],
     [0,1,1,0],
     [0,1,0,0],
     [0,0,0,0]],
  ];
  
  this.shape = this.rotations[0];
}

ZPiece.prototype = Object.create(Piece.prototype);
ZPiece.prototype.constructor = Piece;
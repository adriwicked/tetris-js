var PieceFactory = function() {
  var position = { x: 3, y: 0 }
  var rotationPosition = 0;

  // Aquí se hace un random, se escoge rotations y se le pone la primera rotation a shape

  return {
    down: function(board) {  
      position.y++;
    },
    
    move: function(right) {
      right ? position.x++ : position.x--;
    },
    
    rotate: function() {  
      rotationPosition === 3 ? rotationPosition = 0 : rotationPosition++;      
      shape = rotations[rotationPosition];
    },

    getPotentialPieceState: function(state) {
      var potentialPieceState = {};
      
      switch (state) {
        case "down":
          potentialPieceState = {
            shape: this.shape,
            x: this.position.x,
            y: this.position.y + 1
          }
          break;
        case "rotation":

          break;
        case "ghost":

          break;
      }
    
      return potentialPieceState;
    }
  }
}

//-----------------------------------------------------------------

function Piece() {  
  this.position = { x: 3, y: 2 };
  this.shape = [[]];
  this.rotationPosition = 0;
  this.color = "rgba(200, 0, 0, 1)";
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
    x: this.position.x,
    y: this.position.y
  };
  
  switch (state) {
    case "down":
      potentialPieceState.y = this.position.y + 1;
      break;
    case "right":
      potentialPieceState.x = this.position.x + 1;
      break;
    case "left":
      potentialPieceState.x = this.position.x - 1;
      break;
    case "rotation":

      break;
    case "ghost":
    
      break;
  }

  return potentialPieceState;
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
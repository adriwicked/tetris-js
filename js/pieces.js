function Piece() {  
  this.position = { x: 3, y: 2 };
  this.shape = [[]];
  this.rotationPosition = 0;
  this.color = "rgba(200, 0, 0, 1)";
}

Piece.prototype.down = function() {
  this.position.y++;
}

Piece.prototype.draw = function(boardInfo) {
  boardInfo.ctx.fillStyle = this.color;
  for (var row = 0; row < this.shape.length; row++) {
    for (var col = 0; col < this.shape[0].length; col++) {
      if (this.shape[row][col] === 1) {
        boardInfo.ctx.fillRect(boardInfo.pos.x + (boardInfo.cellSize + boardInfo.cellSeparation) * this.position.x + (boardInfo.cellSize + boardInfo.cellSeparation) * col,
                               boardInfo.pos.y + (boardInfo.cellSize + boardInfo.cellSeparation) * this.position.y + (boardInfo.cellSize + boardInfo.cellSeparation) * row,
                               boardInfo.cellSize,
                               boardInfo.cellSize);
      }
    }
  }
}

Piece.prototype.move = function(right) {
  right ? this.position.x++ : this.position.x--;
}

Piece.prototype.rotate = function() {  
  this.rotationPosition === 3 ? this.rotationPosition = 0 : this.rotationPosition++;      
  this.shape = this.rotations[this.rotationPosition];
}

Piece.prototype.checkCollision = function() {  

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
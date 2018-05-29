function Piece(boardPosition) {
  this.position = { x: 3, y: 0 };
  this.rotationPosition = 0;
}

Piece.prototype.fall = function() {
  this.position.y++;
}

Piece.prototype.checkCollision = function(board) {
  // Aquí debería tener ya referencia a shape?

  return false;
}

Piece.prototype.rotateCW = function() {

}

Piece.prototype.rotateCCW = function() {
  
}
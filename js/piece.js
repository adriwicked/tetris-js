function Piece(boardPosition) {
  this.shape = [[]];
  this.position = { x: 2, y: 3 };
}

Piece.prototype.fall = function() {
  this.position.y++;
}

Piece.prototype.checkCollision = function(board) {
  return false;
}

Piece.prototype.rotateCW = function() {

}

Piece.prototype.rotateCCW = function() {
  
}
function PieceViewer(position) {
  this.position = position;
  this.piece = {};
}

PieceViewer.prototype.changePiece = function(clonedPiece) {
  this.piece = clonedPiece;
}
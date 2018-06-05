var PieceFactory = function() {
  return {
    getNewPiece: function() {
      switch (Math.floor(Math.random() * 7)) {
        case 0:
          return new TPiece();
          break;
        case 1:
          return new IPiece();
          break;          
        case 2:        
          return new OPiece();
          break;
        case 3:        
          return new LPiece();
          break;
        case 4:        
          return new JPiece();
          break;
        case 5:        
          return new SPiece();
          break;
        case 6:        
          return new ZPiece();
          break;    
        default:
          return new IPiece();
          break;
      }
    }
  }
}();
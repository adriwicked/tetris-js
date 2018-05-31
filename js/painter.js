var Painter = function () {
  var canvas = {};
  var ctx = {};
  var cellSize = 30;
  var cellSeparation = 3;
  var boardPosition = { x: 0, y: 0 };

  function centerBoard() {
    var boardWidth = (cellSize + cellSeparation) * 12;
    boardPosition.x = canvas.width / 2 - boardWidth / 2;
    boardPosition.y = canvas.height / 10;
  }

  return {
    setCanvas: function(canvasElement) { 
      canvas = canvasElement;
      ctx = canvas.getContext("2d");
      centerBoard();
    },
    
    clearCanvas: function() { ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height) },

    drawBoard : function(board) {
      ctx.beginPath();
      for (var col = 0; col < board.boardMatrix[0].length; col++) {
        for (var row = 0; row < board.boardMatrix.length; row++) {
          ctx.fillStyle = board.boardMatrix[row][col] === 0 ? "rgba(0, 0, 0, 0.3)" : "rgba(200, 0, 0, 1)";
          ctx.fillRect (boardPosition.x + (cellSize + cellSeparation) * col,
                        boardPosition.y + (cellSize + cellSeparation) * row,
                        cellSize,
                        cellSize);
        }
      }
      ctx.closePath();
    },
    
    drawPiece : function(piece) {
      ctx.beginPath();
      ctx.fillStyle = piece.color;
      for (var row = 0; row < piece.shape.length; row++) {
        for (var col = 0; col < piece.shape[0].length; col++) {
          if (piece.shape[row][col] === 1) {
            ctx.fillRect (boardPosition.x + ((cellSize + cellSeparation) * piece.position.x) + ((cellSize + cellSeparation) * col),
                          boardPosition.y + ((cellSize + cellSeparation) * piece.position.y) + ((cellSize + cellSeparation) * row),
                          cellSize,
                          cellSize);                          
          }
        }
      }
      ctx.closePath();
    }
  }
}();
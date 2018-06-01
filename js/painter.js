var Painter = function () {
  var canvas = {};
  var ctx = {};
  var cellSize = 25;
  var cellSeparation = 4;
  var boardPosition = { x: 0, y: 0 };

  var colors = {
    background: "#542437",
    cells: "#53777A",
    ghost: "#446163",
    pieces: "#C02942",
    text: "#ECD078"
  }

  function centerBoard() {
    var boardWidth = (cellSize + cellSeparation) * 12;
    boardPosition.x = canvas.width / 2 - boardWidth / 2;
    boardPosition.y = canvas.height / 12;
  }

  return {
    setCanvas: function(canvasElement) { 
      canvas = canvasElement;
      ctx = canvas.getContext("2d");
      centerBoard();
    },
    
    clearCanvas: function() { 
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    },

    drawBackground: function() {
      ctx.fillStyle = "#542437";
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    },

    drawBoard : function(board) {
      ctx.beginPath();
      for (var col = 1; col < board.boardMatrix[0].length - 1; col++) {
        for (var row = 1; row < board.boardMatrix.length - 1; row++) {
          ctx.fillStyle = board.boardMatrix[row][col] === 0 ? colors.cells : colors.pieces;
          ctx.fillRect (boardPosition.x + (cellSize + cellSeparation) * col,
                        boardPosition.y + (cellSize + cellSeparation) * row,
                        cellSize,
                        cellSize);
        }
      }
      ctx.closePath();
    },
    
    drawPiece : function(piece, ghost) {
      ctx.beginPath();

      if (ghost) ctx.fillStyle = colors.ghost;
      else ctx.fillStyle = colors.pieces;

      for (var row = 0; row < piece.shape.length; row++) {
        for (var col = 0; col < piece.shape[0].length; col++) {
          if (piece.position.y + row > 0) {
            if (piece.shape[row][col] === 1) {
              ctx.fillRect (boardPosition.x + ((cellSize + cellSeparation) * piece.position.x) + ((cellSize + cellSeparation) * col),
                            boardPosition.y + ((cellSize + cellSeparation) * piece.position.y) + ((cellSize + cellSeparation) * row),
                            cellSize,
                            cellSize);                          
            }
          }
        }
      }
      ctx.closePath();
    }
  }
}();
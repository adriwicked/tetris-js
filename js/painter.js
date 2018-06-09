var Painter = function () {
  var canvas = {};
  var ctx = {};
  var cellSize = 25;
  var cellSeparation = 4;
  var pieceSeparation = 8;
  var boardPosition = { x: 0, y: 0 };
  var retainedPiecePosition = { x: 40, y:150 };
  var nextPiecesPosition = { x: 150, y: 660 };
  var lineCounterPosition = { x: 475, y: 150 };
  var retainerTextPosition = { x: 20, y: 280 };
  var nextPiecesTextPosition = { x: 240, y: 615 };
  var levelPosition = { x: 475, y: 200 };
  var textOffset = {
    x: 55,
    y: -20
  }

  var colors = {
    background: "#661039",
    cells: "#974e7a",
    fullCells: "#BD1550",
    ghost: "#4d1c39",
    pieces: "#e29f39",
    text: "#ECD078"
  }

  // var colors = {
  //   background: "#1e306e",
  //   cells: "#563672",
  //   fullCells: "#c6427b",
  //   ghost: "#8e3c77",
  //   pieces: "#fe4880",
  //   text: "#fff"
  // }

  function centerBoard() {
    var boardWidth = (cellSize + cellSeparation) * 12;
    boardPosition.x = canvas.width / 2 - boardWidth / 2;
    boardPosition.y = canvas.height / 8;
  }

  function drawPieceByPos(piece, position) {
    ctx.beginPath();
      for (var row = 0; row < piece.shape.length; row++) {
        for (var col = 0; col < piece.shape[0].length; col++) {
          if (piece.shape[row][col] === 1) {
            ctx.fillRect (position.x + ((cellSize + cellSeparation) * col),
                          position.y + ((cellSize + cellSeparation) * row),
                          cellSize,
                          cellSize);                         
          }          
        }
      }
    ctx.closePath();
  }

  return {
    setCanvas: function(canvasElement) { 
      canvas = canvasElement;
      ctx = canvas.getContext("2d");
      centerBoard();
    },
    
    getBoardPosition: function() {
      return boardPosition;
    },

    clearCanvas: function() { 
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    },

    drawBackground: function() {
      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    },

    drawBoard : function(board) {
      ctx.beginPath();
      for (var col = 1; col < board.boardMatrix[0].length - 1; col++) {
        for (var row = 1; row < board.boardMatrix.length - 1; row++) {
          ctx.fillStyle = board.boardMatrix[row][col] === 0 ? colors.cells : colors.fullCells;
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
    },

    drawRetainedPiece: function(piece) {
      ctx.beginPath();

      ctx.fillStyle = colors.text;

      for (var row = 0; row < piece.shape.length; row++) {
        for (var col = 0; col < piece.shape[0].length; col++) {          
          if (piece.shape[row][col] === 1) {
            ctx.fillRect (retainedPiecePosition.x + ((cellSize + cellSeparation) * col),
                          retainedPiecePosition.y + ((cellSize + cellSeparation) * row),
                          cellSize,
                          cellSize);                          
          }          
        }
      }

      ctx.closePath();
    },

    drawNextPieces: function(nextPieces) {
      ctx.beginPath();

      ctx.fillStyle = colors.text;

      for (var piece = 0; piece < nextPieces.length; piece++) {
        drawPieceByPos(nextPieces[piece], 
          { x: nextPiecesPosition.x + piece * (4 * cellSize + pieceSeparation),
            y: nextPiecesPosition.y });        
      }

      ctx.closePath();
    },

    drawTitle: function(text) {
      ctx.font = "32px boldYear";
      ctx.fillStyle = colors.text;
      ctx.textBaseline = "top";
      ctx.fillText(text, boardPosition.x + textOffset.x, boardPosition.y + textOffset.y);
    }, 

    drawLineCounter: function(text) {
      ctx.font = "28px boldYear";
      ctx.fillStyle = colors.text;
      ctx.textBaseline = "top";
      ctx.fillText(text, lineCounterPosition.x, lineCounterPosition.y);
    },

    drawLevel: function(text) {
      ctx.font = "28px boldYear";
      ctx.fillStyle = colors.text;
      ctx.textBaseline = "top";
      ctx.fillText(text, levelPosition.x, levelPosition.y);
    },

    drawRetainerText: function(text) {
      ctx.font = "22px boldYear";
      ctx.fillStyle = colors.text;
      ctx.textBaseline = "top";
      ctx.fillText(text, retainerTextPosition.x, retainerTextPosition.y);
    },

    drawNextPiecesText: function(text) {
      ctx.font = "22px boldYear";
      ctx.fillStyle = colors.text;
      ctx.textBaseline = "top";
      ctx.fillText(text, nextPiecesTextPosition.x, nextPiecesTextPosition.y);
    }
  }
}();
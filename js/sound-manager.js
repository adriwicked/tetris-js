var SoundManager = function() {
  var poolSize = 5;

  var moveSoundPool = [];
  var currentMoveSound = 0;
  for (var i = 0; i < poolSize; i++) {
    moveSoundPool.push(new Sound("./res/move.wav"));
  }

  var rotateSoundPool = [];
  var currentRotateSound = 0;
  for (var i = 0; i < poolSize; i++) {
    rotateSoundPool.push(new Sound("./res/rotate.wav"));
  }

  var dropSoundPool = [];
  var currentDropSound = 0;
  for (var i = 0; i < poolSize; i++) {
    dropSoundPool.push(new Sound("./res/drop.wav"));
  }

  var levelUp = new Sound("./res/level-up.wav");

  return {
    move: function () {
      moveSoundPool[currentMoveSound].play();
      currentMoveSound = currentMoveSound < poolSize - 1 ? currentMoveSound + 1 : 0;         
    },

    rotate: function () {
      rotateSoundPool[currentRotateSound].play();
      currentRotateSound = currentRotateSound < poolSize - 1 ? currentRotateSound + 1 : 0;         
    },

    levelUp: function() {
      levelUp.play();
    }, 
    
    drop: function () {
      dropSoundPool[currentDropSound].play();
      currentDropSound = currentDropSound < poolSize - 1 ? currentDropSound + 1 : 0;         
    }
  }
}();

function Sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function() {
    this.sound.play();
  }
  this.stop = function() {
    this.sound.pause();
  }
}
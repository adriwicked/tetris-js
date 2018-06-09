var SoundManager = function() {
  var poolSize = 5;

  var moveSoundPool = [];
  var currentMoveSound = 0;
  for (var i = 0; i < poolSize; i++) {
    moveSoundPool.push(new Sound("./res/tick.wav"));
  }

  var dropSoundPool = [];
  var currentDropSound = 0;
  for (var i = 0; i < poolSize; i++) {
    dropSoundPool.push(new Sound("./res/swishes/swish-7.wav"));
  }

  var tickSound = new Sound("./res/tick.mp3");

  return {
    move: function () {
      moveSoundPool[currentMoveSound].play();
      currentMoveSound = currentMoveSound < poolSize - 1 ? currentMoveSound + 1 : 0;         
    },

    tick: function() {
      // tickSound.play();
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
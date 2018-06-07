function Shaker() {
  this.intervalID = undefined;
  this.duration = 300;
  this.frequency = 40;
  this.amplitude = 4;
  this.sampleCount = (this.duration / 1000) * this.frequency;
  this.samples = [];
}

Shaker.prototype.shakeSomething = function(position) {
  this.init();
  
  var startTime = new Date().getTime();
  var currentTime = 0;
  var originPositionX = position.x;
  var originPositionY = position.y;
  
  if (!this.intervalID) {
    this.intervalID = setInterval(function() {

      // Time handling
      currentTime = new Date().getTime() - startTime;
      if (currentTime >= this.duration) {
        position.x = originPositionX;
        position.y = originPositionY;
        this.stopShake();
      }
  
      // Shake logic
      position.x = originPositionX + this.getAmplitude(currentTime);
      position.y = originPositionY + this.getAmplitude(currentTime);
  
    }.bind(this), 32);
  }
}

Shaker.prototype.stopShake = function() {
  clearInterval(this.intervalID);
  this.intervalID = undefined;
  this.samples = [];
}

Shaker.prototype.init = function() {
  for(var i = 0; i < this.sampleCount; i++) {
    this.samples.push(Math.random() * 2 - 1);
  }      
}

Shaker.prototype.getAmplitude = function(t)
{
  // Check if optional param was passed
  if(t == undefined) {
    // return zero if we are done shaking
    if(!this.isShaking) return 0;
    t = this.t;
  }
  
  // Get the previous and next sample
  var s = t / 1000 * this.frequency;
  var s0 = Math.floor(s);
  var s1 = s0 + 1;
  
  // Return the current amplitide 
  return this.getSample(s0) + (s - s0)*(this.getSample(s1) - this.getSample(s0)) * this.amplitude;
};

Shaker.prototype.getSample = function(s)
{
  // Retrieve the randomized value from the samples
  if(s >= this.samples.length) return 0;
  return this.samples[s];
};
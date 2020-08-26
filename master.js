var particles = [],
    freq = 0.1,        // regulates frequency of new particles [0, 1)
    gravity = 0.3;

var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');

var requestAnimationFrame = window.requestAnimationFrame || 
    window.mozRequestAnimationFrame || 
    window.webkitRequestAnimationFrame || 
    window.msRequestAnimationFrame;

function log(s) {
  console.log(s);
}

function scale(num, in_min, in_max, out_min, out_max) {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function point(x, y, r){
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI, true);
    ctx.fill();
    //ctx.stroke();
    ctx.closePath();
}

function random(min = 0, max = 1) {
    return Math.random() * (max - min) + min;
}

function init() {
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;
    
  canvas.setAttribute('width', WIDTH);
  canvas.setAttribute('height', HEIGHT);
  
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.beginPath();
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  ctx.closePath();

  ctx.fillStyle = 'white';
  
  ani();
}

function ani() {
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.globalAlpha = 0.1;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.restore();
    ctx.fillStyle = 'white';
        
    if (Math.random() < .15) {
        particles.push(new Particle([Math.random() * WIDTH, HEIGHT], [0, -random(10, 18)]));
    }
    for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.applyForce([0, gravity]);
        p.update();
        p.show();
    }

    requestAnimationFrame(ani);
}

init();
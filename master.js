var particles = [],
    freq = 0.075,         // regulates frequency of new particles [0, 1)
    gravity = 0.3,
    drop = 0.2,
    children = [],
    n = 100,              // number of children particles on explosion
    velMin = 0.015,
    velMax = 0.025,
    h = 50,
    s = 1,
    v = 1,
    colShift = 5;

var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');

var requestAnimationFrame = window.requestAnimationFrame || 
    window.mozRequestAnimationFrame || 
    window.webkitRequestAnimationFrame || 
    window.msRequestAnimationFrame;

function init() {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
        
    canvas.setAttribute('width', WIDTH);
    canvas.setAttribute('height', HEIGHT);

    var counter = 0;

    window.onmousemove = function(e) {
        var pos = new Vector(e.clientX, e.clientY);

        counter++;

        if (counter % 20 == 0) {
            particles.push(new Particle(pos, new Vector(0, 0), HSVtoRGB(scale(h%255, 0, 255, 0, 1), s, v)));
        }
    };

    canvas.addEventListener('click', function(e) {
        var pos = new Vector(e.clientX, e.clientY);

        particles.push(new Particle(pos, new Vector(0, 0), HSVtoRGB(scale(h%255, 0, 255, 0, 1), s, v)));
    })
    
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

    if (particles.length == 0) {
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
    }

    var ct = HSVtoRGB(scale(h%255, 0, 255, 0, 1), s, v);
        
    if (Math.random() < freq) {
        particles.push(new Particle(new Vector(Math.random() * WIDTH, HEIGHT), new Vector(random(-3, 3), -random(HEIGHT * velMin, HEIGHT * velMax)), ct));
        h += colShift;
    }

    for (var i = 0; i < particles.length; i++) {
        var p = particles[i];

        if (p.pos.y > HEIGHT + random(100, 200)) {
            particles.splice(i, 1);
            continue;
        }

        p.applyForce(new Vector(0, gravity));
        p.update();

        if (p.vel.y < 0 && !p.exploded) {
            p.show();
        } else if (!p.exploded) {
            p.explode(n);
            p.exploded = true;
        } else {
            for (var j = 0; j < n; j ++) {
                p.children[j].applyForce(new Vector(0, gravity * drop));
                p.children[j].update();
                p.children[j].show();
            }
        }
    }

    requestAnimationFrame(ani);
}

init();
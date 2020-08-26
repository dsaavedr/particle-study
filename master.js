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
        
    if (Math.random() < freq) {
        particles.push(new Particle([Math.random() * WIDTH, HEIGHT], [random(-3, 3), -random(HEIGHT * velMin, HEIGHT * velMax)], HSVtoRGB(scale(h%255, 0, 255, 0, 1), s, v)));
        h += colShift;
    }

    for (var i = 0; i < particles.length; i++) {
        var p = particles[i];

        if (p.pos[1] > HEIGHT + 100) {
            particles.splice(i, 1);
            continue;
        }

        p.applyForce([0, gravity]);
        p.update();

        if (p.vel[1] < 0 && !p.exploded) {
            p.show();
        } else if (!p.exploded) {
            p.explode(n);
            /* for (var j = 0; j < n; j ++) {
                var temp = p.pos.slice();
                children.push(new Particle(temp, [
                    random(-5, 5),
                    random(-6, 2)
                ], 2));
                p.children.push(new Particle(p.pos, [
                    Math.random() * 6 - 3,
                    Math.random() * -8
                ], 2));
            } */
            p.exploded = true;
        } else {
            for (var j = 0; j < n; j ++) {
                p.children[j].applyForce([0, gravity * drop]);
                p.children[j].update();
                p.children[j].show();
            }
        }
    }

    /* for (var i = 0; i < children.length; i++) {
        c = children[i];
        c.applyForce([0, gravity * drop]);
        c.update();
        if (c.pos[1] > HEIGHT) {
            children.splice(i, 1);
            continue;
        }
        c.show();
    } */

    requestAnimationFrame(ani);
}

init();
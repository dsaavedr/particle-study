class Particle {
    constructor(pos, vel, r = 5) {
        this.pos = pos;
        this.acc = [0, 0];
        this.vel = vel;
        this.r = r;
    }

    applyForce(force) {
        this.acc = force;
    }

    update() {
        this.vel[0] += this.acc[0];
        this.vel[1] += this.acc[1];
        this.pos[0] += this.vel[0];
        this.pos[1] += this.vel[1];
        this.acc = 0;
    }

    show() {
        point(this.pos[0], this.pos[1], this.r);
    }

    explode(n) {
        var particles = [];
        for (var i = 0; i < n; i++) {

        }
    }
}
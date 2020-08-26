class Particle {
    constructor(pos, vel, c = 'white', r = 4) {
        this.pos = pos;
        this.acc = [0, 0];
        this.vel = vel;
        this.r = r;
        this.children = [];
        this.exploded = false;
        this.c = c;
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
        point(this.pos[0], this.pos[1], this.c, this.r);
    }

    explode(n) {
        for (var i = 0; i < n; i++) {
            var temp = this.pos.slice();
            this.children.push(new Particle(temp, [
                random(-3, 3),
                random(-4, 2)
            ], this.c, 2));
        }
    }
}
const RANGE = 5;
const SPEED = 1;
const VELCHANGE = 0.1;

class Target {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, SPEED).rotate(random(2 * PI));
    }

    isContact() {
        for (let tri of tringles)
            if (Math.sqrt(Math.pow(tri.pos.x - this.pos.x, 2) + Math.pow(tri.pos.y - this.pos.y, 2)) < RANGE)
                return true;
        return false;
    }

    act() {
        this.pos.add(this.vel);
        if (Math.random() < VELCHANGE)
            this.vel.rotate(random(2 * PI));
    }

    show() {
        stroke(255);
        point(this.pos.x, this.pos.y);
    }
}
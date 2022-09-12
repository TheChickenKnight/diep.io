const RANGE = 5;
const SPEED = 1;
const VELCHANGE = 0.1;

class Target {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, SPEED).rotate(random(2 * PI));
        targets.push(this);
    }

    isContact() {
        for (let tri of tringles) {
            if (Math.sqrt(Math.pow(tri.pos.x - this.pos.x, 2) + Math.pow(tri.pos.y - this.pos.y, 2)) < RANGE) {
                let main = tringles[tringles.indexOf(tri)];
                main.brain.score++;
                return true;
            }
        }
        return false;
    }

    act() {
        this.pos.add(this.vel);
        if (Math.random() < VELCHANGE)
            this.vel.rotate(random(2 * PI));
        if (this.pos.x > WIDTH)
            this.pos.x = WIDTH
        else if (this.pos.x < 0)
            this.pos.x = 0;
        if (this.pos.y > HEIGHT)
            this.pos.y = HEIGHT;
        else if (this.pos.y < 0)
            this.pos.y = 0;
        this.show();
    }

    show() {
        stroke(255);
        ellipse(this.pos.x, this.pos.y, 5);
    }
}
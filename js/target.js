const RANGE = 5;
const SPEED = 1;
const VELCHANGE = 1;

class Target {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, SPEED).rotate(random(2 * PI));
        this.accel = this.vel.copy().setMag(VELCHANGE);
        targets.push(this);
    }

    isContact() {
        for (let tri of tringles) {
            if (Math.sqrt(Math.pow(tri.pos.x - this.pos.x, 2) + Math.pow(tri.pos.y - this.pos.y, 2)) < RANGE) {
                tringles[tringles.indexOf(tri)].brain.score++;
                return true;
            }
        }
        return false;
    }

    act() {
        this.pos.add(this.vel);
        if (Math.random() < VELCHANGE)
            this.accel.rotate(random(PI/8) - PI/16);
        this.vel.add(this.accel);
        if (this.vel.mag() > SPEED)
            this.vel.setMag(SPEED);
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
        stroke(255,0 ,0);
        ellipse(this.pos.x, this.pos.y, 5);
    }
}
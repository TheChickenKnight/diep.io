const MAX_SPEED = 5;
const RANDTWEAK = 0.07;

class Tringle {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.curVel = createVector(0, 0);
        this.dir = this.curVel;
        this.accel = createVector(0, 1).rotate(random(2 * PI));
        this.perp = createVector(this.curVel.y, -this.curVel.x);
        this.handling = 0.1;
        this.gaze = new Gaze(x, y, 3, this.dir);
    }

    act() {
        this.accel = createVector(target.pos.x - this.pos.x, target.pos.y - this.pos.y).normalize();
        this.velTune();
        this.pos.add(this.curVel);
        this.gaze.pos = this.pos;
        this.gaze.dir = this.dir;
        console.log(this.curVel)
    }

    velTune() {
        this.curVel.add(this.accel);
        if (this.curVel.mag() > MAX_SPEED)
            this.curVel.setMag(MAX_SPEED);
        if (Math.sqrt(Math.pow(target.pos.x - this.pos.x, 2) + Math.pow(target.pos.y - this.pos.y, 2)) < 10)
            this.curVel.setMag(this.curVel.mag()/1.5);
        if (Math.random() < RANDTWEAK)
            this.curVel.rotate(random(PI/8));
        this.dir = p5.Vector.normalize(this.accel);
    }

    show() {
        this.perp = createVector(this.dir.y, -this.dir.x);
        stroke(255);
        triangle(
          this.pos.x + this.dir.x, 
          this.pos.y + this.dir.y,
          this.pos.x - this.dir.x + this.perp.x, 
          this.pos.y - this.dir.y + this.perp.y, 
          this.pos.x - this.dir.x - this.perp.x, 
          this.pos.y - this.dir.y - this.perp.y
        );
        stroke(255, 0, 0);
        point(this.pos.x + this.dir.x, this.pos.y + this.dir.y)
        stroke(0, 255, 0);
        point(this.pos.x - this.dir.x + this.perp.x, this.pos.y - this.dir.y + this.perp.y)
        stroke(0, 0, 255);
        point(this.pos.x - this.dir.x - this.perp.x, this.pos.y - this.dir.y - this.perp.y)
        stroke(0);
        point(this.pos.x, this.pos.y);
        this.gaze.show()
      }
}
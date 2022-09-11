const MAX_SPEED = 5;
const RANDTWEAK = 0;

class Tringle {
    constructor(genome) {
        this.pos = createVector(random(width), random(height));
        this.curVel = createVector(0, 0);
        this.dir = this.curVel;
        this.accel = createVector(0, 1).rotate(random(2 * PI));
        this.perp = createVector(this.curVel.y, -this.curVel.x);
        this.handling = 1;
        this.gaze = new Gaze(x, y, 100, this.dir);
        this.brain = genome;
        this.oscillate = 0;
        this.chronometer = 0;
        this.seenTarget;
        tringles.push(this);
    }

    act() {
        let output = this.brain.activate(this.detect());
        this.accel.rotate(output[2] >= output[3] ? -1 : 1 * output[5]);
        this.velTune();
        if (output[0] >= output[1])
            this.pos.add(this.curVel);
        else
            this.pos.sub(this.curVel);
        if (output[4])
            this.chronometer = 0;
        this.gaze.pos = this.pos;
        this.gaze.dir = this.dir;
    }

    detect() {
        let newTargets = targets.filter(one => this.gaze.isWithin(createVector(one.pos.x - this.pos.x, one.pos.y - this.pos.y)));
        if (newTargets.length != 0) {
            let isSame = false;
            for (let close of newTargets) 
                if (close == this.seenTarget)
                    isSame = true;
            if (!isSame) 
                this.seenTarget = newTargets[0];
        }
        if (this.oscillate = 0)
            this.oscillate = 1;
        else
            this.oscillate = 0;
        this.chronometer += 0.1;
        return [
            this.pos.x,
            this.pos.y,
            this.curVel.heading(),
            this.curVel.mag(),
            this.accel.heading(),
            Math.sqrt(Math.pow(this.seenTarget.pos.x - this.pos.x, 2) + Math.pow(this.seenTarget.pos.y - this.pos.y, 2)),
            createVector(this.pos.x - this.seenTarget.pos.x, this.pos.y - this.seenTarget.pos.y).heading(),
            this.oscillate,
            this.chronometer
        ]
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

    /*accelTune() {
        let targetAngle = createVector(target.pos.x - this.pos.x, target.pos.y - this.pos.y).normalize();
        const angle = this.accel.angleBetween(targetAngle);
        if (angle > 0.1) {
            this.accel.rotate(this.handling);
            if (this.accel.angleBetween(targetAngle) < -0.1)
                this.accel = targetAngle;
        } else if (angle < -0.1) {
            this.accel.rotate(this.handling);
            if (this.accel.angleBetween(targetAngle) > 0.1)
                this.accel = targetAngle;
        }
      }*/

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
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
        this.gaze = new Gaze(this.pos.x, this.pos.y, 100, this.dir);
        this.brain = genome;
        this.brain.score = 0;
        this.oscillate = 0;
        this.chronometer = 0;
        this.seenTarget;
        this.seenTwingle;
        tringles.push(this);
    }

    act() {
        let input = this.detect();
        let output = this.brain.activate(input);
        this.accel.rotate((output[2] >= output[3] ? -1 : 1) * output[5]);
        this.velTune();
        if (output[7] < output[2] && output[7] < output[3]) 
            this.accel.rotate((output[2] > output[3] ? 1 : -1) * Math.abs(output[5]));
        if (output[6] < output[0] && output[6] < output[1]) {
            if (output[0] > output[1])
                this.pos.add(this.curVel);
            else 
                this.pos.sub(this.curVel);
        }
        if (output[4])
            this.chronometer = 0;
        this.gaze.pos = this.pos;
        this.gaze.dir = this.dir;
        if (this.pos.x > WIDTH)
            this.pos.x = WIDTH
        else if (this.pos.x < 0)
            this.pos.x = 0;
        if (this.pos.y > HEIGHT)
            this.pos.y = HEIGHT;
        else if (this.pos.y < 0)
            this.pos.y = 0;
    }

    detect() {
        let newTargets = targets.filter(one => this.gaze.isWithin(createVector(one.pos.x - this.pos.x, one.pos.y - this.pos.y)));
        let closeTwingles = tringles.filter(one => this.gaze.isWithin(createVector(one.pos.x - this.pos.x, one.pos.y - this.pos.y)));
        if (newTargets.length != 0) {
            let isSame = false;
            for (let close of newTargets) 
                if (close == this.seenTarget)
                    isSame = true;
            if (!isSame) 
                this.seenTarget = newTargets[0];
        }
        if (closeTwingles.length != 0) {
            let isSame = false;
            for (let close of closeTwingles) 
                if (close == this.seenTwingle)
                    isSame = true;
            if (!isSame) 
                this.seenTwingle = closeTwingles[0];
        }
        if (this.oscillate == 0)
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
            this.seenTarget ? Math.sqrt(Math.pow(this.seenTarget.pos.x - this.pos.x, 2) + Math.pow(this.seenTarget.pos.y - this.pos.y, 2)) : 0,
            this.seenTarget ? createVector(this.pos.x - this.seenTarget.pos.x, this.pos.y - this.seenTarget.pos.y).heading() : 0,
            this.seenTwingle ? Math.sqrt(Math.pow(this.seenTwingle.pos.x - this.pos.x, 2) + Math.pow(this.seenTwingle.pos.y - this.pos.y, 2)) : 0,
            this.seenTwingle ? createVector(this.pos.x - this.seenTwingle.pos.x, this.pos.y - this.seenTwingle.pos.y).heading() : 0,
            Math.sin(iteration),
            this.chronometer
        ]
    }

    velTune() {
        this.curVel.add(this.accel);
        if (this.curVel.mag() > MAX_SPEED)
            this.curVel.setMag(MAX_SPEED);
        if (Math.random() < RANDTWEAK)
            this.curVel.rotate(random(PI/8));
        this.dir = this.accel.copy();
        this.dir.normalize();
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
        //this.gaze.show()
      }

      graph(x, y) {
        drawGraph(this.brain.graph(x, y), '.draw', false);
      }
}
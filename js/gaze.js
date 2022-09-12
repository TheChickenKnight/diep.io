class Gaze {
    constructor(x, y, r, dir) {
        this.radius = r;
        this.width = PI/4;
        this.pos = createVector(x, y);
        this.dir = dir;
        this.left = this.dir.copy();
        this.right = this.dir.copy();
    }

    isWithin(testAngle) {
        let a = this.left.heading();
        let b = this.right.heading();
        a -= testAngle.heading();
        b -= testAngle.heading();
        return a * b >= 0 ? false : (Math.abs( a - b ) < PI && this.radius >= testAngle.mag());
    }

    show() {
        this.left = this.dir.copy();
        this.left.rotate(this.width/2);
        this.left.setMag(this.radius);
        this.right = this.dir.copy();
        this.right.rotate(-this.width/2);
        this.right.setMag(this.radius);
        stroke(100);
        fill(100);
        //arc(this.pos.x, this.pos.y, this.radius*2, this.radius*2, this.right.heading(), this.left.heading(), )
    }
}
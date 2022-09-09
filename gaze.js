class Gaze {
    constructor(x, y, r, dir) {
        this.radius = r;
        this.width = 1;
        this.pos = createVector(x, y);
        this.dir = dir;
    }


    show() {
        let left = this.dir;
        left.rotate(PI/4);
        left.setMag(this.radius);
        let right = this.dir;
        right.rotate(PI/4);
        right.setMag(this.radius);
        stroke(255);
        line(this.pos.x, this.pos.y, this.pos.x + left.x, this.pos.y + left.y);
        line(this.pos.x, this.pos.y, this.pos.x + right.x, this.pos.y + right.y);
    }
}
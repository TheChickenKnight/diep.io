const FPS = 1000000000000000000000000000;
const tringles = [];
let target;

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(FPS);
    for (let i = 0; i < 100; i++)
        tringles.push(new Tringle(random(width), random(height)));
    target = new Target(random(width), random(height));
}

function draw() {
    background(0);
    tringles.forEach(tri => {
        tri.show();
        tri.act();
    });
    target.act();
    target.show();
    if (target.isContact())
        target = new Target(random(width), random(height)); 
}
const FPS = 10;
let tringles = [];
let highestScore = 0;
let targets = [];
let neat;

function setup() {
    console.log(tringles);
    createCanvas(windowWidth, windowHeight);
    frameRate(FPS);
    initNeat();
    for (let i = 0; i < 50; i++)
        new Target(random(width), random(height));
    console.log(tringles);
    startEval();
    console.log(tringles);
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
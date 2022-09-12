const FPS = 10;
let tringles = [];
let highestScore = 0;
let targets = [];
let neat;
let iteration = 0

function setup() {
    HEIGHT = windowHeight;
    WIDTH = windowWidth;
    createCanvas(windowWidth, windowHeight);
    frameRate(FPS);
    initNeat();
    for (let i = 0; i < 50; i++)
        new Target(random(width), random(height));
    startEval();
}

function draw() {
    iteration++;
    background(0);
    if(iteration == ITERATIONS){
      endEval();
      iteration = 0;
    }
    tringles.forEach(tri => {
      tri.act();
      tri.show();
    });
    targets.forEach(target => {
      target.act();
      if (target.isContact()) {
        targets.splice(targets.indexOf(target), 1)
        new Target(random(width), random(height)); 
      }
    });
}
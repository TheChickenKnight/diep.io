const FPS = Number.MAX_SAFE_INTEGER;
var tringles = [];
var highestScore = 0;
var targets = [];
var neat;
var iteration = 0
var chart;

function setup() {
    HEIGHT = windowHeight;
    WIDTH = windowWidth;
    createCanvas(windowWidth, windowHeight);
    frameRate(FPS);
    initNeat();
    chart = new Chart(document.getElementById('myChart'), {
      type: "line",
      data: {
        labels: [],
        datasets: [
          {
            label: 'Average',
            data: [],
            fill: false,
            borderColor: 'rgb(255, 255, 0)',
            tension: 0.1
          },
          {
            label: 'Best',
            data: [],
            fill: false,
            borderColor: 'rgb(0, 255, 0)',
            tension: 0.1
          },
          {
            label: 'Worst',
            data: [],
            fill: false,
            borderColor: 'rgb(255, 0, 0)',
            tension: 0.1
          }
        ]
      }
    });
    for (let i = 0; i < 100; i++)
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
      tri.show(1);
    });
    targets.forEach(target => {
      target.act();
      if (target.isContact()) {
        targets.splice(targets.indexOf(target), 1)
        new Target(random(width), random(height)); 
      }
    });
}
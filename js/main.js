
var Neat = neataptic.Neat;
var Methods = neataptic.Methods;
var Config  = neataptic.Config;
var Architect = neataptic.Architect;

var WIDTH;
var HEIGHT;
var FOOD_AMOUNT      = Math.round(WIDTH * HEIGHT * 1e-3);

// GA settings
var PLAYER_AMOUNT     = 100;
var ITERATIONS        = 300;
var START_HIDDEN_SIZE = 1;
var MUTATION_RATE     = 1000000;
var ELITISM_PERCENT   = 0.1;

Config.warnings = false;


function initNeat() {
  Config.warnings = false;
  neat = new Neat(
        7,
        2,
        null,
        {
            mutation: [
              Methods.Mutation.ADD_NODE,
              Methods.Mutation.SUB_NODE,
              Methods.Mutation.ADD_CONN,
              Methods.Mutation.SUB_CONN,
              Methods.Mutation.MOD_WEIGHT,
              Methods.Mutation.MOD_BIAS,
              Methods.Mutation.MOD_ACTIVATION,
              Methods.Mutation.ADD_GATE,
              Methods.Mutation.SUB_GATE,
              Methods.Mutation.ADD_SELF_CONN,
              Methods.Mutation.SUB_SELF_CONN,
              Methods.Mutation.ADD_BACK_CONN,
              Methods.Mutation.SUB_BACK_CONN
            ],
            popsize: PLAYER_AMOUNT,
            mutationRate: MUTATION_RATE,
            elitism: Math.round(ELITISM_PERCENT * PLAYER_AMOUNT),
            network: new Architect.Random(
              7,
              START_HIDDEN_SIZE,
              2
            )
          },
    );
}

function startEval() {

  tringles = [];
  for (var genome in neat.population) {
    genome = neat.population[genome];
    new Tringle(genome);
  }
  //tringles[0].graph(1000, 1000);
}

function endEval() {
    let avg = 0;
    let best = 0;
    let worst = neat.population[0].score;
    for (let brain of neat.population) {
      avg += brain.score;
      if (brain.score > best)
        best = brain.score;
      else if (brain.score < worst)
        worst = brain.score;
    }
    avg /= neat.population.length;
    chart.data.labels.push(neat.generation);
    chart.data.datasets[0].data.push(avg);
    chart.data.datasets[1].data.push(best);
    chart.data.datasets[2].data.push(worst);
    chart.update();
    console.log("Gen " + neat.generation +  " Average: " + avg)
    neat.sort();
    let newPopulation = [];
  
    for(let i = 0; i < neat.elitism; i++)
      newPopulation.push(neat.population[i]);
  
    for(let i = 0; i < neat.popsize - neat.elitism; i++)
      newPopulation.push(neat.getOffspring());
  
    neat.population = newPopulation;
    neat.mutate();
  
    neat.generation++;
    startEval();
}
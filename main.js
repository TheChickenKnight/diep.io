function initNeat() {
    neat = new neataptic.Neat(
        9,
        5,
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
              9,
              START_HIDDEN_SIZE,
              5
            )
          },
    );
}

function startEval() {
    for (var genome in neat.population) {
        genome = neat.population[genome];
        new Tringle(genome);
    }
}

function endEval() {
    console.log('Generation:', neat.generation, '- average score:', neat.getAverage());
    neat.sort();
    let newPopulation = [];
  
    for(let i = 0; i < neat.elitism; i++){
      newPopulation.push(neat.population[i]);
    }
  
    for(let i = 0; i < neat.popsize - neat.elitism; i++){
      newPopulation.push(neat.getOffspring());
    }
  
    neat.population = newPopulation;
    neat.mutate();
  
    neat.generation++;
    startEval();
}
/*

Chapter 7: Measuring a Robot

It’s hard to objectively compare robots by just letting them solve a few scenarios. 
Maybe one robot just happened to get easier tasks, or the kind of tasks that it is 
good at, whereas the other didn’t.

Write a function compareRobots which takes two robots (and their starting memory). 
It should generate a hundred tasks, and let each of the robots solve each of these 
tasks. When done, it should output the average number of steps each robot took per 
task.

For the sake of fairness, make sure that you give each task to both robots, rather 
than generating different tasks per robot.

function compareRobots(robot1, memory1, robot2, memory2) {
  // Your code here
}

compareRobots(routeRobot, [], goalOrientedRobot, []);

*/

//Chapter 7 Proejct Code from book

var roads = [
  "Alice's House-Bob's House", "Alice's House-Cabin",
  "Alice's House-Post Office", "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop", "Marketplace-Farm",
  "Marketplace-Post Office", "Marketplace-Shop",
  "Marketplace-Town Hall", "Shop-Town Hall"
];

function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if ((graph[from] === null) || (graph[from] === undefined)) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  for (let [from, to] of edges.map(r => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

var roadGraph = buildGraph(roads);

function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

var VillageState = class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels.map(p => {
        if (p.place !== this.place) { return p; }
        return {place: destination, address: p.address};
      }).filter(p => p.place !== p.address);
      return new VillageState(destination, parcels);
    }
  }

  random(parcelCount = 5) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
      let address = randomPick(Object.keys(roadGraph));
      let place;
      do {
        place = randomPick(Object.keys(roadGraph));
      } while (place === address);
      parcels.push({place, address});
    }
    return new VillageState("Post Office", parcels);
  }
};

//runRobot modified as part of the exercise solution to return the number of 
//turns needed to complete the route, instead of logging to console
function runRobot(state, robot, memory) {
  let turn = 0;
  for (turn = 0;; turn++) {
    if (state.parcels.length === 0) {
      //console.log(`Done in ${turn} turns`);
      break;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    //console.log(`Moved to ${action.direction}`);
  }
  return turn;
}

function randomRobot(state) {
  return {direction: randomPick(roadGraph[state.place])};
}

var mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
];

function routeRobot(state, memory) {
  if (memory.length === 0) {
    memory = mailRoute;
  }
  return {direction: memory[0], memory: memory.slice(1)};
}

function findRoute(graph, from, to) {
  let work = [{at: from, route: []}];
  for (let i = 0; i < work.length; i++) {
    let {at, route} = work[i];
    for (let place of graph[at]) {
      if (place === to) { return route.concat(place); }
      if (!work.some(w => w.at === place)) {
        work.push({at: place, route: route.concat(place)});
      }
    }
  }
}

function goalOrientedRobot({place, parcels}, route) {
  if (route.length === 0) {
    let parcel = parcels[0];
    if (parcel.place !== place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return {direction: route[0], memory: route.slice(1)};
}

//Exercise solution code below
function calculateAverage(total, numberOfInstances) {
  let average = total / numberOfInstances;
  return average;
}

function compareRobots(robot1, memory1, robot2, memory2) {
  const NUMBER_OF_TASKS = 100;
  let turn_counts = {robot1: 0, robot2: 0};
  let average_robot1 = 0;
  let average_robot2 = 0;
  for(let counter = 0; counter < NUMBER_OF_TASKS; counter++) {
    let villageState = (new VillageState).random();
    turn_counts.robot1 += runRobot(villageState, robot1, memory1);
    turn_counts.robot2 += runRobot(villageState, robot2, memory2);
  }

  average_robot1 = calculateAverage(turn_counts.robot1, NUMBER_OF_TASKS);
  average_robot2 = calculateAverage(turn_counts.robot2, NUMBER_OF_TASKS);

  console.log("Robot1: " + average_robot1);
  console.log("Robot2: " + average_robot2);
}

compareRobots(routeRobot, [], goalOrientedRobot, []);

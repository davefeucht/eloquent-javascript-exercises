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

const data = require('./data.js');
const utils = require('./utils.js');
const classes = require('./classes.js');

var roadGraph = utils.buildRoadMap(data.roads);

//Exercise solution code below
function compareRobots(robot1, memory1, robot2, memory2) {
    const NUMBER_OF_TASKS = 100;
    const turn_counts = {robot1: 0, robot2: 0};
    let average_robot1 = 0;
    let average_robot2 = 0;
    for(let counter = 0; counter < NUMBER_OF_TASKS; counter++) {
        let villageState = (new classes.VillageState(null, null, roadGraph)).random();
        turn_counts.robot1 += utils.runRobot(villageState, robot1, memory1, roadGraph);
        turn_counts.robot2 += utils.runRobot(villageState, robot2, memory2, roadGraph);
    }

    average_robot1 = utils.calculateAverage(turn_counts.robot1, NUMBER_OF_TASKS);
    average_robot2 = utils.calculateAverage(turn_counts.robot2, NUMBER_OF_TASKS);

    console.log("Robot1: " + average_robot1);
    console.log("Robot2: " + average_robot2);
}

compareRobots(utils.routeRobot, [], utils.goalOrientedRobot, []);

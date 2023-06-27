const data = require('./data');

/**
 * Returns a random element of a given array
 * @param {array} array 
 * @returns {any} Randomly chosen element of provided array
 */
function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

/**
 * Calculates average value based on a total and a number of elements
 * @param {number} total 
 * @param {number} numberOfInstances 
 * @returns Average value
 */
function calculateAverage(total, numberOfInstances) {
    const average = total / numberOfInstances;
    return average;
}

/**
 * Takes an array of road strings in format <Place>-<Place> and splits them into a graph
 * describing all the edges between places
 * @param {array} roads 
 * @returns 
 */
const buildRoadMap = (roads) => {
    // A map of From nodes with an array of To values
    const roadMap = new Map();

    const addRoute = (from, to) => {
        roadMap.get(from).push(to);
    };

    roads.forEach(road => {
        const [from, to] = road.split('-');
        if (!roadMap.has(from)) {
            roadMap.set(from, []);
        }
        if (!roadMap.has(to)) {
            roadMap.set(to, []);
        }
        addRoute(from, to);
        addRoute(to, from);
    });

    return roadMap;
}

/**
 * Finds a route in a graph from 'from' to 'to'
 * @param {Map} graph 
 * @param {string} from 
 * @param {string} to 
 * @returns {array} Array of strings which represent the nodes in the path taken
 */
function findRoute(graph, from, to) {
    const work = [{currentLocation: from, route: []}];
    for (let i = 0; i < work.length; i++) {
        let {currentLocation, route} = work[i];
        for (let neighbor of graph.get(currentLocation)) {
            if (neighbor === to) {
                return route.concat(neighbor);
            }
            if (!work.some(w => w.currentLocation === neighbor)) {
                work.push({currentLocation: neighbor, route: route.concat(neighbor)});
            }
        };
    }
}

/**
 * Finds the parcel whose destination is closest to its source in a graph
 * @param {Map} graph 
 * @param {array} parcels 
 * @returns {Object} Parcel object which has the shortest route for delivery
 */
function findNearestParcel(graph, parcels) {
    const routes = parcels
        .map((parcel, index) => {
            return { parcelIndex: index, route: findRoute(graph, parcel.address, parcel.place) }
        })
        .sort((a, b) => {
            if (a.route.length < b.route.length) {
                return -1;
            } else if (a.route.length > b.route.length) {
                return 1;
            } else {
                return 0;
            }
        })

    return parcels[routes[0].parcelIndex];
}

//runRobot modified as part of the exercise solution to return the number of 
//turns needed to complete the route, instead of logging to console
function runRobot(state, robot, memory, roadGraph) {
    let turn = 0;
    for (turn = 0;; turn++) {
        if (state.parcels.length === 0) {
            break;
        }
        let action = robot({
            state,
            memory,
            roadGraph
        });
        state = state.move(action.direction);
        memory = action.memory;
    }
    return turn;
}

function routeRobot({ memory }) {
    if (memory.length === 0) {
        memory = data.mailRoute;
    }
    return {direction: memory[0], memory: memory.slice(1)};
}

function goalOrientedRobot({ state, memory, roadGraph }) {
    const { place, parcels } = state;
    if (memory.length === 0) {
        let parcel = parcels[0];
        if (parcel.place !== place) {
            memory = findRoute(roadGraph, place, parcel.place);
        } else {
            memory = findRoute(roadGraph, place, parcel.address);
        }
    }
    return {direction: memory[0], memory: memory.slice(1)};
}

function allNewRobot({ state, memory, roadGraph }) {
    const { place, parcels } = state;
    if (memory.length === 0) {
        let parcel = findNearestParcel(roadGraph, parcels);
        if (parcel.place !== place) {
            memory = findRoute(roadGraph, place, parcel.place);
        } else {
            memory = findRoute(roadGraph, place, parcel.address);
        }
    }
    return {direction: memory[0], memory: memory.slice(1)};
}

let deepEqual = function(value1, value2) {
    let equal = false;
    let value1IsObject = false;
    let value2IsObject = false;
   
    if(typeof(value1) === "object" && value1 !== null) {
        value1IsObject = true;
    }
  
    if(typeof(value2) === "object" && value2 !== null) {
        value2IsObject = true;
    }
  
    if(!value1IsObject && !value2IsObject) {
        equal = (value1 === value2); 
    }
  
    if((value1IsObject && !value2IsObject) || (!value1IsObject && value2IsObject)) {
        equal = false;
    }
  
    if(value1IsObject && value2IsObject) {
        let keysObject1 = Object.keys(value1);
        let keysObject2 = Object.keys(value2);
  
        if(keysObject1.length !== keysObject2.length) {
            equal = false;
        }
        else { 
            for(let i = 0; i < keysObject1.length; i++) {
                if(!keysObject2.includes(keysObject1[i])) {
                    equal = false;
                    break;
                }
                else {
                    equal = deepEqual(value1[keysObject1[i]], value2[keysObject2[i]]); 
                    if(!equal) {
                        break;
                    }
                }
            }
        }
    }
  
    return equal;
};

module.exports = {
    randomPick,
    calculateAverage,
    buildRoadMap,
    findRoute,
    runRobot,
    routeRobot,
    goalOrientedRobot,
    allNewRobot,
    deepEqual
};

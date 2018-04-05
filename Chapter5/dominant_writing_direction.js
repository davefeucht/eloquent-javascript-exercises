/*

Chapter 5: Dominant Writing Direction

Write a function that computes the dominant writing direction in a string of text. Remember that 
each script object has a direction property that can be "ltr" (left-to-right), "rtl" (right-to-left), 
or "ttb" (top-to-bottom).

The dominant direction is the direction of a majority of the characters that have a script associated 
with them. The characterScript and countBy functions defined earlier in the chapter are probably useful 
here.

function dominantDirection(text) {
  // Your code here.
}

console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl

*/

//Include the data on the different writing scripts
let SCRIPTS = require("./scripts.js");

//Functions defined in Chapter 5
function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let name = groupName(item);
    let known = counts.findIndex(c => c.name === name);
    if (known === -1) {
      counts.push({name, count: 1});
    } else {
      counts[known].count++;
    }
  }
  return counts;
}

function characterScript(code) {
  for (let script of SCRIPTS) {
    if (script.ranges.some(([from, to]) => {
      return code >= from && code < to;
    })) {
      return script;
    }
  }
  return null;
}

//Exercise code below
let findScriptByName = function(name) {
  let script_match = {};

  for(let script of SCRIPTS) {
    if(script.name === name) {
      script_match = script;
      break;
    }
  } 

  return(script_match);   
};

let findHighestCount = function(list) {
  let high_count = {name: undefined, count: 0}; 

  high_count = list.reduce((a,b) => (a.count > b.count ? a : b), 0);
  return high_count;
};

let dominantDirection = function(string) {
  let scripts = [];

  scripts = countBy(string, character => {
    let script = characterScript(character.codePointAt(0));
    return script ? script.name : "none";
  }).filter(({name}) => name !== "none");

  return findScriptByName(findHighestCount(scripts).name).direction;
};

console.log(dominantDirection("Hello!"));
console.log(dominantDirection("Hey, مساء الخير"));

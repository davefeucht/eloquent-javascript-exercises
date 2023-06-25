/*

Chapter 4: A List

Objects, as generic blobs of values, can be used to build all sorts of data structures. A common data 
structure is the list (not to be confused with array). A list is a nested set of objects, with the 
first object holding a reference to the second, the second to the third, and so on.

let list = {
  value: 1,
  rest: {
    value: 2,
    rest: {
      value: 3,
      rest: null
    }
  }
};

The resulting objects form a chain, like this:

A linked list
A nice thing about lists is that they can share parts of their structure. For example, if I create two 
new values {value: 0, rest: list} and {value: -1, rest: list} (with list referring to the binding defined 
earlier), they are both independent lists, but they share the structure that makes up their last three 
elements. The original list is also still a valid three-element list.

Write a function arrayToList that builds up a list structure like the one shown when given [1, 2, 3] as 
argument. Also write a listToArray function that produces an array from a list. Then add a helper function 
prepend, which takes an element and a list and creates a new list that adds the element to the front of 
the input list, and nth, which takes a list and a number and returns the element at the given position 
in the list (with zero referring to the first element) or undefined when there is no such element.

If you haven’t already, also write a recursive version of nth.

*/

let arrayToList = function(array) {
  let list = {};
  array.forEach((element, index) => {
    if (index === array.length - 1) {
        list = { value: element, rest: null };
    } else {
        const tempList = Object.assign({}, list);
        list = { value: element, rest: tempList };
    }
  });
  
  return list;
};

let listToArray = function(list) {
  let array = [];
  let counter = 0;
  
  for(let node = list; node; node = node.rest) {
    array[counter] = node.value;
    counter++; 
  } 
  return array;
};

let prepend = function(element, list) {
  let temp_list = element;
  
  temp_list.rest = list; 
  return temp_list;
};

let nth = function(list, number) {
  let counter = 0;
  let nth_node = undefined;

  for(let node = list; node; node = node.rest) {
    if(counter === number) {
      nth_node = node;
      break;
    }    
    else {
      counter++;
    }
  } 
 
  return nth_node;
};

let nthRecursive = function(list, number) {
  let return_list = {};
   
  if(number === 0) {
    Object.assign(return_list, list);
  } 
  else {
    Object.assign(return_list, nthRecursive(list.rest, (number - 1)));
  }

  return return_list;
};

console.log(arrayToList([10, 20]));
console.log(arrayToList([10, 20, 30]));
console.log("--------------");
console.log(prepend({value: 10, rest: null}, {value: 20, rest: {value: 30, rest: null}}));
console.log("--------------");
console.log(listToArray({value:10, rest: {value: 20, rest: null}}));
console.log(listToArray({value:10, rest: {value: 20, rest: {value: 30, rest: null}}}));
console.log("--------------");
console.log(nth({value: 10, rest: {value: 20, rest: {value: 30, rest: null}}}, 1));
console.log("--------------");
console.log(nthRecursive({value: 10, rest: {value: 20, rest: {value: 30, rest: null}}}, 2));

/*

Chapter 5: Flattening

Use the reduce method in combination with the concat method to “flatten” an array of arrays into a single array that has all the elements of the original arrays.

let arrays = [[1, 2, 3], [4, 5], [6]];
// Your code here.
// → [1, 2, 3, 4, 5, 6]

*/

let flatten = function(array) {
  return array.reduce((array1, array2) => array1.concat(array2));
}

let arrays = [[1,2,3], [4,5], [6]];
console.log(flatten(arrays));

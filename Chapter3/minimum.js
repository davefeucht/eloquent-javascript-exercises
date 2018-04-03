/*

Chapter 3: Minimum

The previous chapter introduced the standard function Math.min that returns its 
smallest argument. We can build something like that now. Write a function min that 
takes two arguments and returns their minimum.

*/

let min = function(x, y) {
  let minVal = 0;
  if(x < y) {
    minVal = x;
  }
  else {
    minVal = y;
  }
  
  return minVal;
};

console.log(min(1, 10));
console.log(min(0, -10));

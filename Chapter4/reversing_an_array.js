/*

Chapter 4: Reversing an Array

Arrays have a reverse method which changes the array by inverting the order in which its 
elements appear. For this exercise, write two functions, reverseArray and reverseArrayInPlace. 
The first, reverseArray, takes an array as argument and produces a new array that has the 
same elements in the inverse order. The second, reverseArrayInPlace, does what the reverse 
method does: it modifies the array given as argument by reversing its elements. Neither may 
use the standard reverse method.

Thinking back to the notes about side effects and pure functions in the previous chapter, 
which variant do you expect to be useful in more situations? Which one runs faster?

*/

let reverseArray = function(array) {
  let newArray = [];
  array.forEach(element => {
    newArray.unshift(element);
  });
  return newArray;
};

let reverseArrayInPlace = function(array) {
  let counter = 0;
  let tempArrayElement;
  
  // Determine the middle element of the array
  const middle = (array.length % 2 === 0 ? array.length / 2 : Math.floor(array.length / 2));
  // Loop from the end of the array to the middle
  for(let i = (array.length - 1); i > middle; i--) {
      // Get the first element of the array
      tempArrayElement = array[counter];
      // Write the last element of the array to the first element
      array[counter] = array[i];
      // Write the original first element to the last element
      array[i] = tempArrayElement;
      counter++;
  }

  return array;
};

let array_value = [1, 2, 3, 4, 5];
console.log(reverseArray(array_value));
console.log(reverseArrayInPlace(array_value));

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
  let new_array = [];
  for(let i = 0; i < array.length; i++) {
    new_array.unshift(array[i]);
  }
  return new_array;
};

let reverseArrayInPlace = function(array) {
  let counter = 0;
  let temp_array_element;
  
  if(array.length % 2 === 0) {
    for(let i = (array.length - 1); i > (array.length / 2); i--) {
      temp_array_element = array[counter];
      array[counter] = array[i];
      array[i] = temp_array_element;
      counter++;
    }
  }
  else {
    let middle = Math.floor(array.length / 2);
    for(let i = (array.length - 1); i > middle; i--) {
      temp_array_element = array[counter];
      array[counter] = array[i];
      array[i] = temp_array_element;
      counter++;
    }  
  }
  return array;
};

let array_value = [1, 2, 3, 4, 5];
console.log(reverseArray(array_value));
console.log(reverseArrayInPlace(array_value));

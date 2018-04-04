/*

Chapter 4: Deep Comparison

The == operator compares objects by identity. But sometimes you’d prefer to compare 
the values of their actual properties.

Write a function deepEqual that takes two values and returns true only if they are the 
same value or are objects with the same properties, where the values of the properties 
are equal when compared with a recursive call to deepEqual.

To find out whether to compare two things by identity (use the === operator for that) 
or by looking at their properties, you can use the typeof operator. If it produces "object" 
for both values, you should do a deep comparison. But you have to take one silly exception 
into account: because of a historical accident, typeof null also produces "object".

The Object.keys function will be useful when you need to go over the properties of objects 
to compare them.

*/

let deepEqual = function(value1, value2) {
  let equal = false;
  let value1_isObject = false;
  let value2_isObject = false;
 
  if(typeof(value1) === "object" && value1 !== null) {
    value1_isObject = true;
  }

  if(typeof(value2) === "object" && value2 !== null) {
    value2_isObject = true;
  }

  if(!value1_isObject && !value2_isObject) {
    equal = (value1 === value2); 
  }

  if((value1_isObject && !value2_isObject) || (!value1_isObject && value2_isObject)) {
    equal = false;
  }

  if(value1_isObject && value2_isObject) {
    let keys_object1 = Object.keys(value1);
    let keys_object2 = Object.keys(value2);

    if(keys_object1.length !== keys_object2.length) {
      equal = false;
    }
    else { 
      for(let i = 0; i < keys_object1.length; i++) {
        if(!keys_object2.includes(keys_object1[i])) {
          equal = false;
          break;
        }
        else {
          equal = deepEqual(value1[keys_object1[i]], value2[keys_object2[i]]); 
          if(!equal) {
            break;
          }
        }
      }
    }
  }

  return equal;
};

let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
console.log(deepEqual(obj, {here: 1, object: 2}));
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));

/*

Chapter 6: Groups

The standard JavaScript environment provides another data structure called Set. Like an instance of Map, 
a set holds a collection of values. Unlike Map, it does not associate other values with those—it just 
tracks which values are part of the set. A value can only be part of a set once—adding it again doesn’t 
have any effect.

Write a class called Group (since Set is already taken). Like Set, it has add, delete, and has methods. 
Its constructor creates an empty group, add adds a value to the group (but only if it isn’t already a 
member), delete removes its argument from the group (if it was a member), and has returns a Boolean value 
indicating whether its argument is a member of the group.

Use the === operator, or something equivalent such as indexOf, to determine whether two values are the same.

Give the class a static from method that takes an iteratable object as argument and creates a group that contains 
all the values produced by iterating over it.

class Group {
  // Your code here.
}

let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false

*/

class Group {
  constructor() {
     this.values = [];
  } 

  add(number) {
    if(!this.values.includes(number)) {
      this.values.push(number);
    }    
  }

  remove(number) {
    let index = this.values.indexOf(number);
    if(index !== -1) {
      this.values = this.values.filter(value => value !== number);
    }
  }

  has(number) {
    return(this.values.includes(number));
  }

  static from(object) {
    let newGroup = new Group();

    for(let element of object) {
      newGroup.values.push(element);
    }
    return newGroup;
  }
}

let group = Group.from([10, 20]);
console.log(group.has(10));
console.log(group.has(30));
group.add(10);
group.remove(10);
console.log(group.has(10));

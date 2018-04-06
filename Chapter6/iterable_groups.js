/*

Chapter 6: Iterable Groups

Make the Group class from the previous exercise iterable. Refer back to the section about the iterator 
interface earlier in the chapter if you aren’t clear on the exact form of the interface anymore.

If you used an array to represent the group’s members, don’t just return the iterator created by calling 
the Symbol.iterator method on the array. That would work, but it defeats the purpose of this exercise.

It is okay if your iterator behaves strangely when the group is modified during iteration.

// Your code here (and the code from the previous exercise)

for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}
// → a
// → b
// → c

*/

class GroupIterator {
  constructor(group) {
    this.group = group;
    this.index = 0;
  }

  next() {
    if(this.index === this.group.values.length) {
      return {done: true};
    }
    let value = this.group.values[this.index];
    this.index++;
    return {value, done: false};
  }
}

class Group {
  constructor() {
     this.values = [];
  } 

  [Symbol.iterator]() {
    return new GroupIterator(this);    
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

  from(object) {
    let newGroup = new Group();

    for(let element of object) {
      newGroup.values.push(element);
    }
    return newGroup;
  }
}

for(let value of new Group().from(["a", "b", "c"])) {
  console.log(value);
}

/*

Chapter 7: Persistent Group

Most data structures provided in a standard JavaScript environment aren’t very well suited for persistent use. Arrays have slice
and concat methods, which allow us to easily create new arrays without damaging the old one. But Set, for example, has no methods
for creating a new set with an item added or removed.

Write a new class PGroup, similar to the Group class from Chapter 6, which stores a set of values. Like Group, it has add, delete,
and has methods.

Its add method, however, should return a new PGroup instance with the given member added, and leave the old one unchanged. Similarly,
delete creates a new instance without a given member.

The class should work for keys of any type, not just strings. It does not have to be efficient when used with large amounts of keys.

The constructor shouldn’t be part of the class’ interface (though you’ll definitely want to use it internally). Instead, there is an
empty instance, PGroup.empty, that can be used as a starting value.

Why do you only need one PGroup.empty value, rather than having a function that creates a new, empty map every time?

class PGroup {
  // Your code here
}

let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");

console.log(b.has("b"));
// → true
console.log(a.has("b"));
// → false
console.log(b.has("a"));
// → false

*/

const utils = require('./utils');

class PGroup {
    constructor(values = []) {
        this.values = values;
    } 

    add(number) {
        let newGroup = undefined;

        if(!this.values.includes(number)) {
            newGroup = new PGroup().from(this.values);
            newGroup.values.push(number);
        }    

        return(newGroup);
    }

    remove(number) {
        let newGroup = undefined;
        let index = this.values.indexOf(number);
        if(index !== -1) {
            newGroup = new PGroup().from(this.values);
            newGroup.values = newGroup.values.filter(value => value !== number);
        }

        return(newGroup);
    }

    has(value) {
        let hasValue = false;
        this.values.forEach(internalValue => {
            hasValue = utils.deepEqual(value, internalValue);
        })
        return hasValue;
    }

    from(object) {
        let newGroup = new PGroup();

        for(let element of object) {
        newGroup.values.push(element);
        }
        return newGroup;
    }

    static empty = new PGroup();
}

let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.remove("a");

console.log('Expect true: ', b.has("b"));
console.log('Expect false: ', a.has("b"));
console.log('Expect false: ', b.has("a"));

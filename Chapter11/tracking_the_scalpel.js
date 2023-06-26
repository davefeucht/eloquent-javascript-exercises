/*

Chapter 11: Tracking the Scalpel

The village crows own an old scalpel that they occasionally use on special missions—say, to cut through screen doors or packaging. 
To be able to quickly track it down, every time the scalpel is moved to another nest, an entry is added to the storage of both the 
nest that had it and the nest that took it, under the name "scalpel", with its new location as value.

This means that finding the scalpel is a matter of following the breadcrumb trail of storage entries, until you find a nest where that points at the nest itself.

Write an async function locateScalpel that does this, starting at the nest on which it runs. You can use the anyStorage function defined earlier to access storage 
in arbitrary nests. The scalpel has been going around long enough that you may assume that every nest has a "scalpel" entry in its data storage.

Next, write the same function again without using async and await.

Do request failures properly show up as rejections of the returned promise in both versions? How?

async function locateScalpel(nest) {
  // Your code here.
}

function locateScalpel2(nest) {
  // Your code here.
}

locateScalpel(nest).then(console.log);
// → Butcher Shop

*/

import { bigOak, defineRequestType } from "./crow_tech";

class Timeout extends Error {}

function request(nest, target, type, content) {
  return new Promise((resolve, reject) => {
    let done = false;
    function attempt(n) {
      nest.send(target, type, content, (failed, value) => {
        done = true;
        if (failed) reject(failed);
        else resolve(value);
      });
      setTimeout(() => {
        if (done) return;
        else if (n < 3) attempt(n + 1);
        else reject(new Timeout("Timed out"));
      }, 250);
    }
    attempt(1);
  });
}

function findRoute(from, to, connections) {
    let work = [{at: from, via: null}];
    for (let i = 0; i < work.length; i++) {
        let {at, via} = work[i];
        for (let next of connections.get(at) || []) {
            if (next == to) return via;
            if (!work.some(w => w.at == next)) {
                work.push({at: next, via: via || next});
            }
        }
    }
    return null;
}

function routeRequest(nest, target, type, content) {
    if (nest.neighbors.includes(target)) {
        return request(nest, target, type, content);
    } else {
        let via = findRoute(nest.name, target, nest.state.connections);
        if (!via) {
            throw new Error(`No route to ${target}`);
        }
        return request(nest, via, "route", {target, type, content});
    }
}

function storage(nest, name) {
    return new Promise(resolve => {
        nest.readStorage(name, result => resolve(result));
    });
}

function anyStorage(nest, source, name) {
    if (source == nest.name) {
        return storage(nest, name);
    } else {
        return routeRequest(nest, source, "storage", name);
    }
}

async function locateScalpel(nest) {
    let current = nest.name;

    for(;;) {
        let next = await anyStorage(nest, current, "scalpel");
        if(next === current) {
            return current;
        }
        else {
            current = next;
        }
    }
}

function locateScalpel2(nest) {
  function loop(current) {
    return anyStorage(nest, current, "scalpel").then(next => {
      if(next === current) {
        return current;
      }
      else {
        return loop(next);
      }
    });
  }
  return loop(nest.name);

}

locateScalpel(bigOak).then(console.log);
locateScalpel2(bigOak).then(console.log);

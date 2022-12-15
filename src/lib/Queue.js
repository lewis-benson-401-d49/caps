'use strict';

class Queue {
  constructor(existingQueue = {}) {
    this.data = existingQueue;
  }

  store(key, value) {
    this.data[key] = value;
    return key;
  }

  read(key) {
    console.log(this.data[key], 'queue file');
    return this.data[key];
  }

  remove(key) {

    let value = this.data[key];
    delete this.data[key];
    return value;
  }
}

const packageQueue = new Queue();

module.exports = { packageQueue, Queue };
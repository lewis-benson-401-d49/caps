'use strict';

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

module.exports = class Queue {
  constructor() {
    this.front = null;
    this.rear = null;
  }

  enqueue(value) {
    const node = new Node(value);
    if (this.front === null) {
      this.rear = node;
      this.front = node;
    } else {
      this.rear.next = node;
      this.rear = node;
    }
  }

  dequeue() {
    if (!this.front) null;
    let temp = this.front;
    this.front = this.front.next;
    temp.next = null;
    return temp.value;
  }

  peek() {
    if (!this.front) null;
    return this.front.value;
  }

  isEmpty() {
    if (!this.front) return true;
    return false;
  }
};
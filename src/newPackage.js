'use strict';


const { Queue } = require('./lib/Queue');
// const packageQueue = new Queue();
const socket = require('../socket');
const chance = new require('chance')();

const newPackage = (vender) => {
  console.log(`-------new package arrives at ${vender}---------`);
  const event = {
    'event': 'Alert Driver',
    'time': new Date(Date.now()),
    'payload': {
      'store': vender,
      'queueId': vender,
      'orderID': chance.guid(),
      'customer': chance.name(),
      'address': chance.address(),
    },
  };

  // let currentQueue = packageQueue.read(event.payload.queueId);

  // if (!currentQueue) {
  //   packageQueue.store(event.payload.queueId, new Queue);
  //   currentQueue = packageQueue.read(event.payload.queueId);
  // }
  // currentQueue.store(event.payload.queueId, event);
  // console.log(currentQueue);

  socket.emit('NEW_PACKAGE', event);
};


const pickUp = (socket) => (payload) => {
  socket.emit('JOIN', 'flowers');
  const event = {
    event: 'Picked up',
    time: new Date(),
    payload: payload.payload,
  };

  const { queueId } = payload.payload;
  // console.log(packageQueue, 'main');
  // let currentQueue = packageQueue.read(queueId);
  // console.log(currentQueue);
  // if (!currentQueue) {
  //   throw new Error('New package, but queue is null');
  // }
  // console.log(currentQueue);
  // let packageFromQueue = currentQueue.remove(payload.orderID);
  console.log('picking up order: ', event.payload.orderID);

  socket.to(payload.queueId).emit('IN_TRANSIT', payload.payload);
};

const inTransit = (socket) => (payload) => {
  const event = {
    event: 'In transit',
    time: new Date(),
    payload: payload.payload,
  };
  // let currentQueue = packageQueue.read(payload.queueId);
  // if (currentQueue && currentQueue.data) {
  // Object.keys(currentQueue.data).forEach(orderId => {
  // const data = currentQueue.read(orderId);
  socket.emit('DELIVERED', event);
  // });
  console.log('order', event.payload.orderID, 'is in transit');
  // }
};



module.exports = { pickUp, inTransit, newPackage };
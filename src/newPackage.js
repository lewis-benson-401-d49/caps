'use strict';


const { Queue } = require('./lib/Queue');
const packageQueue = new Queue();
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
  let currentQueue = packageQueue.read(event.payload.queueId);
  if (!currentQueue) {
    packageQueue.store(event.payload.queueId, new Queue);
    currentQueue = packageQueue.read(event.payload.queueId);

  }
  currentQueue.store(event.payload.orderID, event);
  const passingForward = currentQueue.data;
  socket.emit('NEW_PACKAGE', { event, passingForward });
};
module.exports = newPackage;
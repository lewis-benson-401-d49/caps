'use strict';

const alertDriver = (socket) => (payload) => {
  socket.emit('PICKUP', payload);
};

function delivered(payload) {

  const event = {
    event: 'Delivered',
    time: new Date(),
    payload: payload.payload,
  };

  console.log('thank you for delivering order:', event.payload.orderID);
}
const { packageQueue, Queue } = require('./src/lib/Queue');
const socket = require('./socket');
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
    let queueKey = packageQueue.store(event.payload.queueId, new Queue());
    currentQueue = packageQueue.read(queueKey);
  }
  currentQueue.store(event.payload.orderID, event);

  socket.emit('NEW_PACKAGE', event);
};


module.exports = { alertDriver, delivered, newPackage };




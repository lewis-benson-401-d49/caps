'use strict';
const { packageQueue } = require('./lib/Queue');
const pickUp = (socket) => (payload) => {

  const event = {
    event: 'Picked up',
    time: new Date(),
    payload: payload.payload,
  };
  console.log(packageQueue);
  let currentQueue = packageQueue.read(payload.payload.queueId);
  console.log(currentQueue, 'payload');
  if (!currentQueue) {
    throw new Error('New package, but queue is null');
  }
  let packageFromQueue = currentQueue.remove(payload.orderID);
  console.log('picking up order: ', event.payload.orderID);

  socket.to(payload.queueId).emit('IN_TRANSIT', packageFromQueue);
};

const inTransit = (socket) => (payload) => {
  const event = {
    event: 'In transit',
    time: new Date(),
    payload: payload.payload,
  };
  let currentQueue = packageQueue.read(payload.queueId);
  if (currentQueue && currentQueue.data) {
    Object.keys(currentQueue.data).forEach(orderId => {

      socket.emit('DELIVERED', currentQueue.read(orderId));
    });
  }
  console.log('order', event.payload.orderID, 'is in transit');
};

module.exports = { pickUp, inTransit };
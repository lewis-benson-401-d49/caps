'use strict';
const { packageQueue } = require('./lib/Queue');



const pickUp = (socket) => (payload) => {
  socket.emit('JOIN', 'flowers');
  const event = {
    event: 'Picked up',
    time: new Date(),
    payload: payload.payload,
  };
  console.log(packageQueue, 'queue');
  let currentQueue = packageQueue.read(payload.payload.queueId);

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
      const data = currentQueue.read(orderId);
      socket.emit('DELIVERED', data);
    });

  }
  console.log('order', event.payload.orderID, 'is in transit');
};

module.exports = { pickUp, inTransit };
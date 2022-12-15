'use strict';
const { Queue } = require('./lib/Queue');
let packageQueue;
const pickUp = (socket) => (payload) => {

  socket.emit('JOIN', 'flowers');
  const event = {
    event: 'Picked up',
    time: new Date(),
    payload: payload.payload,
  };

  packageQueue = new Queue(payload.passingForward);
  const { queueId } = payload.event.payload;
 
  let currentQueue = packageQueue.read(queueId);
  console.log(currentQueue);
  if (!currentQueue) {
    throw new Error('New package, but queue is null');
  }
  console.log(currentQueue);
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
'use strict';
const socket = require('../socket');


function pickUp(payload) {

  const event = {
    event: 'Picked up',
    time: new Date(),
    payload: payload.payload,
  };
  console.log('picking up order: ', event.payload.orderID);
  socket.emit('IN_TRANSIT', event);

}

function inTransit(payload) {
  const event = {
    event: 'In transit',
    time: new Date(),
    payload: payload.payload,
  };
  console.log('order', event.payload.orderID, 'is in transit');
  socket.emit('DELIVERED', event);

}

module.exports = { pickUp, inTransit };
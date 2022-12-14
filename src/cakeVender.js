'use strict';
const socket = require('../socket');

function alertDriver(payload) {
  console.log(payload);
  socket.emit('PICKUP', payload);
}

function delivered(payload) {

  const event = {
    event: 'Delivered',
    time: new Date(),
    payload: payload.payload,
  };
  console.log(event);
  console.log('thank you for delivering order:', event.payload.orderID);
}

module.exports = { alertDriver, delivered };

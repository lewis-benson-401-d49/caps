'use strict';
const socket = require('../socket');

function alertDriver(payload) {
  console.log(payload);
  socket.emit('PICKUP', payload);
}


function pickUp(payload) {

  const event = {
    event: 'Picked up',
    time: new Date(),
    payload: payload.payload,
  };
  console.log(event);
  socket.emit('IN_TRANSIT', event);

}

function inTransit(payload) {
  const event = {
    event: 'In transit',
    time: new Date(),
    payload: payload.payload,
  };
  console.log(event);
  socket.emit('DELIVERED', event);

}

function delivered(payload) {

  const event = {
    event: 'Delivered',
    time: new Date(),
    payload: payload.payload,
  };
  console.log(event);

}




module.exports = { pickUp, alertDriver, inTransit, delivered };
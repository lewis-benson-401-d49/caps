'use strict';

let eventPool = require('../eventPool');



function alertDriver(payload) {
  setTimeout(() => {
    console.log(payload);
    eventPool.emit('PICKUP', payload);
  }, 1000);
}


function pickUp(payload) {
  setTimeout(() => {
    const event = {
      event: 'Picked up',
      time: new Date(),
      payload: payload.payload,
    };
    console.log(event);
    eventPool.emit('IN_TRANSIT', event);
  }, 1000);
}

function inTransit(payload) {
  setTimeout(() => {


    const event = {
      event: 'In transit',
      time: new Date(),
      payload: payload.payload,
    };
    console.log(event);
    eventPool.emit('DELIVERED', event);
  }, 1000);
}

function delivered(payload) {
  setTimeout(() => {

    const event = {
      event: 'Delivered',
      time: new Date(),
      payload: payload.payload,
    };
    console.log(event);
  }, 1000);
}




module.exports = { pickUp, alertDriver, inTransit, delivered };
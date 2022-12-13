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
      event: 'In transit',
      time: new Date(),
      payload: payload.payload,
    };
    eventPool.emit('IN_TRANSIT', payload);
  }, 1000);
}

function inTransit(payload) {
  setTimeout(() => {
    console.log('in-transit');
    eventPool.emit('DELIVERED', payload);
  }, 1000);
}

function delivered(payload) {
  setTimeout(() => {
    console.log('delivered');

  }, 1000);
}




module.exports = { pickUp, alertDriver, inTransit, delivered };
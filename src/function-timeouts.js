'use strict';
const socket = require('../socket');
let { pickUp, inTransit } = require('./driver');

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



const timeoutAlertDriver = (payload) => {
  setTimeout(() => {

    alertDriver(socket)(payload);
  }, 1000);
};

const timeoutInTransit = (payload) => {
  setTimeout(() => {

    inTransit(socket)(payload);
  }, 1000);
};

const timeoutDelivered = (payload) => {
  setTimeout(() => {

    delivered(payload);
    process.exit();
  }, 1000);
};

const timeoutPickUp = (payload) => {
  setTimeout(() => {

    pickUp(socket)(payload);
  }, 1000);

};
module.exports = { timeoutAlertDriver, timeoutInTransit, timeoutDelivered, timeoutPickUp, alertDriver, delivered };
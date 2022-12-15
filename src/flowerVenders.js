'use strict';

const newPackage = require('./newPackage');
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


setInterval(() => {
  newPackage('flowers');
}, 5000);

module.exports = { alertDriver, delivered, newPackage };




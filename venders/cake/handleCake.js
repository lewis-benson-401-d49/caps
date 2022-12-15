'use strict';

const Chance = require('chance');
const chance = new Chance();

const newPackage = (socket) => (payload = null) => {
  payload = payload ? payload : {
    'storeId': 'flowers',
    'orderId': chance.guid(),
    'customer': chance.name(),
    'address': chance.address(),
  };

  console.log('Package is ready');
  socket.emit('PICKUP', payload);
};

const thankDriver = (payload) => {
  console.log(payload.storeId + ':', 'Thank you Lewis! Successful delivery to:', payload.customer);
};

module.exports = { newPackage, thankDriver };
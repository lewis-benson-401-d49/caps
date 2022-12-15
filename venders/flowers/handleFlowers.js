'use strict';

const Chance = require('chance');
const chance = new Chance();

const newPackage = (socket) => (payload = null) => {
  payload = payload ? payload : {
    'storeId': 'cake',
    'orderId': chance.guid(),
    'customer': chance.name(),
    'address': chance.address(),
  };

  console.log('Package is ready');
  socket.emit('PICKUP', payload);
};



module.exports = newPackage;
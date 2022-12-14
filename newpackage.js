'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps');
const chance = new require('chance')();

const newPackage = (vender) => {
  console.log('-------new package arrives---------');
  const event = {
    'event': 'Alert Driver',
    'time': new Date(Date.now()),
    'payload': {
      'store': vender,
      'orderID': chance.guid(),
      'customer': chance.name(),
      'address': chance.address(),
    },
  };

  console.log(event);
  socket.emit('NEW_PACKAGE', event);
};

setInterval(() => {
  newPackage('1-206-flowers');
  newPackage('1-800-cake');
}, 5000);

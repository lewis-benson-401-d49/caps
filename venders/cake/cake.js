'use strict';

const { newPackage, thankDriver } = require('./handleCake');

let socket = require('../../socket');
const requestPickup = newPackage(socket);

let storeId = 'cake';

socket.emit('JOIN', storeId);

socket.emit('DELIVER', { storeId });

socket.on('DELIVERED', thankDriver);

setInterval(() => {
  console.log('-------new package arrives at cake---------');
  requestPickup();
}, 1000);
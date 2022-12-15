const newPackage = require('./handleFlowers');
const { thankDriver } = require('../cake/handleCake');

let socket = require('../../socket');
const requestPickup = newPackage(socket);

let storeId = 'flowers';

socket.emit('JOIN', storeId);

socket.emit('DELIVER', { storeId });

socket.on('DELIVERED', thankDriver);

setInterval(() => {
  console.log('-------new package arrives at flowers---------');
  requestPickup();
}, 3000);
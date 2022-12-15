'use strict';

const socket = require('./socket');
const { newPackage } = require('./src/venders');
socket.emit('JOIN', 'flowers');
socket.emit('JOIN', 'cake');
setInterval(() => {
  newPackage('flowers');
  setTimeout(() => {
    newPackage('cake');
  }, 500);

}, 5000);

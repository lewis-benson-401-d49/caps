'use strict';
const socket = require('../socket');
const { newPackage } = require('./newPackage');

socket.emit('JOIN', 'flowers');
setInterval(() => {
  newPackage('flowers');
}, 5000);






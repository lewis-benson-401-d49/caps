'use strict';

let socket = require('../socket');

const { pickup, deliver } = require('./handleDriver');
socket.on('PICKUP', timeoutDriver);
socket.emit('PICKUPS', { storeId: 'flowers' });

function timeoutDriver(payload) {
  setTimeout(() => {
    pickup(socket)(payload);
  }, 1000);

  setTimeout(() => {
    deliver(socket)(payload);
  }, 1000);
}
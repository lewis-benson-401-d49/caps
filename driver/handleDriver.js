'use strict';

const pickup = (socket) => (payload) => {
  console.log('Picked up order:', payload.orderId);
  socket.emit('IN-TRANS', payload);
};

const deliver = (socket) => (payload) => {
  console.log('Delivered order:', payload.orderId);
  socket.emit('DELIVER', payload);
};

module.exports = { pickup, deliver };
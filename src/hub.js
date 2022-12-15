const { Server } = require('socket.io');
const Queue = require('./lib/Queue');
const logger = require('./lib/logger');
const newPackageQueue = new Queue();

const server = new Server(3001);


server.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  socket.on('JOIN', (vendorId) => {
    socket.join(vendorId);
    console.log(`Joined room: ${vendorId}`);
    socket.emit('JOIN', vendorId);
  });

  socket.on('PICKUP', (payload) => {
    logger('PICKUP', payload);
    let currentQueue = newPackageQueue.read(payload.vendorId);
    if (!currentQueue) {
      let vendorKey = newPackageQueue.store(payload.vendorId, new Queue());
      currentQueue = newPackageQueue.read(vendorKey);
    }
    currentQueue.store(payload.orderId, payload);
    socket.broadcast.emit('PICKUP', payload);
  });

  socket.on('IN-TRANS', (payload) => {
    console.log('In Transits:', payload.orderId);
    logger('IN-TRANS', payload);
    socket.broadcast.emit('IN-TRANS', payload);
  });

  socket.on('DELIVERED', (payload) => {
    let currentQueue = newPackageQueue.read(payload.vendorId);
    if (!currentQueue) {
      let vendorKey = newPackageQueue.store(payload.vendorId, new Queue());
      currentQueue = newPackageQueue.read(vendorKey);
    }
    currentQueue.store(payload.orderId, payload);
    console.log('Delivered:', currentQueue);
    logger('DELIVERED', payload);
    socket.broadcast.emit('DELIVERED', payload);
  });

  socket.on('PICKUPS', (payload) => {
    let currentQueue = newPackageQueue.read(payload.vendorId);
    if (currentQueue && currentQueue.data) {
      Object.keys(currentQueue.data).forEach(orderId => {
        socket.emit('PICKUP', currentQueue.read(orderId));
      });
    }
  });

  socket.on('DELIVER', (payload) => {
    let currentQueue = newPackageQueue.read(payload.vendorId);
    if (currentQueue && currentQueue.data) {
      Object.keys(currentQueue.data).forEach(orderId => {
        socket.emit('DELIVERED', currentQueue.read(orderId));
      });
    }
  });
});
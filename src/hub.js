const { Server } = require('socket.io');
const PORT = 3001;
const Queue = require('./lib/Queue');

const newPackageQueue = new Queue();
const deliveryQueue = new Queue();

const server = new Server(PORT);

const caps = server.of('/caps');

function logger(event, payload) {
  const time = new Date();
  console.log('EVENT:', { event, time, payload });
}
caps.on('connection', (socket) => {
  console.log('Socket connected to /caps namespace', socket.id);

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
    logger('IN-TRANS', payload);
    socket.broadcast.emit('IN-TRANS', payload);
  });

  socket.on('DELIVERED', (payload) => {
    let currentQueue = deliveryQueue.read(payload.vendorId);
    if (!currentQueue) {
      let vendorKey = deliveryQueue.store(payload.vendorId, new Queue());
      currentQueue = deliveryQueue.read(vendorKey);
    }
    currentQueue.store(payload.orderId, payload);
    console.log('in DELIVERED:', currentQueue);
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
    let currentQueue = deliveryQueue.read(payload.vendorId);


    if (currentQueue && currentQueue.data) {
      Object.keys(currentQueue.data).forEach(orderId => {
        socket.emit('DELIVERED', currentQueue.read(orderId));
      });
    }
  });
});
const { timeoutAlertDriver, timeoutInTransit, timeoutDelivered, timeoutPickUp } = require('./src/function-timeouts');

const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;
const server = new Server(PORT);


const caps = server.of('/caps');

caps.on('connection', (socket) => {
  console.log('Socket connected to caps namespace!', socket.id);

  socket.on('NEW_PACKAGE', timeoutAlertDriver);
  socket.on('PICKUP', timeoutPickUp);
  socket.on('IN_TRANSIT', timeoutInTransit);
  socket.on('DELIVERED', timeoutDelivered);
});







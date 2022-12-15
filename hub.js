const { timeoutAlertDriver, timeoutInTransit, timeoutDelivered, timeoutPickUp } = require('./src/function-timeouts');

const { Server } = require('socket.io');
const PORT = 3001;
const server = new Server(PORT);

server.on('connection', (socket) => {

  socket.on('JOIN', (room) => {
    socket.join(room);
    console.log('You\'ve joined room:', room);

  });



  socket.on('JOIN', (queueId) => {
    socket.join(queueId);
    console.log('joined the room: ', queueId);
    socket.emit('JOIN', queueId);
  });
  console.log('Socket connected to event server!', socket.id);

  socket.on('NEW_PACKAGE', timeoutAlertDriver);
  socket.on('PICKUP', timeoutPickUp);
  socket.on('IN_TRANSIT', timeoutInTransit);
  socket.on('DELIVERED', timeoutDelivered);
});


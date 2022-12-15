

const socket = require('./socket');
const newPackage = require('./newPackage');
socket.emit('JOIN', 'cake');
setInterval(() => {

  newPackage('cake');

}, 4900);



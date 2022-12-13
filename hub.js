const eventPool = require('./eventPool');
const { alertDriver, pickUp, inTransit, delivered } = require('./src/client');
const Chance = require('chance');

const chance = new Chance();



eventPool.on('NEW_PACKAGE', alertDriver);
eventPool.on('PICKUP', pickUp);
eventPool.on('IN_TRANSIT', inTransit);
eventPool.on('DELIVERED', delivered);

setInterval(() => {
  console.log('-------new package arrives---------');
  const event = {
    'event': 'Alert Driver',
    'time': new Date(Date.now()),
    'payload': {
      'store': '1-206-flowers',
      'orderID': chance.guid(),
      'customer': chance.name(),
      'address': chance.address(),
    },
  };
  eventPool.emit('NEW_PACKAGE', event);

}, 5000);
const eventPool = require('./eventPool');
const { timeoutAlertDriver, timeoutInTransit, timeoutDelivered, timeoutPickUp } = require('./src/function-timeouts');
const Chance = require('chance');

const chance = new Chance();

eventPool.on('NEW_PACKAGE', timeoutAlertDriver);
eventPool.on('PICKUP', timeoutPickUp);
eventPool.on('IN_TRANSIT', timeoutInTransit);
eventPool.on('DELIVERED', timeoutDelivered);

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
'use strict';
const socket = require('../socket');


socket.emit = jest.fn();

const { pickUp, alertDriver, inTransit, delivered } = require('./client');


afterAll(() => {
  socket.close();
});

console.log = jest.fn();
const event = {
  'event': 'Alert Driver',
  'time': 'this is the time',
  'payload': {
    'store': '1-206-flowers',
    'orderID': 'this is unique',
    'customer': 'john smith',
    'address': 'this is an address',
  },
};
describe('Handle alertDriver', () => {

  test('emit alert driver to get a pickup', () => {
    alertDriver(event);
    expect(console.log).toHaveBeenCalledWith(event);
    expect(socket.emit).toHaveBeenCalled();
  });
});

describe('Handle pickUp', () => {

  test('emit pickup package', () => {
    pickUp(event);
    expect(console.log).toHaveBeenCalled();
    expect(socket.emit).toHaveBeenCalled();
  });
});

describe('Handle inTransit', () => {

  test('emit inTransit package', () => {
    inTransit(event);
    expect(console.log).toHaveBeenCalled();
    expect(socket.emit).toHaveBeenCalled();
  });
});

describe('Handle delivered', () => {

  test('emit delivered package', () => {
    delivered(event);
    expect(console.log).toHaveBeenCalled();
    expect(socket.emit).toHaveBeenCalled();
  });

});

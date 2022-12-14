'use strict';

let { pickUp, inTransit } = require('./driver');
let { alertDriver, delivered } = require('./flowerVender');

const timeoutAlertDriver = (payload) => {
  setTimeout(() => {
    alertDriver(payload);
  }, 1000);
};

const timeoutInTransit = (payload) => {
  setTimeout(() => {
    inTransit(payload);
  }, 1000);
};

const timeoutDelivered = (payload) => {
  setTimeout(() => {
    delivered(payload);
    process.exit();
  }, 1000);
};

const timeoutPickUp = (payload) => {
  setTimeout(() => {
    pickUp(payload);
  }, 1000);

};

module.exports = { timeoutAlertDriver, timeoutInTransit, timeoutDelivered, timeoutPickUp };
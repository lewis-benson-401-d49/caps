'use strict';
const socket = require('../socket');
let { pickUp, inTransit } = require('./driver');
let { alertDriver, delivered } = require('./venders');

const timeoutAlertDriver = (payload) => {
  setTimeout(() => {

    alertDriver(socket)(payload);
  }, 1000);
};

const timeoutInTransit = (payload) => {
  setTimeout(() => {

    inTransit(socket)(payload);
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

    pickUp(socket)(payload);
  }, 1000);

};

module.exports = { timeoutAlertDriver, timeoutInTransit, timeoutDelivered, timeoutPickUp };
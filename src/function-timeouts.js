'use strict';

let { pickUp, alertDriver, inTransit, delivered } = require('./client');

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
  }, 1000);
};

const timeoutPickUp = (payload) => {
  setTimeout(() => {
    pickUp(payload);
  }, 1000);

};

module.exports = { timeoutAlertDriver, timeoutInTransit, timeoutDelivered, timeoutPickUp };
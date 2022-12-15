module.exports = function logger(event, payload) {
  const time = new Date();
  console.log('EVENT:', { event, time, payload });
};
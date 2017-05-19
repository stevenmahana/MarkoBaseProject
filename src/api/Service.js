var request = require('request-promise')
  , flash = require('connect-flash')
  , zmq = require('zmq');

var env = process.env.NODE_ENV;
var config = require('secure/config')[env];

module.exports = {

  start_collection: function() {

    var socket = zmq.socket("req");
    var counter = 0;

    socket.on("message", function (message) {
      logToConsole("Response: " + message.toString("utf8"));
    });

    socket.connect("tcp://127.0.0.1:5556");

    setInterval(function () {
      var message = counter++;
      logToConsole("Sending: " + message);
      socket.send(message);
    }, 1000);

    return null;
  },
  test_collection: function() {

    var socket = zmq.socket("req");
    var counter = 0;

    socket.on("message", function (message) {
      logToConsole("Response: " + message.toString("utf8"));
    });

    socket.connect("tcp://collection:5555");

    setInterval(function () {
      var message = counter++;
      logToConsole("Sending: " + message);
      socket.send(message);
    }, 1000);

    return null;
  }
};

// Just a helper function for logging to the console with a timestamp.
function logToConsole (message) {
  console.log("[" + new Date().toLocaleTimeString() + "] " + message);
}

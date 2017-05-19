var request = require('request-promise')
  , flash = require('connect-flash')
  , fb = require('src/models/Firebase');

var env = process.env.NODE_ENV;
var config = require('secure/config')[env];
var mailgun = require('secure/config')['mailgun'];
var baseUrl = config.auth;

module.exports = {
  register_client: function(client) {

    if (!client) {
      return null;
    }

    var fbObj = {
      'profile': client.clientProfile,
      'password': client.clientPassword,
      'details': client.clientDetails
    };

    // mail message
    var mailString = 'The following Client has registered: \n\n';
    for (var p in client.clientProfile) {
      if(p == 'action') continue;
      mailString += p + ': ' + client.clientProfile[p] + '\n';
    }

    mailString += '\n The Client provided the following details: \n\n';

    for (var d in client.clientDetails) {
      if(d == 'action') continue;
      const desc = client.clientDetails[d] === 'on' ? 'yes' : client.clientDetails[d];
      mailString += d + ': ' + desc + '\n';
    }

    fb.ref('/clients/')
      .push(fbObj)
      .then(function() {
        sendMail(mailString);
      });

    return null;
  }
};

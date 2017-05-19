var request = require('request-promise')
  , fs = require('fs')
  , session = require('express-session');

var env = process.env.NODE_ENV;
var config = require('secure/config')[env];
var baseUrl = config.api;

module.exports = {
  demo: function(req) {

    return new Promise(function(resolve, reject) {

      // delay simulated asynchronous data
      setTimeout(function() {
        return resolve({result: ["this", "is", "a", "test"]})
      }, 1000)

    })
  },
  get: function(req) {

    return new Promise(function(resolve, reject) {

      if (!req) {
        console.log('>>> ERROR: User Data not provided');
        return reject('Data was not provided');
      }

      var url = baseUrl + 'person';
      var sess = req.session.user;
      var params = req.query;
      var token = new Buffer(sess.token + ':').toString('base64');

      var options = {
        url: url,
        qs: {},
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',
          'key': sess.public_key
        },
        resolveWithFullResponse: true,
        json: true // Automatically parses the JSON string in the response
      };

      if (params) {
        for (var key in params) {
          // validate and filter here
          qs[key] = params[key]
        }
      }

      request(options)
        .then(function (response) {

          if (response.statusCode !== 200) {

            console.log('>>> ERROR: Request to ' + url + ' return status code ' + response.statusCode);

            if (response.statusCode === 401) {
              console.log('Access is denied. Please try again');
              req.flash('message', 'Access is denied. Please try again');
            } else {
              console.log('Query Failed. Please contact admin.');
              req.flash('message', 'Query Failed. Please contact admin.');
            }

            return reject(null);

          } else {
            return resolve(response.body.result)
          }

        })
        .catch(function (err) {
          console.log(err.message);
          return reject(null);
        });

    })
  },
  get_detail: function(req) {

    return new Promise(function(resolve, reject) {

      if (!req) {
        console.log('>>> ERROR: User Data not provided');
        return reject('Data was not provided');
      }

      var url = baseUrl + 'person';
      var sess = req.session.user;
      var params = req.query;
      var token = new Buffer(sess.token + ':').toString('base64');

      var options = {
        url: url,
        qs: { UUID: params.UUID },
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',
          'key': sess.public_key
        },
        resolveWithFullResponse: true,
        json: true // Automatically parses the JSON string in the response
      };

      request(options)
        .then(function (response) {

          if (response.statusCode !== 200) {

            console.log('>>> ERROR: Request to ' + url + ' return status code ' + response.statusCode);

            if (response.statusCode === 401) {
              console.log('Access is denied. Please try again');
              req.flash('message', 'Access is denied. Please try again');
            } else {
              console.log('Query Failed. Please contact admin.');
              req.flash('message', 'Query Failed. Please contact admin.');
            }

            return reject(null);

          } else {
            return resolve(response.body.result)
          }

        })
        .catch(function (err) {
          console.log(err.message);
          return reject(null);
        });

    })
  },
  post: function(req) {

    return new Promise(function(resolve, reject) {

      if (!req) {
        console.log('>>> ERROR: User Data not provided');
        return reject('Data was not provided');
      }

      var url = baseUrl + 'person';
      var sess = req.session.user;
      var params = req.body;
      var token = new Buffer(sess.token + ':').toString('base64');
      var payload = {};

      // add body to payload
      if (params) {
        for (var key in params) {
          // filter and validate here
          payload[key] = params[key]
        }
      }

      var options = {
        url: url,
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token,
          'key': sess.public_key
        },
        resolveWithFullResponse: true,
        json: true,
        formData: payload
      };

      request(options)
        .then(function (response) {

          if (response.statusCode !== 200) {

            console.log('>>> ERROR: Request to ' + url + ' return status code ' + response.statusCode);

            if (response.statusCode === 401) {
              console.log('Access is denied. Please try again');
              req.flash('error', 'Access is denied. Please try again');
            } else {
              console.log('Query Failed. Please contact admin.');
              req.flash('error', 'Query Failed. Please contact admin.');
            }

            return reject(null);

          } else {

            if (response.body.error) {
              console.log(response.body.error);
              req.flash('error', 'Create profile error.');
              return reject(null);
            }

            req.flash('message', 'Profile was created.');
            return resolve(response.body.result)
          }

        })
        .catch(function (err) {
          console.log(err.message);
          req.flash('error', 'Create profile error.');
          return reject(null);
        });

    })
  },
  put: function(req) {

    return new Promise(function(resolve, reject) {

      if (!req) {
        console.log('>>> ERROR: User Data not provided');
        return reject('Data was not provided');
      }

      var url = baseUrl + 'person';
      var sess = req.session.user;
      var params = req.body;
      var token = new Buffer(sess.token + ':').toString('base64');
      var payload = {};

      // add body to payload
      if (params) {
        for (var key in params) {
          // filter and validate here
          payload[key] = params[key]
        }
      }

      var options = {
        url: url,
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + token,
          'key': sess.public_key
        },
        resolveWithFullResponse: true,
        json: true,
        formData: payload
      };

      request(options)
        .then(function (response) {

          if (response.statusCode !== 200) {

            console.log('>>> ERROR: Request to ' + url + ' return status code ' + response.statusCode);

            if (response.statusCode === 401) {
              console.log('Access is denied. Please try again');
              req.flash('error', 'Access is denied. Please try again');
            } else {
              console.log('Query Failed. Please contact admin.');
              req.flash('error', 'Query Failed. Please contact admin.');
            }

            return reject(null);

          } else {

            if (response.body.error) {
              console.log(response.body.error);
              req.flash('error', 'Update profile error.');
              return reject(null);
            }

            req.flash('message', 'Profile was updated.');
            return resolve(response.body.result)
          }

        })
        .catch(function (err) {
          console.log(err.message);
          req.flash('error', 'Update profile error.');
          return reject(null);
        });

    })
  },
  delete: function(req, callback) {

    return new Promise(function(resolve, reject) {

      if (!req) {
        console.log('>>> ERROR: User Data not provided');
        return reject('Data was not provided');
      }

      var url = baseUrl + 'person';
      var sess = req.session.user;
      var params = req.body;
      var token = new Buffer(sess.token + ':').toString('base64');
      var payload = {};

      // add body to payload
      if (params) {
        for (var key in params) {
          // filter and validate here
          payload[key] = params[key]
        }
      }

      var options = {
        url: url,
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + token,
          'key': sess.public_key
        },
        resolveWithFullResponse: true,
        json: true,
        formData: payload
      };

      request(options)
        .then(function (response) {

          if (response.statusCode !== 200) {

            console.log('>>> ERROR: Request to ' + url + ' return status code ' + response.statusCode);

            if (response.statusCode === 401) {
              console.log('Access is denied. Please try again');
              req.flash('error', 'Access is denied. Please try again');
            } else {
              console.log('Query Failed. Please contact admin.');
              req.flash('error', 'Query Failed. Please contact admin.');
            }

            return reject(null);

          } else {

            if (response.body.error) {
              console.log(response.body.error);
              req.flash('error', 'Update profile error.');
              return reject(null);
            }

            req.flash('message', 'Profile was updated.');
            return resolve(response.body.result)
          }

        })
        .catch(function (err) {
          console.log(err.message);
          req.flash('error', 'Update profile error.');
          return reject(null);
        });

    })
  }
};

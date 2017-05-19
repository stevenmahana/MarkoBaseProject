var template = require('./template.marko')
  , page = require('src/data/Page')
  , model = require('src/models/Model');

module.exports = function(req, res) {

  template.render({
    objectData: model.demo(req),
    page: page.base("home")
  }, res);

};
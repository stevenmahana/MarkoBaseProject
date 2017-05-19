var template = require('./template.marko')
  , page = require('src/data/Page');

module.exports = function(req, res) {

  template.render({
    objectData: null,
    page: page.base("default")
  }, res);

};
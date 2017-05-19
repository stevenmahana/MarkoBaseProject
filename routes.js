var multer  = require('multer');

var upload = multer({ dest: 'uploads/' });

exports.addRoutes = function(app) {

  /* ====================== */
  /* === [ MAIN PAGES ] === */
  /* ====================== */

  /* == [ HOME ] == */
  var homeTemplate = require('./src/pages/home/index');
  app.get('/', homeTemplate);

  /* == [ DASHBOARD ] == */
  var dashboardTemplate = require('./src/pages/dashboard/index');
  app.get('/dashboard', dashboardTemplate);


  /* ============================== */
  /* == [ AUTHENTICATION PAGES ] == */
  /* ============================== */

  /* == [ LOGIN PAGE ] == */
  var loginTemplate = require('./src/pages/login/index');
  app.get('/login', loginTemplate);


  /* ====================== */
  /* == [ SECURE PAGES ] == */
  /* ====================== */

  /* ======================= */
  // == [ UTILITY PAGES ] == //
  /* ======================= */

  /* == [ ERRORS ] == */
  var errorLandingTemplate = require('./src/pages/errors/index');
  app.get('/error/:code', errorLandingTemplate);

  app.use(function(err, req, res, next) {
    console.error(err);
    res.status(500).send('Uh Oh! Internal server error');
  });

  app.use(function(req, res) {
    res.status(404);
    res.redirect('/error/404')
  });
};

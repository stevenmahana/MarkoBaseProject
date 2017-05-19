require('marko/node-require').install();
require('marko/browser-refresh').enable();
require('lasso/browser-refresh').enable('*.marko *.css *.less *.styl *.scss *.sass *.png *.jpeg *.jpg *.gif *.webp *.svg');

process.env.NODE_ENV = 'development';

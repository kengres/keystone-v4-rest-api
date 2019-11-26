const keystone = require('keystone');
const importRoutes = keystone.importer(__dirname);

const apiPrefix = '/api/v1'

const routes = {
  api: importRoutes('./api'),
};

exports = module.exports = function (app) {
  // app.get('/', ((req, res, next) => res.redirect('/keystone')));
  // * API
  // app.all(apiPrefix +'/*', [keystone.middleware.api, keystone.middleware.cors]);
  app.get(apiPrefix +'/todos', routes.api.todos.list);
  // app.get(apiPrefix +'/lines', [keystone.middleware.api, keystone.middleware.cors], routes.api.lines.list);
  // app.get(apiPrefix +'/lines/:number', [keystone.middleware.api, keystone.middleware.cors], routes.api.lines.get);
  // app.get(apiPrefix +'/stations', [keystone.middleware.api, keystone.middleware.cors], routes.api.stations.list);
  // app.get(apiPrefix +'/station', [keystone.middleware.api, keystone.middleware.cors], routes.api.stations.get);
};
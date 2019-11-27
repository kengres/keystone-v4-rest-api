const keystone = require('keystone');
const importRoutes = keystone.importer(__dirname);

const apiPrefix = '/api/v1'

const routes = {
  api: importRoutes('./api'),
};

exports = module.exports = function (app) {
  // * API
  app.get(apiPrefix + '/posts', routes.api.posts.list);
  app.get(apiPrefix + '/posts/:id', routes.api.posts.getOne);
  app.post(apiPrefix + '/posts', routes.api.posts.create);
  app.put(apiPrefix + '/posts/:id', routes.api.posts.update);
  app.delete(apiPrefix + '/posts/:id', routes.api.posts.delete);
};
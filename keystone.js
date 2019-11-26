const keystone = require('keystone');
require("dotenv").config();

keystone.init({
  "cookie secret": process.env.COOKIE_SECRET,
  name: "blog-api",
  "user model": "User",
  "auto update": true,
  auth: true,
  port: process.env.PORT
});
keystone.import('models'); // models directory

keystone.set('routes', require('./routes')); // Keystone routes

keystone.start(); // Start keystone

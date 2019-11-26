const keystone = require('keystone');
const Types = keystone.Field.Types;

const User = new keystone.List('User', {
  map: { name: 'firstName' },
});

User.add({
  firstName: { type: String },
  lastName: { type: String },
  password: { type: Types.Password },
  email: { type: Types.Email, unique: true },
  roles: { type: Types.Select, options: ['admin', 'editor', 'super'] }
});

User.schema
  .virtual('canAccessKeystone')
  .get(function () {
    return this.roles.includes('admin');
  });

User.defaultColumns = 'firstName, lastName, email, roles';

User.register();
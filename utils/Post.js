var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true },
  defaultSort: '-publishedDate',
  track: true,
});

var myStorage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  fs: {
    path: keystone.expandPath('./assets/public/uploads/images'), // required; path where the files should be stored
    publicPath: '/uploads/images', // path where files will be served
  },
});

Post.add({
  title: { type: String, required: true },
  state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
  author: { type: Types.Relationship, ref: 'User', index: true },
  publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
  meta: {
    title: { type: String },
    description: { type: String },
  },
  content: {
    brief: { type: Types.Html, wysiwyg: true, height: 150 },
    extended: { type: Types.Html, wysiwyg: true, height: 600 },
  },
  categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
  likes: { type: Number, index: true, default: 0 },
  views: { type: Number, index: true, default: 0 },
  imageHost: { type: Types.Select, options: ['Local', 'Selectel'] },
  localImage: {
    type: Types.File,
    storage: myStorage,
    dependsOn: { imageHost: 'Local' },
  },
  remoteImage: {
    type: Types.Url,
    dependsOn: { imageHost: 'Selectel' },
  },
});

Post.schema.virtual('content.full').get(function () {
  return this.content.extended || this.content.brief;
});

Post.schema.virtual('image').get(function () {
  return {
    exist: !!this.localImage.filename || !!this.remoteImage,
    local: this.imageHost === 'Local',
    url: this.imageHost === 'Local' ? this.localImage.filename : this.remoteImage,
  };
});

Post.defaultColumns = 'title|40%, state|10%, publishedDate, views, createdAt';
Post.register();

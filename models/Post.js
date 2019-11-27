const keystone = require("keystone");
const Types = keystone.Field.Types;

/**
* Post Model
* ==========
*/

const Post = new keystone.List('Post', {
  defaultSort: '-createdAt',
  map: { name: 'title' },
  track: true,
  autokey: { path: 'slug', from: 'title', unique: true }
});

Post.add({
  title: { type: String, required: true, initial: true, note: 'Post title' },
  author: { type: Types.Relationship, ref: 'User', index: true },
  status: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
  publishedAt: { type: Types.Datetime, dependsOn: { status: 'published' } },
  imageUrl: { type: Types.Url },
  description: { type: Types.Html, wysiwyg: true, height: 150 },
  content: { type: Types.Html, wysiwyg: true, height: 400 },
});

Post.defaultColumns = 'title, status, publishedAt, createdAt';

Post.register();
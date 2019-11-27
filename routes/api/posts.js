const keystone = require('keystone');

const Post = keystone.list('Post');
const User = keystone.list('User');

/**
 * List of Posts
 */

exports.list = function (req, res) {
  Post.model
    .find()
    .select('-createdBy -updatedBy -createdAt -__v')
    .exec(function (err, items) {

      if (err) return res.json({ err: err });

      res.json({
        posts: items,
      });

    });
}

/**
* Post by id
*/

exports.getOne = function (req, res) {
  Post.model
    .findById(req.params.id)
    .select('-createdBy -updatedBy -createdAt -__v')
    .exec(function (err, item) {

      if (err) return res.json({ err: err });

      res.json({
        post: item,
      });

    });
}

/**
* create A Post
*/

exports.create = function (req, res) {
  User.model
    .findById(req.body.author)
    .exec(function (err, item) {
      if (err) return res.json({ err: err });
      if (!item) return res.json({ message: 'user not found', code: 404 });
      
      req.user = item; // this add track properties in the database

      const newPost = new Post.model();

      const post = {
        title: req.body.title,
        author: req.body.author,
        status: req.body.status,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
        content: req.body.content,
      }

      // keystone uses getUpdateHandler method to create and update items
      newPost
        .getUpdateHandler(req)
        .process(post, function (err, result) {
          if (err) return res.json({ err: err });
          res.json(newPost);
        })

    })
}

/**
* Update A Post
*/

exports.update = function (req, res) {
  const post = {
    title: req.body.title,
    author: req.body.author,
    status: req.body.status,
    imageUrl: req.body.imageUrl,
    description: req.body.description,
    content: req.body.content,
  }
  User.model
    .findById(req.body.author)
    .exec(function (err, item) {
      if (err) return res.json({ err: err });
      if (!item) return res.json({ message: 'user not found', code: 404 });
      
      req.user = item; // this add track properties in the database

      Post.model
      .findById(req.params.id)
      .exec(function (err, item) {
        if (err) return res.json({ err: err });
        if (!item) return res.json({ message: 'post not found', code: 404 });
        // ADD PUBLISHED DATE
        if (post.status === 'published' && !item.publishedAt) {
          post.publishedAt = Date.now()
        }
        item
          .getUpdateHandler(req)
          .process(post, function (err, result) {
            if (err) return res.json({ err: err });
            res.json(item);
          })

      })

    })
}

/**
* Delete A Post
*/

exports.delete = function (req, res) {
  Post.model
    .findById(req.params.id)
    .exec(function (err, item) {
      if (err) return res.json({ err: err });
      if (!item) return res.json({ code: 404, message: 'Post not found' });
      item.remove(function (err) {
        if (err) return res.json({ err: err });
        res.json(item);
      })
    })
}
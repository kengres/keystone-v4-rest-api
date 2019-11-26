const keystone = require('keystone');

const Todo = keystone.list('Todo');

/**
 * List of Todos
 */

 exports.list = function (req, res) {
   Todo.model
     .find()
    //  .select('-createdBy -updatedBy -createdAt -__v')
     .exec(function (err, items) {

       if (err) return res.json({ err: err });

       res.json({
         todos: items,
       });

     });
 }
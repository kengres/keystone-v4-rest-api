const keystone = require("keystone");
const Types = keystone.Field.Types;

const Todo = new keystone.List("Todo", {
  map: { name: "title" },
  track: true // adds createdAt, createdBy, updatedAt, updatedBy
});

Todo.add({
  title: { type: String, required: true },
  dueDate: { type: Date },
  done: { type: Boolean }
});

Todo.defaultColumns = "title, createdAt, dueDate, done";

Todo.register();

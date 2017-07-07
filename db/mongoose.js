var mongoose = require('mongoose');

mongoose.Promise = global.Promise;//This tells mongoose to use the built in Promise implementation
mongoose.connect("mongodb://localhost:27017/TodoApp");

module.exports = {
  mongoose
};

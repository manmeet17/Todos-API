var mongoose = require('mongoose');

mongoose.Promise = global.Promise;//This tells mongoose to use the built in Promise implementation
let db1 = {
  localhost: "mongodb://localhost:27017/TodoApp",
};
mongoose.connect("mongodb://manmeet17:manmeet12@ds153422.mlab.com:53422/todoapp");

module.exports = {
  mongoose
};

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;//This tells mongoose to use the built in Promise implementation
let db1 = {
  localhost: "mongodb://localhost:27017/TodoApp",
};
mongoose.connect(process.env.MONGODB_URI);

module.exports = {
  mongoose
};

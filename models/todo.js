var mongoose = require('mongoose');

var Todo = mongoose.model('Todo',{
  text:{
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt:{
    type: Number,
    default: null
  }
});


// var newTodo = new Todo({
//   text: "  Do Node JS Project   ",//mongoose will typecast anything here into a String except for objects and arrays
// });

//Save returns a Promise and saves the instance
// newTodo.save().then((doc)=>{
//   console.log("Saved todo: ",doc);
// },(err)=>{
//   console.log(err);
// });


module.exports = {
  Todo
};

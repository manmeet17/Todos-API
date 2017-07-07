var mongoose = require('mongoose');

var User = mongoose.model('Users',{

  email:{
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
});



// var newUser = new Users({
//   email: "meetutarun16@gmail.com"
// });

// newUser.save().then((doc)=>{
//   console.log("Saved user: ",doc);
// },(err)=>{
//   console.log(err);
// });

module.exports = {
  User
};

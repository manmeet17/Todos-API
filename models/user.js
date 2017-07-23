var mongoose = require('mongoose');
const validator = require('validator');

var User = mongoose.model('Users',{
  email:{
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate:{
      validator: (value) =>{
        return validator.isEmail(value);
      },
      message: '{VALUE} is not a valid email'
    }
  },
  password:{
    type: String,
    required: true,
    minlength: 8
  },
  tokens:[{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]

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

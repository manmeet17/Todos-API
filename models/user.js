var mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
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

//Look into how dafuq this method worked
UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject,['_id','email']);
}

//Adds Instance methods
UserSchema.methods.generateAuthToken = function () {
  var access = 'auth';
  var token = jwt.sign({_id: this._id.toHexString(),access},'abc123').toString();

  this.tokens.push({
    access,
    token
  });

  return this.save().then(() =>{
    return token;
  });
};

var User = mongoose.model('Users',UserSchema);



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

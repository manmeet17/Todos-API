var mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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

//Model Method
UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token,'abc123');
  } catch (e) {
    // return new Promise(function(resolve, reject) {
    //   reject();
    // });

    //THis line does the exact same thing as above
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.pre('save',function (next) {
  var user = this;

  if(user.isModified('password')){
    bcrypt.genSalt(10,(err, salt) =>{
      bcrypt.hash(user.password, salt, (err, res) =>{
        user.password = res;
        next();
      });
    });
  }else {
    next();
  }
});

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

const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = "123abc";

//Hashing the password
// bcrypt.genSalt(10,(err, salt) =>{
//   bcrypt.hash(password, salt, (err,hash) =>{
//     console.log(hash);
//   });
// });

//If someone logs in ,checking password with hashes
var hashedPassword = "$2a$10$Nn.ahR3CdCayrb9Ik2eQGu25Lf5OEK7Kx3WTvFGXlqT2fN3CmPxXu";
bcrypt.compare(password, hashedPassword,(err, res) =>{
  console.log(res);
});


// console.log("Encryted: "+SHA256("This is a message").toString());

// var data={
//   id: 10
// };

//.sign takes data with user id and signs it creating the hash and returns the token value
// var token = jwt.sign(data,'123abc')
//Send this token to the user when they sign up or login
//It is also the value we store inside the tokens arrau
// console.log(token);

//verifys the token and secret and make sures data was not manipulaed
// var decode = jwt.verify(token,'123abc');
// console.log(decode);

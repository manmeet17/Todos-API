const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
// console.log("Encryted: "+SHA256("This is a message").toString());

var data={
  id: 10
};

//.sign takes data with user id and signs it creating the hash and returns the token value
var token = jwt.sign(data,'123abc')
//Send this token to the user when they sign up or login
//It is also the value we store inside the tokens arrau
console.log(token);

//verifys the token and secret and make sures data was not manipulaed
var decode = jwt.verify(token,'123abc');
console.log(decode);

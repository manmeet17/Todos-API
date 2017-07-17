const {ObejctID} = require('mongodb');
const {mongoose} = require('./../db/mongoose');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');

//Todo.remove()
//Cant pass in an empty argument and expect our documents to get removed like find() in server.js
//To do so we need to do something like Todo.remove({})
//Return an n,ok property showing the number of items deleted
// Todo.remove({}).then((res) =>{
//   console.log(res);
// });

//This will return the document we deleted
//Todo.findOneAndRemove()
//Todo.findByIdAndRemove()

Todo.findOneAndRemove({_id:'59614a11fa9da23d855afdfe'}).then((res)=>{
  console.log(res);
});
//Both these functions do the same thing
Todo.findByIdAndRemove('59614a11fa9da23d855afdfe').then((res) =>{
  console.log(res);
});

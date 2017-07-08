const {ObejctID} = require('mongodb');
const {mongoose} = require('./../db/mongoose');
const {Todo} = require('./../models/todo');

var id  = '596120a01ca5d72906508528';

//When id doesnt exist in the database it only returns null as the result and not an error
if(!ObejctID.isValid(id)){
  console.log('ID not valid');
}

Todo.find({
  _id: id //mongoose converts this string to ObjjectID for us unlike mongodb
}).then((todos) => {
  console.log("Todos",todos);
});

Todo.findOne({
  _id: id //mongoose converts this string to ObjjectID for us unlike mongodb
}).then((todos) => {
  console.log("Todo",todos);
});

Todo.findById(id).then((todos) => {
  if(!todos){
    return console.log("Id not found");//This is for the case when the id is valid but doesnt exists in the database
  }
  console.log("Todo by ID",todos);
}).catch((e)=> console.log(e));//This catch block is for the case when the id is invalid , coz the id too follows a protocol

// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');


// Create new object id's
// var x = new ObjectID();
// console.log(x);

//ES6 Object Destructuring
// var user = {name: 'Manmeet',age: 19};
// var {name}=user;
// console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
  if(err){
    return ("Error connecting to the database");
  }
  console.log("Success in connection");

//    deleteMany
//    Return an n,ok property showing the number of items deleted
db.collection("Todos").deleteMany({name: "Eat dinner"}).then((res)=>{
  console.log(res);
});
db.collection("Users").deleteMany({Name: "Manmeet Tarun"}).then((res)=>{
  console.log(res);
});

//    deleteOne
//    Return an n,ok property showing the number of items deleted

db.collection("Todos").deleteOne({name: "Eat dinner"}).then((res)=>{
  console.log(res);
});


  //findOneAndDelete
  //Can be used to delete with id , it also returns the deleted data back
  //Returns a value object which has the document we deleted
db.collection("Todos").findOneAndDelete({completed: false}).then((res)=>{
  console.log(res);
});
db.collection("Users").findOneAndDelete({_id: new ObjectID("595e7fb1fb985f2f8cb15161")}).then((res)=>{
  console.log(res);
});
  db.close();
});

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
  console.log("Success");
  //
  db.collection('Todos').insertOne({
    text: "Just added",
    completed: false
  },(err,res)=>{
    if(err)
    return console.log("Unable to insert todo",err);
    console.log(JSON.stringify(res.ops,undefined,2));
  });

  db.collection("Users").insertOne({
    Name: "Ken Wilson",
    age: "38",
    location: 'Amsterdam',
  },(err,res)=>{
    if(err)
    return console.log("Unable to insert todo",err);
    console.log(JSON.stringify(res.ops[0]._id,undefined,2));
  });
  db.close();
});

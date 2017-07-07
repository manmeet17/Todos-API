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


  //findOneAndUpdate, see the documentation as it takes the update operators and a lot more parameters
  db.collection("Users").findOneAndUpdate({Name:"Ken Wilson"},{
    $set:{
      Name: "Bhavishya Tarun"
    }, //These are the update operators, see docs
    $inc:{
      age: 5
    }
  },{
    returnOriginal: false //to return updated document and not the original one, see docs if in doubt
  }).then((res)=>{
    console.log(res);
  });

  db.close();
});

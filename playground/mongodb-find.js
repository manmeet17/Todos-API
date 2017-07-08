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

//Fetch all todos in the collection
//.find() returns a mongodb cursor, its not the actual documents themselves ,its actually a pointer to the documents
//Inside find we can pass a query(Query object), we can pass an object to fetch only those particular documents which have that key:value pair
//toArray() returns a promise
// console.log(db.collection("Todos").find());
//find(_id:"595e3ab9f2cc1f2127509638") cant do this coz id is an ObjectID and not a string
db.collection("todos").find({
  _id: ObjectID("596120a01ca5d72906508529")
}).toArray().then((doc)=>{
  console.log("Success");
  console.log(JSON.stringify(doc,undefined,2));
},(err)=>{
  console.log("Unable to fetch",err);
});

db.collection("Users").find({
  Name: "Ken Wilson"
}).toArray().then((doc)=>{
  console.log("Success");
  console.log(JSON.stringify(doc,undefined,2));
},(err)=>{
  console.log("Unable to fetch",err);
});


db.collection("Todos").find().count().then((doc)=>{
  console.log("Todos Count: ",doc);
},(err)=>{
  console.log("Unable to fetch",err);
});

  db.close();
});

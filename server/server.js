require('../config/config')
var express=require('express');
const _ = require('lodash');
var bodyParser=require('body-parser');
const {ObjectID} = require('mongodb');
var {mongoose}=require("../db/mongoose");
var {Todo}=require("../models/todo");
var {User}=require("../models/user");
const port = process.env.PORT || 3000;
var app=express();

app.use(bodyParser.json());//SEE NOTES

//Add new todos to the database
//Sends JSON data to express application
//This set up our first(for now) HTTP endpoint
app.post('/todos',(req,res)=>{
  console.log(req.body);
  // body gets stored by body-parser
  var todo = new Todo({
    text: req.body.text,
    completed: req.body.completed,
    completedAt: req.body.completedAt
  });

  todo.save().then((doc)=>{
    res.send(doc)
  },(e)=>{
    res.status(400).send(e);
  })
});

//Mongoose returns an array for find() function but mongodb driver didnt so thats why we used toArray()
app.get('/todos',(req, res) =>{
  Todo.find().then((todos) =>{
    res.send({todos});
  },(e) =>{
    res.status(400).send(e);
  });
});

app.get('/todos/:id',(req, res) =>{
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) =>{
    if(!todo){
      console.log("Couldnt find");
      return res.status(404).send();
    }
    res.send({todo});
  },(e) =>{
    res.status(400).send(e);
  });
});

app.delete('/todos/:id',(req, res) =>{
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send("Not a valid id");
  }
  Todo.findByIdAndRemove(id).then((todo) =>{
    if(!todo){
      console.log("Couldnt find the todo");
      res.status(404).send();
    }
    res.send({todo});
  },(e) =>{
    res.status(400).send();
  });
});

app.patch('/todos/:id',(req,res) =>{
  var id = req.params.id;
  var body = _.pick(req.body,['text','completed']);

  if(!ObjectID.isValid(id)){
    return res.status(404).send("Not a valid id");
  }

  if(_.isBoolean(body.completed) && body.completed)
  {
    body.completedAt = new Date().getTime();
  }else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set:body},{new:true}).then((todo) =>{
    if(!todo)
    return res.status(404).send();
    return res.send({todo});
  }).catch((e) =>{
    res.status(400).send();
  });
});

app.post('/users',(req, res) =>{
  var body = _.pick(req.body,['email','password']);
  var user = new User(body);

  //Model method
  //Custon model method we create
  // User.findByToken()

  //Instance method, works on the objects we create
  // user.generateAuthToken()


  user.save().then(()=>{
    // res.send(user);
    return user.generateAuthToken();
  }).then((token)=>{
    // Send token back as an http response header
    //x-auth is a custom header to store jwt token
    res.header('x-auth',token).send(user);
  }).catch((err)=>{
    res.status(400).send(err);
  });
});

app.listen(port,()=>{
  console.log(`Started up at port ${port}`);
});

module.exports = {
  app
};

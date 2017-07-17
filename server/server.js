var express=require('express');
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
  // var newTodo = new Todo({
  //   text: req.body.text
  // });
  // newTodo.save().then((doc)=>{
  //   res.send(doc);
  // },(e)=>{
  //   res.status(400).send(e);
  // });

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

app.listen(port,()=>{
  console.log(`Started up at port ${port}`);
});

module.exports = {
  app
};

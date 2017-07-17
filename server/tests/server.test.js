const request = require('supertest');
const expect = require('expect');
const {ObjectID} = require('mongodb');
const {app} = require("./../server");
const {Todo} = require("./../../models/todo");//To look at the mongo database

const todos = [
  {
    text: 'First test todo',
    _id: new ObjectID()
  }, {
    text: 'Second test todo',
    _id: new ObjectID()
  }];

beforeEach((done)=>{
  Todo.remove({}).then(()=>{
    return Todo.insertMany(todos);//Return because it returns a promise
  }).then(() => done());
});

describe('POST/todos',()=>{
  it('should create a new todo',(done)=>{
    var text = 'Test todo text';
    request(app)
      .post('/todos')
      .send({text})//Supertest automatically converts it to JSON
      .expect(200)
      .expect((res) =>{
        expect(res.body.text).toBe(text);
      })
      .end((err,res) =>{
        if(err){
          return done(err);
        }
        Todo.find({text}).then((todos)=>{
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e)=> done(e));
      });
  });

  it('should not create todo on bad data',(done)=>{
    request(app)
      .post("/todos")
      .send({})//This is the response data, we send from the client to the server
      .expect(400)
      .end((err,res)=>{//Doing async action here , hence needed the arrow function
        if(err){
          return done(err);
        }
        Todo.find().then((todos)=>{
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      })
  });
});

describe('GET /todos',() =>{
  it('should get all the todos',(done) =>{
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) =>{
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id',() =>{
  it('should return todo doc',(done) =>{
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) =>{
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found',(done) =>{
    var testId = new ObjectID();
    request(app)
      .get(`/todos/${testId.toHexString()}`)
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todos/:id',() =>{
  it('should remove a todo',(done) =>{
    var hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) =>{
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err,res) =>{
        if(err)
        return done(err);
        Todo.findById(hexId).then((todo) =>{
          expect(todo).toNotExist();
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return 404 if todo not found',(done) =>{
    var testId = new ObjectID();
    request(app)
      .delete(`/todos/${testId.toHexString()}`)
      .expect(404)
      .end(done);
  });

  // it('should return 404 if object is invalid',(done) =>{
  //
  // });
});

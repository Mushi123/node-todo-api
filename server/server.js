//Need to use different environments for development production and testing
//need to use NODE_ENV env var that exists only on heroku not on local machine
//it has 3 different possible alues like production,development and test
//need to configure NODE_ENV inside package.json for our dev and test envs
//then we can configure our app depending on the env we are in. If we are in dev we use 1 db and another db when we are in test env




require('./config/config.js')
const {mongoose}=require('./db/mongoose');
const _=require('lodash')
const express=require('express');
const bodyParser=require('body-parser');//take your json and convert into object attaching it to body of req
const {ObjectID}=require('mongodb');
const {Todo}=require('./models/todo');
const {User}=require('./models/user');

var app=express();
const port=process.env.PORT
app.use(bodyParser.json());//with this we can now send json to our express app
app.post('/todos',(req,res) =>{
  var todo=new Todo({
    text:req.body.text
  })
  todo.save().then((doc) => {
    res.status(201).send(doc);
  },(err) => {
    if(err){
      res.status(400).send(err);
    }
  })
});
app.get('/todos',(req,res) => {
  Todo.find().then((todos) => {
    console.log(todos);
    res.send({todos})
  },(err) => {
    if(err){
      res.status(400).send(e);
    }
  })
})

app.get('/todos/:id',(req,res) => {
  //res.send(req.params);
  var id=req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send({})
  }

  Todo.findById(id).then((todo) => {
    if(!todo){
      return res.status(404).send({});
    }
    res.send({todo});
  },(e) => {
    res.status(400).send({});
  })
 })

app.delete('/todo/:id',(req,res) => {
  var id=req.params.id;
  if(!ObjectID.isValid(id)){
    res.send(404);
  }
  Todo.findByIdAndRemove(id).then((todo) => {
    if(!todo){
      return res.send(404);
    }
    res.status(200).send({todo});
  }).catch((e) => {
    res.status(400).send({});
  })
})

app.patch('/todo/:id',(req,res) => {
  var id=req.params.id;
  var body = _.pick(req.body,['text','completed']);
  if(!ObjectID.isValid(id)){
    res.send(404);
  }
  if(_.isBoolean(body.completed)&&body.completed){
    body.completedAt=new Date().getTime();
  }else{
    body.completed=false;
    body.completedAt=null;
  }

  Todo.findByIdAndUpdate(id,{
    $set:body//body is an object
  },{new:true}).then((todo) => {
    if(!todo){return res.send(404)}
    res.send({todo})
  }).catch((e) => {
    res.send(400)
  })
})
app.listen(port,() => {
  console.log(`Server up on port ${port}`);
});

module.exports={app}

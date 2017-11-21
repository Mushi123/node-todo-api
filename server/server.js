var {mongoose}=require('./db/mongoose');
var express=require('express');
var bodyParser=require('body-parser');//take your json and convert into object attaching it to body of req
const {ObjectID}=require('mongodb');
var {Todo}=require('./models/todo');
var {User}=require('./models/user');

var app=express();
const port=process.env.PORT||3000
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


app.listen(port,() => {
  console.log(`Server up on port ${port}`);
});

module.exports={app}

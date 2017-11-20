var {mongoose}=require('./db/mongoose');
var express=require('express');
var bodyParser=require('body-parser');//take your json and convert into object attaching it to body of req

var {Todo}=require('./models/todo');
var {User}=require('./models/user');

var app=express();
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




app.listen(3000,() => {
  console.log("Server up");
});

module.exports={app}

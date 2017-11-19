const {MongoClient,ObjectID}=require('mongodb');
// var obj=new ObjectID();
// console.log(obj);
//ObjectID ctro func allows us to create objectids on the fly
//const MongoClient=require('mongodb').MongoClient;
// var user={name:"Mush",age:21}
// var {name}=user;//object destructuring
// console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
  if(err){
    return console.log('Unable to connect to server');
  }
  console.log('Connected to MongoDB server');
  // db.collection('Users').insertOne({
  //   name: "Mush",
  //   age: 21,
  //   location: "Lubbock"
  // },(err,res) => {
  //   if(err){
  //     return console.log("Can't create document",err);
  //   }
  //   console.log(res.ops[0]._id.getTimestamp());
  // });
  // db.collection('Todos').insertOne({
  //   text: "Something to do",
  //   completed: false
  // },(err,res) => {
  //   if(err){
  //     return console.log("Can't create document",err);
  //   }
  //   console.log(JSON.stringify(res.ops,undefined,2));//res.ops has the array of docs  })
  db.close();
})

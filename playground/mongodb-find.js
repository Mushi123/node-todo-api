const {MongoClient,ObjectID}=require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
  if(err){
    return console.log('Unable to connect to server');
  }
  console.log('Connected to MongoDB server');
  db.collection('Users').find({
    name: "Mush"
  })//returns a mongodb cursor. Like a ptr to docs
  .count()//returns a promise
  .then((c) => {
    console.log("Users",c);
    //console.log(JSON.stringify(docs,undefined,2));
  },(err) => {
    console.log("Unable to fetch",err);
  })
  // db.collection('Todos').find()//returns a mongodb cursor. Like a ptr to docs
  // .count()//returns a promise
  // .then((count) => {
  //   console.log("Todos count: ",count);
  //   //console.log(JSON.stringify(docs,undefined,2));
  // },(err) => {
  //   console.log("Unable to fetch",err);
  // })
  // db.collection('Todos').find({
  //   _id: new ObjectID("5a11de488edfac3c58d03b11")
  // })//returns a mongodb cursor. Like a ptr to docs
  // .toArray()//returns a promise
  // .then((docs) => {
  //   console.log("Todos");
  //   console.log(JSON.stringify(docs,undefined,2));
  // },(err) => {
  //   console.log("Unable to fetch",err);
  // })
  //db.close();
})

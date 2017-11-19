const {MongoClient,ObjectID}=require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
  if(err){
    return console.log('Unable to connect to server');
  }
  console.log('Connected to MongoDB server');
  db.collection("Users").findOneAndUpdate({
    name:"Mike"
  },{
    $set:{
      name:"Mush"
    },
    $inc:{
      age:1
    }
  },{
    returnOriginal:false
  })
  .then((res) => {
    console.log(res);
  })
  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID("5a11e8b38edfac3c58d03e81")//look up mongodb update operators
  // },{
  //   $set:{
  //     completed:true
  //   }
  // },{
  //   returnOriginal: false
  // })//returns a promise if no callback is passed in
  // .then((res) => {
  //   console.log(res);
  // })
  //db.close();
})

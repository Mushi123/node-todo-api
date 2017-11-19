const {MongoClient,ObjectID}=require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
  if(err){
    return console.log('Unable to connect to server');
  }
  console.log('Connected to MongoDB server');
  //deleteMany
  // db.collection('Todos')
  // .deleteMany({text:"Eat lunch"})
  // .then((res) => {
  //   console.log(res);
  // })

  // //deleteOne
  // db.collection('Todos')
  // .deleteOne({text:"Eat lunch"})
  // .then((res) => {
  //   console.log(res);
  // })
  //
  //findOneAndDelete
  // db.collection('Todos')
  // .findOneAndDelete({completed:false})
  // .then((res) => {
  //   console.log(res);
  // })
  // db.collection('Users')
  // .deleteMany({name:"Mush"})
  // .then((res) => {
  //   console.log(res);
  // })
  db.collection('Users')
  .findOneAndDelete({_id: new ObjectID("5a11d5a9fef6c40dc81ad1f8")})
  .then((res) => {
    console.log(res);
  })

  //db.close();
})

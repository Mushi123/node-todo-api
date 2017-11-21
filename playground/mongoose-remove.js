const {mongoose}=require('./../server/db/mongoose')
const {Todo}=require('./../server/models/todo')
const {User}=require('./../server/models/user')
const {ObjectID}=require('mongodb');

// Todo.remove({}).then((res) => {
//   console.log(res);
// })

Todo.findOneAndRemove({_id:'5a13a89e8015845dc971beeb'}).then((todo) => {
  console.log(todo);
})

Todo.findByIdAndRemove('5a13a89e8015845dc971beeb').then((todo) => {
  console.log(todo);
})

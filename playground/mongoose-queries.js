const {mongoose}=require('./../server/db/mongoose')
const {Todo}=require('./../server/models/todo')
const {User}=require('./../server/models/user')
const {ObjectID}=require('mongodb');
 var id='5a123ee6754f2048210dd3a4';
if(!ObjectID.isValid(id)){
  console.log("Id not valid");
}
 // Todo.find({
 //   _id:id//no need to manually convert string to objectid
 // }).then((docs) => {
 //   console.log(docs);
 // })
 //
 // Todo.findOne({
 //   _id:id//no need to manually convert string to objectid
 // }).then((doc) => {
 //   console.log(doc);
 // })

 User.findById(id).then((doc) => {
   if(!doc)return console.log("Id not found");
   console.log(doc);
 }).catch((e) => {
   console.log(e);
 })

const {SHA256}=require('crypto-js');
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs');

var password='123abc!'
// bcrypt.genSalt(10,(err,salt) => {
//   bcrypt.hash(password,salt,(err,hash) => {
//     console.log(hash);
//   })
// })

var hashedPassword='$2a$10$tH7LXyYumDikSuiQYe/5tejmNukmMxTYLAIyqnbJKrIrYhQUKudAu'
bcrypt.compare(password,hashedPassword,(err,res) => {
  console.log(res);
})






// var data={
//   id:10,
//   access:'auth'
// };
// var token=jwt.sign(data,'123abc');//returns crytographic string
// console.log(token);
//
// var decoded=jwt.verify(token,'123abc')
// console.log("Decoded",decoded);



// var message='I am user number 3'
// var hash=SHA256(message).toString();
// console.log(`message: ${message}`);
// console.log(`hash: ${hash}`);

// var data={//data we wanna send back from server to client
//   id: 4
// };
// var token={
//   data,
//   hash: SHA256(JSON.stringify(data)+'somesecret').toString()//hasehd value of the data object
// }
//
// // token.data.id=5;
// // token.hash=SHA256(JSON.stringify(token.data)).toString();
// //salting strengthens the hash. Basically just adds random string onto the string we wanna hasehd
// var resultHash=SHA256(JSON.stringify(token.data) +'somesecret').toString();
//
// if(resultHash===token.hash){
//   console.log('data was not changed');
// }else{
//   console.log('Data was changed.');
// }

var env = process.env.NODE_ENV || 'development'

if(env==='development'||env==='test'){
  //when you require a JSON, it's auto parsed to a JS OBject
  var config=require('./config.json');
  var envConfig=config[env];

  Object.keys(envConfig).forEach((key) => {
    process.env[key]=envConfig[key];
  });//gets all keys and returns them in an array

  //console.log(typeof(process.env.JWT_SECRET));
}
// if(env==='development'){
//   process.env.PORT=3000
//   process.env.MONGODB_URI='mongodb://localhost:27017/TodoApp'
// }else if(env==='test'){
//   process.env.PORT=3000
//   process.env.MONGODB_URI='mongodb://localhost:27017/TodoAppTest'
// }

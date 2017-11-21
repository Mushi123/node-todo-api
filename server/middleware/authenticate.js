var {User}=require('./../models/user')

var authenticate=(req,res,next) => {
  var token=req.header('x-auth')
  User.findByToken(token).then((user) => {
    if(!user){
      return Promise.reject();//will fire the catch block below
    }
    req.user=user;
    req.token=token;
    next();
  }).catch((e) => {
    res.send(401)
  })
}
module.exports={authenticate}

const mongoose=require('mongoose')
const validator=require('validator')
const jwt=require('jsonwebtoken')
const _=require('lodash')
const bcrypt=require('bcryptjs')

var UserSchema=new mongoose.Schema({
  email:{
    type:String,
    required:true,
    trim:true,
    minLength:1,
    unique:true,
    validate:{
      validator:validator.isEmail,
      message:'{VALUE} is not a valid email'
    }
  },
  password:{
    type:String,
    required:true,
    minlength:6
  },
  tokens:[{//so tokens is an array of 1 object and that one obj will have 2 props:
          //access and token
    access:{
      type:String,
      required:true
    },
    token:{
      type:String,
      required:true
    }
  }]
});
UserSchema.methods.toJSON=function(){//toJSON is the function that determines how we wanna return the user doc and we can override this function
  var user=this;
  var userObj=user.toObject();
  return _.pick(userObj,['_id','email'])
}
UserSchema.methods.generateAuthToken=function(){
  var user=this;
  var access='auth';
  var token=jwt.sign({_id:user._id.toHexString(),access},'abc123').toString();
  user.tokens.push({access,token});

  return user.save().then(() => {//returning a promise
     return token;//returning this value will get passed as the success arg to the next then call wou wanna chain on this then call
  })//we return the token so that in the server.js file we can grab the token by tacking on another then callback getting access to
  //the token. here what the return token statement does is that it turns the entire
  /*user.save().then(() => {

  }) block into the value of the token we are returning*/
};//instance methods. Have access to individual docs. Need access to this keyword
//sicne the this keyword references the individual doc so can't use arrow function here

UserSchema.methods.removeToken=function(token){
  var user=this;
  return user.update({
    $pull:{
      tokens:{
        token:token
      }
    }
  })
}
UserSchema.statics.findByToken=function(token){
  var User=this;
  var decoded;
  try {
    decoded=jwt.verify(token,'abc123');//decoded gives me object that was passed to jwt sign
  } catch (e) {
    // return new Promise((resolve,reject) => {
    //   reject();
    // })
    return Promise.reject()
  }

  return User.findOne({
    '_id':decoded._id,
    'tokens.token':token, //querying a nested doc
    'tokens.access':'auth'
  })//Now this is returning a promise
};

UserSchema.statics.findByCredentials=function(email,password){
  var User=this;
  return User.findOne({email}).then((user) => {
    if(!user) return Promise.reject();
    return new Promise((resolve,reject) => {
      bcrypt.compare(password,user.password,(err,res) => {
        if(res)resolve(user)
        else reject();
      })
    })
  })
}

UserSchema.pre('save',function(next){
  var user=this;
  if(user.isModified('password')){
    bcrypt.genSalt(10,(err,salt) => {
      bcrypt.hash(user.password,salt,(err,hash) => {
        user.password=hash;
        next();
      })
    })

  }else{
    next();
  }
})


var User=mongoose.model('User',UserSchema);
module.exports={User}

const mongoose = require('mongoose');
mongoose.Promise=global.Promise;
mongoose.connect(process.env.MONGODB_URI);//we are left with just a refernece to the env var
module.exports={mongoose}

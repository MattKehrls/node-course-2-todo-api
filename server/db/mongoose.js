var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
// mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};

//Starts the local MongoDB
//mongod.exe --dbpath /Users/Matt/Documents/Nodejs/mongo-data
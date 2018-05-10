const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Todo.findOneAndRemove().then((result) => {

// });

Todo.findByIdAndRemove('5af4acefb3c06f73152c2efa').then((todo) => {
    console.log(todo);
});



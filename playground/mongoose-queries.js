const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5aea11a4f78fceac43d169eb';

User.findById(id).then((theid) => {
    if(!theid) {
        return console.log('USER not found!');
    }
    console.log('User by id: ', theid);
}, (e) => {
    return console.log(e);
});





// if(!ObjectID.isValid(id)){
//     console.log('ID is not valid!');
// }



// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos: ', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo: ', todo);
// });

// Todo.findById(id).then((theid) => {
//     if(!theid) {
//         return console.log('Id not found!');
//     }
//     console.log('Todo by id: ', theid);
// }).catch((e)=>console.log(e));
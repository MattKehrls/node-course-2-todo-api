const {ObjectID} = require('mongodb');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');
const jwt = require('jsonwebtoken');

const userOneID = new ObjectID();
const userTwoID = new ObjectID();
const users = [{
    _id: userOneID,
    email: 'matt@gmail.com',
    password: 'password',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneID, access: 'auth'}, 'abc123').toString()
    }]
}, {
    _id: userTwoID,
    email: 'kehrls@gmail.com',
    password: 'password2'
}]

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
},{
    _id: new ObjectID(),
    text: 'First test todo',
    completed: true,
    completedAt: 333
}];


const populateTodos = (done) => {
    Todo.remove({}).then(() => { //removes all records
        return Todo.insertMany(todos);
    }).then(() => done());
};

const populateUsers = (done) => {
    User.remove({}).then(() => {
       var userOne = new User(users[0]).save();
       var userTwo = new User(users[1]).save();

       Promise.all([userOne, userTwo]);//Takes an array of promises, the then callback wont get fired until all promises passed in are resolved(saved to DB) passes it to the calling functions callback
    }).then((e) => done(e));
};

module.exports = {todos, populateTodos, users, populateUsers}




var express = require('express');
var bodyparser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyparser.json());

app.post('/todos', (req, res) => {
    // console.log(req.body);
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);

    });
});

app.listen(3000, () => {
    console.log('Started on port 3000');
})

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {//first is the success function and the results that get passed in from find method. Second is the error function
        res.send({todos})
    }, (e) => {
        res.stauts(400).send(e);
    });
});

module.exports = {app};



// var otherTodo = new Todo({
//     text: 'Feed the cat',
//     completed: true,
//     completedAt: 123
// });

// otherTodo.save().then((doc) => {
//     console.log("Saved Todo", doc);
// },(err) => {
//     console.log("There has been an error");
// });

// var newTodo = new Todo({
//     text: 'Cook Dinner'
// });

// newTodo.save().then((doc) => {
//     console.log("Saved Todo", doc);
// },(err) => {
//     console.log("There has been an error");
// });

// setTimeout(() => {db.close();}, 500);
require('./config/config.js');

const _ = require('lodash');
var express = require('express');
var bodyparser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');


var app = express();
const port = process.env.PORT;

app.use(bodyparser.json());

app.post('/todos', authenticate, (req, res) => {
    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });
    console.log(req.body.text);
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);

    });
});

app.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then((todo) => {//first is the success function and the results that get passed in from find method. Second is the error function
        res.send({todo})
    }, (e) => {
        res.status(400).send(e);
    });
});


app.get('/todos/:id', authenticate, (req, res) => {
    // res.send(req.params.id);
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Todo.findOne({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }, (e) => {
        res.status(400).send();
    });
});


app.delete('/todos/:id', authenticate, async (req, res) => {
    try {
        var id = req.params.id;
        if(!ObjectID.isValid(id)){
            return res.status(404).send();
        } 
    const todo = await Todo.findOneAndRemove({_id: id, _creator: req.user._id});
    if(!todo) {
        return res.status(404).send();
    }

    res.send({todo});


    } catch (e) {
        res.status(400).send();
    }
});


app.patch('/todos/:id',  authenticate, (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text','completed']);

    var id = req.params.id; 
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false; //Setting values in the DB
        body.completedAt = null;// Setting it null removes the value from the DB
    }

    Todo.findOneAndUpdate({_id: id, _creator: req.user._id}, {$set: body}, {new: true}).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    });
});

app.get('/users', (req, res) => {
    User.find().then((users) => {
        res.send({users})
    }, (e) => {
        res.status(400).send(e);
    });
});



app.post('/users', async (req, res) => { //SIGN_UP WORKS
    try {
        var body = _.pick(req.body, ['email','password']);
        var user = new User(body);
        await user.save()
        const token = await user.generateAuthToken();
        res.header('x-auth', token).send(user);
    } catch (e) {
         res.status(400).send(e);
    }
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user)


    // var token = req.header('x-auth'); //Middle-ware above took over(authenticate)

    // User.findByToken(token).then((user) => {
    //     if (!user) {
    //         return Promise.reject();
    //     }
    //     res.send(user);

    // }).catch((e) => {
    //     res.status(401).send();
    // });

});

app.delete('/users/me/token', authenticate, async (req, res) => {
    try {
        await req.user.removeToken(req.token);
        res.status(200).send();
    } catch (e) {
        res.status(400).send();
    }
});



app.post('/users/login', async (req, res) => {
    try {
        const body = _.pick(req.body, ['email','password']);
        const user = await User.findByCredentials(body.email, body.password);
        const token = await user.generateAuthToken();
        res.header('x-auth', token).send(user);
    } catch (e) {
         res.status(400).send();
    }
});



app.listen(port, () => {
    console.log(`Started up @ ${port}`);
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
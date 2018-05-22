const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {ObjectID} = require('mongodb');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe ('POST /todos', () => {
    it('Should create a new Todo', (done) => {
        var text = 'Test todotext';

        request(app) //request is part of supertest to do requests
            .post('/todos')//must add .send() after .post to send the data
            .send({text})//gets convered to JSON from supertest
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {//
                if(err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(3);
                    // expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    // it("Should not create todo with invaild body data", (done) => {

    // });

});


describe('GET /users/me', () => {
    it('should return user if authenticated', (done) => {
        request(app)
        .get('/users/me')
        .set('x-auth', users[0].tokens[0].token)
        .expect(200)
        .expect((res) => {
            expect(res.body._id).toBe(users[0]._id.toHexString());
            expect(res.body.email).toBe(users[0].email);
        })
        .end(done);
    });

    it('should return 401 if NOT authenticated', (done) => {
        request(app)
        .get('/users/me')
        .expect(401)
        .expect((res) => { //custom assertion of whats coming back from the get req
            expect(res.body).toEqual({}); //when comparing an empty an object to another object, you must use .toEqual
        })
        .end(done);

    });
});


describe('POST /users', () => {
    it('should create a user', (done) => {
        var email = 'example@example.com';
        var password = '123mnb!';
        
        request(app)
            .post('/users')
            .send({email, password})
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toBeTruthy()
                expect(res.body._id).toBeTruthy()
                expect(res.body.email).toBe(email);
            })
            .end((err) => {
                if(err) {
                    return done(err);
                }

                User.findOne({email}).then((user) => {
                    expect(user).toBeTruthy();
                    expect(user).toNotBe(password);
                    done();
                })
            })
    });

    it('should return vaildation errors of request invaild', (done) => {
        request(app)
        .post('/users')
        .send({
            email: 'and',
            password: 'taco'
        })
        .expect(400)
        .end(done);
    });

    it('should not create user if email in use', (done) => {
        request(app)
        .post('/users')
        .send({
            email: 'matt@gmail.com',
            password: 'password!'
        })
        .expect(400)
        .end(done);
    });
});
















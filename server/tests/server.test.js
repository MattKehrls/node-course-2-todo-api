const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

beforeEach((done) => {
    Todo.remove({}).then(() => done());
});

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
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    // it("Should not create todo with invaild body data", (done) => {

    // });

})

















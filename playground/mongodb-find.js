const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => {
    if(err){
        return console.log("There was an error! Cant connect to the mongoDB server!");
    }
    console.log("Connected to MongoDB Server!");

    // db.collection('Todos').find({
    //     _id: new ObjectID('5ae38dd1d4268c00f45fccbf')
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    db.collection('Todos').find().count().then((count) => {
        console.log(`Todos count: ${count}`);
        
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });

    db.collection('Users').find().count().then((count) => {
        console.log(`Users count: ${count}`);
        
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });

    setTimeout(() => {db.close();}, 500);

    // db.close();
});
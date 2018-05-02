const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => {
    if(err){
        return console.log("There was an error! Cant connect to the mongoDB server!");
    }
    console.log("Connected to MongoDB Server!");

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID("5ae9e3c87f7709f8cd3508a1")
    // }, {
    //     $set: {
    //     completed : true
    //     }
    // }, 
    // {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID("5ae8d551b6bcc829a837982d")
    }, {
        $set: {
            name : "Taco!"
        },
        $inc: {
            age: 1000
        }
    }, 
    {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });


    setTimeout(() => {db.close();}, 500);
    
});




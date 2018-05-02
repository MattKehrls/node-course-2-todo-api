// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');//Same as code above, called destructsuring objects, which is taking object propertys and setting creating them as new variables. 

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => {
    if(err){
        return console.log("There was an error! Cant connect to the mongoDB server!");
    }
    console.log("Connected to MongoDB Server!");



    db.collection('Todos').insertOne({
    text: "Walk the dog",
    completed: true
    },(err, result) => {
        if(err){
            return console.log("unable to insert todo", err);
        }

        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    // db.collection('Users').insertOne({
    //     name: "Tracy",
    //     age: 25,
    //     location: "Waterloo, Ontario"
    //     },(err, result) => {
    //         if(err){
    //             return console.log("Unable to insert user", err);
    //         }
    
    //         console.log("SAVED SUCCESSFULLY" , JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
    //     });

    


    db.close();
});
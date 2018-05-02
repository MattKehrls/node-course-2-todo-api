const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => {
    if(err){
        return console.log("There was an error! Cant connect to the mongoDB server!");
    }
    console.log("Connected to MongoDB Server!");

    // db.collection('Todos').deleteMany({text: "Eat Lunch"}).then((result) => {
    //     console.log(result);
    // });

    // db.collection('Todos').deleteOne({text: "Eat Lunch"}).then((result) => {
    //     console.log(result);
    // });

    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndDelete({ _id: new ObjectID("5ae8d6e929003b3bdc8713ca")}).then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    });

    


    // db.collection('Users').deleteMany({name: "Tracy"}).then((result) => {
    //     console.log(result);
    // });





    setTimeout(() => {db.close();}, 500);
    // db.close();
});




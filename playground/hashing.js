const {SHA256} = require("crypto-js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc';

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash);
//     });
// });

var hashedPassword = '$2a$10$4Z7vIwkXLWJJgzs0BRLFku.dfOPLmL42G4ZLvLzphROUrLIxoCSTW';

bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res);
});



// var data = {
//     id: 10
// };

// var token = jwt.sign(data, '123abc'); 
// var decoded = jwt.verify(token, '123abc');
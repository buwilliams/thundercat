const bcrypt = require('bcrypt');
const saltRounds = 10;

var plainTextPassword = process.argv[2];

bcrypt.hash(plainTextPassword, saltRounds, function(err, hash) {
    console.log('Hash:', hash);
});

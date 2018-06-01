const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

var plainTextPassword = process.argv[2];

bcrypt.hash(plainTextPassword, saltRounds, function(err, hash) {
    console.log('Hash: ', hash);
});

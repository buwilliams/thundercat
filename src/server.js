const express = require('express');
const session = require('express-session');
const bodyParser = require("body-parser");
const app = express();
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const _ = require('lodash');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function readStorage() {
    var jsonStr = fs.readFileSync(path.join(__dirname, 'storage.json'), 'utf8');
    var storage = JSON.parse(jsonStr);
    return storage;
}

function writeStorage(json) {
    fs.writeFileSync(
        path.join(__dirname, 'storage.json'),
        JSON.stringify(json, null, 4), {encoding:'utf8'});
}

var storage = readStorage();

app.use('/', express.static(path.join(__dirname, 'public')));

function authorize(req, res, next) {
    // verify session
    console.log('Authorize session', req.session.auth);
    var authorized = req.session.auth;
    if(authorized === true) {
        console.log('Authorized request.');
        next();
    } else {
        console.log('Unauthorized request.');
        res.redirect('/admin/auth/login');
    }
}

app.use('/admin', session({
    secret: 'thundercat meow',
    resave: true,
    saveUninitialized: false
}));

app.use('/admin/site', [
    authorize,
    express.static(path.join(__dirname, 'admin'))
]);

app.get('/admin/', (req, res) => res.redirect('/admin/site/'));

app.use('/admin/auth/', express.static(path.join(__dirname, 'auth')));

app.get('/admin/auth/', (req, res) => res.redirect('/admin/auth/login.html'));

app.post('/admin/auth/login', (req, res, next) => {
    var email = req.body.email;
    var password = req.body.password;
    var user = _.find(storage.users, { email: email });

    if(user) {
        bcrypt.compare(password, user.encryptedPassword, function(err, result) {
            // res == true
            if(result === true) {
                req.session.auth = true;
            } else if(result === false) {
                req.session.auth = false;
            } else if(err) {
                console.log('Login Error:', err);
            }
            res.redirect('/admin/site/');
            next();
        });
    } else {
        res.redirect('/admin/auth/login');
        next();
    }
});

app.get('/admin/auth/login', (req, res) => res.redirect('/admin/auth/login.html'));

app.get('/admin/auth/logout', (req, res) => {
    // destroy session
    req.session.destroy(function() {
        res.redirect('/admin/auth/logout.html');
    })
});

app.listen(3000, () => {
    console.log('Thundercat leaping, nay, pouncing on port 3000!');
});

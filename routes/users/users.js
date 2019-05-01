var express = require('express');
var router = express.Router();
console.log("logtest");
console.log(__dirname);
const User = require('../../models/Users');
const bcrypt = require('bcryptjs');
const passport = require('passport');

router.get('/login', function (req, res, next) {
    const user = (req.user) ? req.user.name : ""; 
        res.render('login', {
        user
    });
    console.log('hello from login route');
});

//Handle Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

//Logout
router.get('/logout', (req, res) => {
    req.logOut();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/');
});

router.get('/register', function (req, res, next) {
    const user = (req.user) ? req.user.name : "";
    res.render('Register', {
        user
    });
    console.log('hello from register route');
});

router.post('/register', function (req, res, next) {
    const { name, email, password, password2 } = req.body;
    errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({ msg: "Please fill in all fields" });
    }

    if (password !== password2) {
        errors.push({ msg: "Passwords do not match" })
    }

    if (password.length < 6) {
        errors.push({ msg: 'Passord must be 6 or more characters' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
        });
    } else {
        User.findOne({email: email}).then(function (user) {
            if (user) {
                //User exists
                errors.push({ msg: "email is already registered" });
                res.render('register', {
                    errors,
                    name,
                    email,
                });
            } else {
                const newUser = new User({
                    //ES6 for name: name
                    name,
                    email,
                    password
                });
                bcrypt.genSalt(10, (err, salt) => 
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        //Set password to hashed
                        newUser.password = hash;
                        //Save user
                        newUser.save()
                            .then(user => {
                                req.flash('success_msg', 'You have successfully registered');
                                res.redirect('/users/login');
                            })
                            .catch(err => console.log(err));
                    }));
            }
        });
        
    }
});

module.exports = router;
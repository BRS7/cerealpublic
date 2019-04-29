const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users/users');
// const postsApiRouter = require('./routes/api/posts');
const postsRouter = require('./routes/posts/posts');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');


var app = express();

//Passort config
require('./config/passport')(passport);

//Mongo Atlas connect
const db = require('./config/keys').MongoURI;
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('Mongodb connected'))
    .catch(err => console.log(err));

//set template engine
app.use(expressLayouts);
app.set('view engine', 'ejs');

//static public folder for css imgs and js
const publicfolder = path.join(__dirname, '/public');
app.use(express.static(publicfolder));
app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));
app.use(express.json());

//Express session
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Bodyparser
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//apply routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/api/posts', postsApiRouter);
app.use('/post', postsRouter);

module.exports = app;

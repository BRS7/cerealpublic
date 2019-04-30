var express = require('express');
var router = express.Router();
const Posts = require('../models/Posts');
const { ensureAuthenticated, checkLogin } = require('../config/auth');
const util = require('util');

/* GET home page. */
router.get('/', function (req, res, next) {
  const user = (req.user) ? req.user.name : "";

  const posts = Posts.find({}, (err, posts) => {
    const postsvar = posts;
    res.render('index', {
      user,
      postsvar
    });
  });
});

router.get('/dashboard', ensureAuthenticated, function (req, res, next) {
  const user = (req.user) ? req.user.name : "";
  res.render('dashboard', {
    name: req.user.name,
    user
  });
});

module.exports = router;

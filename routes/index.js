var express = require('express');
var router = express.Router();
const Posts = require('/app/models/Posts');
const { ensureAuthenticated, checkLogin } = require('/app/config/auth');
const util = require('util');

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(Date().toString());
  const user = (req.user) ? req.user.name : "";
  if (req.query.search){
    const searchQuery = req.query.search;
    Posts.find({$or:[{"author":{ "$regex": searchQuery, "$options": "i" }},{"title": {"$regex": searchQuery, "$options": "i"}},{"content": {"$regex": searchQuery, "$options": "i"}}]},
      function(err,docs) {
        res.render('query',{
          docs,
          user
        });
    });
  } else {
    const posts = Posts.find({}, (err, posts) => {
      const postsvar = posts;
      res.render('index', {
        user,
        postsvar
      });
    });
  }
});
  

router.get('/dashboard', ensureAuthenticated, function (req, res, next) {
  const user = (req.user) ? req.user.name : "";
  res.render('dashboard', {
    name: req.user.name,
    user
  });
});

module.exports = router;

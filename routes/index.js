var express = require('express');
var router = express.Router();
const {ensureAuthenticated, checkLogin} = require('../config/auth');
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("hello");
  console.log(req.user)
  const user = (req.user) ? req.user.name : "";
  console.log(`user is ${user}`)
  res.render('index',{
    user
  });
});

router.get('/dashboard', ensureAuthenticated, function(req, res, next) {
  res.render('dashboard', {
    name: req.user.name
  });
});

module.exports = router;

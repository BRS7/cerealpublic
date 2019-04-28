var express = require('express');
var router = express.Router();
const {ensureAuthenticated, checkLogin} = require('../config/auth');
/* GET home page. */
router.get('/', function(req, res, next) {
  const user = (req.user) ? req.user.name : "";
  res.render('index',{
    user
  });
});

router.get('/dashboard', ensureAuthenticated, function(req, res, next) {
  const user = (req.user) ? req.user.name : "";
  res.render('dashboard', {
    name: req.user.name,
    user
  });
});

module.exports = router;

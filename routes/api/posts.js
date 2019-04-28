var express = require('express');
var router = express.Router();

//return all posts
router.get('/', (req, res, next) => {
    res.json('hello from posts route')
});
module.exports = router
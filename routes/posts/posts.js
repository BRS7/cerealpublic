var express = require('express');
var router = express.Router();
const Post = require('/app/models/posts');
const {ensureAuthenticated, checkLogin} = require('/app/config/auth');
const passport = require('passport');

router.get('/', ensureAuthenticated, (req, res) => {
    const user = (req.user) ? req.user.name : ""; 
    res.render('post', {
        user
    })
});

router.post('/', (req, res) => {
    const {title, postBody} = req.body;
    const author = req.user.name;
    errors = [];
    if(!title || !postBody){
        errors.push({msg: "Please fill in both fields"});
    }
    if(errors.length > 0) {
        return res.render('post',{
            user: "temp",
            errors,
            title,
            postBody
        })
    } else {
        const date = new Date().toLocaleString();
        console.log(`date ${date}`)
        const newPost = new Post({
            title,
            content: postBody,
            likes: 0,
            favorites: 0,
            author,
            date: date
        });
        newPost.save()
            .then(post => {
                req.flash('success_msg', 'Post successfull');
                res.redirect('/')
            })
            .catch(err => console.log(err));
    }
});

router.get('/:id', (req,res) => {
    const user = (req.user) ? req.user.name : ""; 
    const id = req.params.id;
    Post.findById(id, function (err, post) { 
        res.render('showPost', {
            user,
            post
        })
     });
})


module.exports = router;
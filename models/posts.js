const mongoose = require('mongoose');
delete mongoose.connection.models['Post'];
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    required: true
  },
  favorites: {
    type: Number,
    require: true
  },
  author: {
    type: String,
    required: true
  },
  date:{
    type: String,
    default: Date.now,
  }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
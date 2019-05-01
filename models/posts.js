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
    default: Date.now,
    require: true
  },
  author: {
    type: String,
    required: true
  }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
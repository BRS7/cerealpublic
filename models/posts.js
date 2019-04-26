const mongoose = require('mongoose');

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
    default: Date.now
  }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = User;
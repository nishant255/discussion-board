console.log("Loading user.js");
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2},
  topics: [{type: Schema.Types.ObjectId, ref: 'Topic'}],
  posts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
}, {timestamps: true});

mongoose.model('User', UserSchema);

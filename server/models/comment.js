console.log("Loading myModel.js");
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var CommentSchema = new mongoose.Schema({
  comment: { type: String, required: true, minlength: 2},
  upvote: {type: Number},
  downvote: {type: Number},
  _user: {type: Schema.Types.ObjectId, ref: 'User'},
  _post: {type: Schema.Types.ObjectId, ref: 'Post'},
}, {timestamps: true});

mongoose.model('Comment', CommentSchema);

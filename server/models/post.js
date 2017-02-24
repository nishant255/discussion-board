console.log("Loading post.js");
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var PostSchema = new mongoose.Schema({
  post: { type: String, required: true, minlength: 2},
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],  
  _user: {type: Schema.Types.ObjectId, ref: 'User'},
  _topic: {type: Schema.Types.ObjectId, ref: 'Topic'},
}, {timestamps: true});

mongoose.model('Post', PostSchema);

console.log("Loading topic.js");
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var TopicSchema = new mongoose.Schema({
  topic: { type: String, required: true, minlength: 2},
  description: { type: String, required: true, minlength: 2},
  category: { type: String, required: true, minlength: 2},
  posts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
  _user: {type: Schema.Types.ObjectId, ref: 'User'},
}, {timestamps: true});

mongoose.model('Topic', TopicSchema);

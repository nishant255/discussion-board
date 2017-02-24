console.log("Loading Serverside postController.js");

var mongoose = require('mongoose'),
    Post     = mongoose.model('Post'),
    User     = mongoose.model('User');

function PostController() {

  var _this = this;

  // -------------------------------------------------------------------------
  //                           Get all the posts
  // -------------------------------------------------------------------------
  _this.getPosts = function (req, res) {
    Post.find({}).populate('_user').populate('_topic').populate('comments').exec(function (err, posts) {
      if (err) {
        console.log("Error getting all the posts");
        console.log(err);
      } else {
        res.json(posts);
      }
    });
  };

  // -------------------------------------------------------------------------
  //                           Create Posts
  // -------------------------------------------------------------------------
  _this.createPost = function (req, res) {
    console.log("Server Says Creating Topic");
    if (!req.body.post) {
      res.json({error: "All the fields are required"});
    } else {
      User.findOne({_id: req.body.userid}, function (err, user) {
        if (err) {
          console.log("Error while finding user for Topic");
          console.log(err);
        } else {

          var topic = new Topic(req.body);
          topic._user = user._id;
          topic.save(function (err, topic) {
            user.topics.push(topic);
            user.save(function (err) {
              if (err) {
                console.log("Error While creating Topic");
                console.log(err);
              } else {
                console.log("Success fully created topic");
                res.json(topic);
              }
            });
          });
        }
      });
    }
  };
}

module.exports = new PostController();

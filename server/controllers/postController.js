console.log("Loading Serverside postController.js");

var mongoose = require('mongoose'),
    Post     = mongoose.model('Post'),
    Topic    = mongoose.model('Topic'),
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
    console.log("Server Says Creating Post");
    if (!req.body.post) {
      console.log(req.body.post);
      console.log("Error while createPost");
      res.json({error: "All the fields are required"});
    } else {
      User.findOne({_id: req.body.userid}, function (err, user) {
        if (err) {
          console.log("Error while finding user for Post");
          console.log(err);
        } else {
          Topic.findOne({_id: req.body.topicid}, function (err, topic) {
            if (err) {
              console.log("Error while finding Topic for Post");
              console.log(err);
            } else {
              var post = new Post(req.body);
              post._user = user._id;
              post._topic = topic._id;
              post.save(function (err, post) {
                if (err) {
                  console.log("Error While Saving Post");
                  console.log(err);
                } else {
                  user.posts.push(post);
                  user.save(function (err) {
                    if (err) {
                      console.log("Error While Saving User in Post");
                      console.log(err);
                    } else {
                      topic.posts.push(post);
                      topic.save(function (err) {
                        if (err) {
                          console.log("Error While Saving Topic in Post");
                          console.log(err);
                        } else {
                          console.log("Successfully saved Post");
                          res.json(post);
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  };


}

module.exports = new PostController();

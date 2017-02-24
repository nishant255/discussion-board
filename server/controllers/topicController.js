console.log("Loading Serverside topicController.js");

var mongoose = require('mongoose'),
    Topic    = mongoose.model('Topic');
    User     = mongoose.model('User');

function TopicController() {

  var _this = this;

  // -------------------------------------------------------------------------
  //                           Get all the topics
  // -------------------------------------------------------------------------
  _this.getTopics = function (req, res) {
    Topic.find({}).populate('_user').populate('posts').exec(function (err, topics) {
      if (err) {
        console.log("Error getting all the topics");
        console.log(err);
      } else {
        res.json(topics);
      }
    });
  };

  // -------------------------------------------------------------------------
  //                           Create Topics
  // -------------------------------------------------------------------------
  _this.createTopic = function (req, res) {
    console.log("Server Says Creating Topic");
    console.log(req.body);
    console.log(req.body.description);
    console.log(req.body.category);
    if (!req.body.topic || !req.body.description || !req.body.category) {
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

  // -------------------------------------------------------------------------
  //                      Get Single Topic
  // -------------------------------------------------------------------------

  _this.getTopic = function (req, res) {
    Topic.findOne({_id: req.params.id}).populate('posts').populate('_user').exec(function (err, topic) {
      if (err) {
        console.log("Error getting a topic");
        console.log(err);
      } else {
        res.json(topic);
      }
    });
  };
}

module.exports = new TopicController();

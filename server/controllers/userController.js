console.log("Loading Serverside userController.js");

var mongoose = require('mongoose'),
    User = mongoose.model('User');

function UserController() {

  var _this = this;

  // -------------------------------------------------------------------------
  //                      Create or Return Existing User
  // -------------------------------------------------------------------------
  _this.createUser = function (req, res) {
    console.log("Creating User");
    console.log(req.body.name);
    if (!req.body.name) {
      res.json({error: ["Name is required"]});
    }
    User.findOne({name: req.body.name}, function (err, user) {
      if (err) {
        console.log("Error while Finding User");
        console.log(err);
      } else {
        if (!user) {
          console.log("User Not Found! Creating New User");
          console.log(req.body);
          User.create(req.body, function (err, user) {
            if (err) {
              console.log("Error while Creating User");
              console.log(err);
            } else {
              console.log("User Created");
              res.json(user);
            }
          });
        } else {
          console.log("User Found");
          res.json(user);
        }
      }
    });
  };

  // -------------------------------------------------------------------------
  //                      Get Single User
  // -------------------------------------------------------------------------

  _this.getUser = function (req, res) {
    User.findOne({_id: req.params.id}).populate('topics').populate('posts').populate('comments').exec(function (err, user) {
      if (err) {
        console.log("Error getting a user");
        console.log(err);
      } else {
        res.json(user);
      }
    });
  };  
}

module.exports = new UserController();

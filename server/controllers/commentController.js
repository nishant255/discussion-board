console.log("Loading Serverside commentController.js");

var mongoose = require('mongoose'),
    Comment = mongoose.model('Comment');

function CommentController() {

  var _this = this;

  // -------------------------------------------------------------------------
  //                           My Controller Method
  // -------------------------------------------------------------------------
  _this.myMethod = function (req, res) {
    // Add Some Logic
  };
}

module.exports = new CommentController();

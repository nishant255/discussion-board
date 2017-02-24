console.log("Loading Clientside topicController.js");

app.controller('topicController', ['$scope', '$location', '$routeParams', 'topicFactory', 'postFactory', 'commentFactory', function ($scope, $location, $routeParams,topicFactory, postFactory, commentFactory) {

  var _this = this;
  _this.posts = [];

  // -------------------------------------------------------------------------
  //                            Checking if user Exist
  // -------------------------------------------------------------------------
  var checkUser = function () {
    console.log("Checking User if logged if");
    userFactory.checkUser(function (returnedData) {
      console.log(returnedData);
      if (returnedData === false) {
        $location.url('/');
      }
    });
  };
  // checkUser();

  // -------------------------------------------------------------------------
  //                            Get Single Topic
  // -------------------------------------------------------------------------
    var getTopic = function () {
      topicFactory.getTopic($routeParams.id, function (topicFromFactory) {
        _this.currentTopic = topicFromFactory;
        console.log(_this.currentTopic);
      });
    };
    getTopic();

    // -------------------------------------------------------------------------
    //                            Get all the Topics
    // -------------------------------------------------------------------------
    var getPosts = function () {
      postFactory.getPosts(function (postsFromServer) {
        _this.posts = postsFromServer;
      });
    };
    getPosts();

    // -------------------------------------------------------------------------
    //                            Create Topic
    // -------------------------------------------------------------------------
    _this.createPost = function () {
      console.log("User Posted in a topic", _this.newPost);
      _this.newPost.userid = "58af7db6e42c73131412d0c3";
      _this.newPost.topicid = $routeParams.id;
      // _this.newTopic.userid = _this.user._id;
      console.log(_this.newPost.topicid);
      postFactory.createPost(_this.newPost, function (postAfterServer) {
        console.log(postAfterServer);
        getPosts();
        _this.newPost = {};
      });
    };


}]);

// -------------------------------------------------------------------------
//                            Filter for Title Case
// -------------------------------------------------------------------------

app.filter('titleCase', function() {
  return function(input) {
    input = input || '';
    return input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };
});

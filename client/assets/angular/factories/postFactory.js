console.log("Loading postFactory.js");

app.factory('postFactory', ['$http', function ($http) {

  // Initialize Required Attributes

  function PostFactory() {

    var _this = this;

    // -------------------------------------------------------------------------
    //                            Get All the Posts
    // -------------------------------------------------------------------------
    _this.getPosts = function (callback) {
      $http.get('/posts').then(function (postssFromServer) {
        if (typeof(callback) == 'function') {
          callback(postssFromServer.data);
        }
      });
    };

    // -------------------------------------------------------------------------
    //                            Create Post
    // -------------------------------------------------------------------------

    _this.createPost = function (newTopic, callback) {
      console.log("Factory Says: Creating Post");
      $http.post('/topics', newTopic).then(function (topicAfterServer) {
        if (typeof(callback) == 'function') {
          callback(topicAfterServer);
        }
      });
    };

  }
  return new PostFactory();
}]);

console.log("Loading topicFactory.js");

app.factory('topicFactory', ['$http', function ($http) {


  function TopicFactory() {

    var _this = this;

    // -------------------------------------------------------------------------
    //                            Get All the Topics
    // -------------------------------------------------------------------------
    _this.getTopics = function (callback) {
      $http.get('/topics').then(function (topicsFromServer) {
        if (typeof(callback) == 'function') {
          callback(topicsFromServer.data);
        }
      });
    };

    // -------------------------------------------------------------------------
    //                            Create topic
    // -------------------------------------------------------------------------

    _this.createTopic = function (newTopic, callback) {
      console.log("Factory Says: Creating Topic");
      $http.post('/topics', newTopic).then(function (topicAfterServer) {
        if (typeof(callback) == 'function') {
          callback(topicAfterServer);
        }
      });
    };

    // -------------------------------------------------------------------------
    //                            Get Single Topic
    // -------------------------------------------------------------------------

    _this.getTopic = function (topicId, callback) {
      $http.get('/topic/'+topicId).then(function (topicFromServer) {
        callback(topicFromServer.data);
      });
    };

  }
  return new TopicFactory();
}]);

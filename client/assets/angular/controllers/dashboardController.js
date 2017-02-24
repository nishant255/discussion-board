console.log("Loading Clientside dashboardController.js");

app.controller('dashboardController', ['$scope', '$location', 'userFactory', 'topicFactory', function ($scope, $location, userFactory, topicFactory) {

  var _this = this;
  _this.topics = [];
  // _this.user = {_id: "58af7db6e42c73131412d0c3", createdAt: "2017-02-24T00:26:30.294Z", name:"bob", updatedAt:"2017-02-24T00:26:30.294Z", __v:0};




  // -------------------------------------------------------------------------
  //                            Checking if user Exist
  // -------------------------------------------------------------------------
  var checkUser = function () {
    console.log("Checking User if logged if");
    userFactory.checkUser(function (returnedData) {
      console.log(returnedData);
      if (returnedData === false) {
        $location.url('/');
      } else {
        _this.user = returnedData;
      }
    });
  };

  // checkUser();

  // -------------------------------------------------------------------------
  //                            Get all the Topics
  // -------------------------------------------------------------------------
  var getTopics = function () {
    topicFactory.getTopics(function (topicsFromServer) {
      _this.topics = topicsFromServer;
    });
  };
  getTopics();

  // -------------------------------------------------------------------------
  //                            Create Topic
  // -------------------------------------------------------------------------
  _this.createTopic = function () {
    console.log("User Submitted a Topic", _this.newTopic);
    _this.newTopic.userid = "58af7db6e42c73131412d0c3";
    // _this.newTopic.userid = _this.user._id;
    topicFactory.createTopic(_this.newTopic, function (topicAfterServer) {
      console.log(topicAfterServer);
      getTopics();
      _this.newTopic = {};
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

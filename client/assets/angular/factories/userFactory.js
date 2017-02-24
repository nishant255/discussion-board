console.log("Loading userFactory.js");

app.factory('userFactory', ['$http', function ($http) {

  var user = {};

  function UserFactory() {

    var _this = this;

    // -------------------------------------------------------------------------
    //                            Create User
    // -------------------------------------------------------------------------

    _this.createUser = function (newUser, callback) {
      $http.post('/user', newUser).then(function (dataFromServer) {
        console.log("data from Server");
        console.log(dataFromServer);
        user = dataFromServer.data;
        if (typeof(callback) == 'function') {
          callback(user);
        }
      });
    };

    // -------------------------------------------------------------------------
    //                      Check Logged in User
    // -------------------------------------------------------------------------

    _this.checkUser = function (callback) {
      console.log("Checking for user in factory");
      console.log(user);
      if (!user.name) {
        callback(false);
      } else {
        callback(user);
      }
    };

    // -------------------------------------------------------------------------
    //                      Get Single User
    // -------------------------------------------------------------------------

    _this.getUser = function (userId, callback) {
      $http.get('/user/'+userId).then(function (userFromServer) {
        callback(userFromServer.data);
      });
    };
  }
  return new UserFactory();
}]);

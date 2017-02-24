console.log("Loading Clientside loginController.js");

app.controller('loginController', ['$scope', '$location', 'userFactory', function ($scope, $location, userFactory) {

  var _this = this;
  _this.user = {};

  // -------------------------------------------------------------------------
  //                            Create User
  // -------------------------------------------------------------------------

  _this.createUser = function () {    
    _this.newUser.name = _this.newUser.name.toLowerCase();
    userFactory.createUser(_this.newUser, function (UserAfterServer) {
      _this.user = UserAfterServer;
      console.log(_this.user);
      _this.newUser = {};
      $location.url('/dashboard');
    });
  };


}]);

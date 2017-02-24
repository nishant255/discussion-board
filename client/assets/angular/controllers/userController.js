console.log("Loading Clientside userController.js");

app.controller('userController', ['$scope', '$location', '$routeParams', 'userFactory', function ($scope, $location, $routeParams, userFactory) {

  var _this = this;

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
  //                            Get Single User
  // -------------------------------------------------------------------------
    var getUser = function () {
      userFactory.getUser($routeParams.id, function (userFromFactory) {
        _this.currentUser = userFromFactory;
        console.log(_this.currentUser.topics);
      });
    };
    getUser();

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

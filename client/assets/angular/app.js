console.log("Loading Master App JS");

var app = angular.module('app', ['ngRoute', 'ngMessages']);

app.config( function ($routeProvider) {

  $routeProvider

    .when('/', {
      templateUrl: 'partials/login.html',
      controller: 'loginController',
      controllerAs: 'LC'
    })

    .when('/dashboard', {
      templateUrl: 'partials/dashboard.html',
      controller: 'dashboardController',
      controllerAs: 'DC'
    })

    .when('/topic/:id', {
      templateUrl: 'partials/topic.html',
      controller: 'topicController',
      controllerAs: 'TC'
    })

    .when('/user/:id', {
      templateUrl: 'partials/user.html',
      controller: 'userController',
      controllerAs: 'UC'
    })

    .otherwise({
      redirectTo: '/'
    });

});

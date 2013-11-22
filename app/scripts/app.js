'use strict';

angular.module('devfestTodolistApp', [
  'ngResource',
  'ngRoute',
  'ngAnimate',
  'flash'
])
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('parseConvertResults');
    $httpProvider.interceptors.push('parseAuthentication');
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        secure: true
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      })
      .when('/signin', {
        templateUrl: 'views/signin.html',
        controller: 'SigninCtrl'
      })
      .when('/signout', {
        templateUrl: 'views/signout.html',
        controller: 'SignoutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function($q, $rootScope, $location, $http, session){
    $http.get('https://api.parse.com/1/users/me')
      .success(function(data){
        $rootScope.loggedUser = data;
      });

    $rootScope.$on('$routeChangeStart', function(event, route){
      var loggedUser = session.get('loggedUser');
      if (route.secure && !loggedUser) {
        $location.path('/signin');
      }
    });
  });

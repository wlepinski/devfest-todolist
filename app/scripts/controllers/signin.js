'use strict';

angular.module('devfestTodolistApp')
  .controller('SigninCtrl', function ($scope, $rootScope, $http, $location, session) {
    $scope.signinUser = function(){
      $http.get('https://api.parse.com/1/login', { params: $scope.user })
        .success(function(response){
          session.set('loggedUser', response);

          $http.get('https://api.parse.com/1/users/me')
            .success(function(data){
              $rootScope.loggedUser = data;
              $location.path('/');
            });

        })
        .catch(function(error){
          if (error.data.code === 101) {
            $scope.signinError = true;
          }
        });
    };
  });

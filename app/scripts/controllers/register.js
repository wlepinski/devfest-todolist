'use strict';

angular.module('devfestTodolistApp')
  .controller('RegisterCtrl', function ($scope, $http, $location, flash) {
    $scope.registerError = '';

    $scope.registerUser = function(){
      $http.post('https://api.parse.com/1/users', $scope.user)
        .success(function(){
          flash('success', 'Usuário registrado com sucesso');
          $location.path('/signin');
        })
        .catch(function(error){
          if (error.data.code === 202) {
            $scope.registerError = 'Nome de usuário já utilizado';
          }
        });
    };
  });

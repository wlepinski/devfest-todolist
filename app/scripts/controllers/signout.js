'use strict';

angular.module('devfestTodolistApp')
  .controller('SignoutCtrl', function ($scope, $location, session) {
    session.remove('loggedUser');
    $location.path('/signin');
  });

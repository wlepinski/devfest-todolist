'use strict';

angular.module('devfestTodolistApp')
  .factory('Todo', function ($resource) {
    return $resource('https://api.parse.com/1/classes/Todo/:id', {
      id: '@objectId'
    }, {
      update: { method: 'PUT' }
    });
  });

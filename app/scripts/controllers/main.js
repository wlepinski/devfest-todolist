'use strict';

angular.module('devfestTodolistApp')
  .controller('MainCtrl', function($scope, Todo, session) {
    var loggedUser = session.get('loggedUser');

    $scope.todos = Todo.query({
      order: '-createdAt,importance',
      // limit: 2,
      // skip: 0
    });

    /**
     * [addTodo description]
     */
    $scope.addTodo = function() {
      var todo = new Todo({
        title: $scope.newTodo,
        ACL: {}
      });

      todo.ACL[loggedUser.objectId] = {
        read: true,
        write: true
      };

      $scope.todos.unshift(todo);

      angular.copy(todo).$save()
        .then(function(created) {
          $scope.newTodo = null;

          angular.extend(todo, created);
        });
    };
  })
  .controller('TodoCtrl', function($scope){
    /**
     * [editTodo description]
     * @param  {[type]} todo [description]
     * @return {[type]}      [description]
     */
    $scope.editTodo = function(todo) {
      angular.copy(todo).$update(function(){
        todo.$editing = false;
      });
    };

    /**
     * [removeTodo description]
     * @param  {[type]} todo [description]
     * @return {[type]}      [description]
     */
    $scope.removeTodo = function(todo) {
      var idx = $scope.todos.indexOf(todo);
      $scope.todos.splice(idx, 1);

      todo.$remove();
    };
  });

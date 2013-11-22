'use strict';

describe('Controller: MainCtrl', function() {

  // load the controller's module
  beforeEach(module('devfestTodolistApp'));

  var MainCtrl,
    TodoCtrl,
    httpBackend,
    todoScope,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, $httpBackend) {
    scope = $rootScope.$new();
    todoScope = scope.$new();

    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });

    TodoCtrl = $controller('TodoCtrl', {
      $scope: todoScope
    });

    httpBackend = $httpBackend;

    httpBackend.when('GET', 'https://api.parse.com/1/users/me')
      .respond(200, {});

    httpBackend.when('GET', 'https://api.parse.com/1/classes/Todo?order=-createdAt,importance').respond(200, {
      "results": [{
        "importance": "0",
        "title": "456",
        "createdAt": "2013-11-21T00:08:16.263Z",
        "updatedAt": "2013-11-21T00:08:22.402Z",
        "objectId": "gxXh0oy6S2",
        "ACL": {
          "6E1bTZd8XY": {
            "read": true,
            "write": true
          }
        }
      }, {
        "importance": "99",
        "title": "123",
        "createdAt": "2013-11-21T00:08:13.862Z",
        "updatedAt": "2013-11-21T00:08:29.771Z",
        "objectId": "qf6bg92XYN",
        "ACL": {
          "6E1bTZd8XY": {
            "read": true,
            "write": true
          }
        }
      }]
    });
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should define a addTo method', function() {
    httpBackend.flush();
    expect(scope.addTodo).toNotBe(undefined);
  });

  it('should fill the todos property on $scope', function() {
    httpBackend.flush();

    expect(scope.todos).toNotBe(undefined);
    expect(scope.todos.length).toBe(2);

    expect(todoScope.todo).toBe(undefined);
    expect(todoScope.todos.length).toBe(2);
  });

  it('should remove the todo', function(){
    httpBackend.flush();

    todoScope.todo = scope.todos[0];
    expect(todoScope.todo).toBe(scope.todos[0]);

    todoScope.removeTodo(todoScope.todo);

    httpBackend.expectDELETE('https://api.parse.com/1/classes/Todo/gxXh0oy6S2').respond(200, {});
    httpBackend.flush();

    expect(scope.todos.length).toBe(1);
  })
});

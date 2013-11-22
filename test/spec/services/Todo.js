'use strict';

describe('Service: Todo', function () {

  // load the service's module
  beforeEach(module('devfestTodolistApp'));

  // instantiate service
  var Todo, Resource;

  beforeEach(inject(function (_Todo_, $resource) {
    Todo = _Todo_;
    Resource = $resource;
  }));

  it('should do something', function () {
    expect(Todo.constructor === Resource.constructor).toBe(true);
  });

});

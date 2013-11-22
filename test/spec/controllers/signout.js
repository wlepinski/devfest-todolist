'use strict';

describe('Controller: SignoutCtrl', function () {

  // load the controller's module
  beforeEach(module('devfestTodolistApp'));

  var RegisterCtrl,
    httpBackend,
    location,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend, $location) {
    scope = $rootScope.$new();
    RegisterCtrl = $controller('SignoutCtrl', {
      $scope: scope
    });
    location = $location;
  }));

  it('should logout the user', function () {
    expect(localStorage.getItem('loggedUser')).toBe(null);
    expect(location.path()).toBe('/signin');
  });
});

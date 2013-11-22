'use strict';

describe('Controller: RegisterCtrl', function () {

  // load the controller's module
  beforeEach(module('devfestTodolistApp'));

  var RegisterCtrl,
    httpBackend,
    location,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend, $location) {
    scope = $rootScope.$new();
    RegisterCtrl = $controller('RegisterCtrl', {
      $scope: scope
    });
    location = $location;
    httpBackend = $httpBackend;

    httpBackend.when('GET', 'https://api.parse.com/1/users/me')
      .respond({});
  }));

  it('should register the user', function () {
    httpBackend.expectPOST('https://api.parse.com/1/users')
      .respond({
        "username": "aaa",
        "createdAt": "2013-11-20T22:45:07.372Z",
        "updatedAt": "2013-11-20T22:45:07.372Z",
        "objectId": "6E1bTZd8XY",
        "sessionToken": "vr5x0vw7xwdngh9upu2tbxu65"
      });

    scope.user = { username: 'foo', password: 'bar' };
    scope.registerUser();
    httpBackend.flush();
    expect(scope.registerError).toBe('');
    expect(location.path()).toBe('/signin');
  });

  it('should not register the user', function () {
    httpBackend.expectPOST('https://api.parse.com/1/users')
      .respond(400, { code: 202, error: 'foo already taken' });

    scope.user = { username: 'foo', password: 'bar' };
    scope.registerUser();
    httpBackend.flush();
    expect(scope.registerError).toNotBe('');
  });
});

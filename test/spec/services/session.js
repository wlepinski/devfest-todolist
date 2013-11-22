'use strict';

describe('Service: Session', function () {

  // load the service's module
  beforeEach(module('devfestTodolistApp'));

  // instantiate service
  var Session;
  beforeEach(inject(function (_session_) {
    Session = _session_;
  }));

  it('should do something', function () {
    expect(!!Session).toBe(true);
  });

});

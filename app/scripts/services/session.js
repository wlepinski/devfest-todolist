'use strict';

angular.module('devfestTodolistApp')
  .factory('session', function () {
    return {
      get: function getSessionValue (key) {
        return JSON.parse(localStorage.getItem(key));
      },
      set: function setSessionValue (key, value) {
        value = JSON.stringify(value);
        localStorage.setItem(key, value);
        return this.get(key);
      },
      remove: function(key) {
        localStorage.removeItem(key);
      }
    };
  });

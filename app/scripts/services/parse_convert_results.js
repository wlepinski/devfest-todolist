'use strict';

angular.module('devfestTodolistApp')
  .factory('parseConvertResults', function($q) {
    return {
      response: function(response) {
        if (response.config.url.match(/parse/) && ('results' in response.data)) {
          response.data = response.data.results;
        }

        return response || $q.when(response);
      }
    };
  });

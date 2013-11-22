'use strict';

angular.module('devfestTodolistApp')
  .factory('parseAuthentication', function($q, session) {
    return {
      request: function(config) {
        if (config.url.match(/parse/)) {
          config.headers['X-Parse-Application-Id'] = 'Sin7UAAvHjStqKOidhpyIuhDtxzHbbYldNeYy3Hv';
          config.headers['X-Parse-REST-API-Key'] = 'mSvr3tdqH0pVjKjA5JLgW4yuWvELzqPAGk8oneVx';

          var loggedUser = session.get('loggedUser');

          if (loggedUser) {
            config.headers['X-Parse-Session-Token'] = loggedUser.sessionToken;
          }
        }

        return config || $q.when(config);
      }
    };
  });

'use strict';

angular.module('comments')
  .service('CommentManager', ['$resource', 'envPrefix', '$timeout', '$rootScope',
    function($resource, envPrefix, $timeout, $rootScope){
      return $resource( envPrefix + 'api/v1.0/comments/:param1/:param2', {}, {
        add: {method:'PUT', transformResponse: function (object) {
          return angular.fromJson(object);
        }},
        comments: {method:'GET', isArray: true, transformResponse: function (object) {
          return angular.fromJson(object);
        }}
      });
    }]);

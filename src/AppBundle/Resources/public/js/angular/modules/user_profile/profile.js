'use strict';

angular.module('profile', ['Interpolation',
  'Google',
  'Components',
  'angular-cache',
  'ngSanitize',
  'infinite-scroll',
  'mgcrea.ngStrap.popover',
  'goalManage',
  'ngAnimate',
  'goalComponents',
  'manage',
  'notification',
  'activity',
  'PathPrefix'
])
  .directive('lsFollowManage',['envPrefix',
    '$http',
    function(envPrefix, $http){
      return {
        restrict: 'EA',
        scope: {
          lsUserId: '@',
          lsIsFollow: '='
        },
        link: function(scope, el){

          var path = envPrefix + 'api/v1.0/users/{user}/toggles/followings';
          path = path.replace('{user}', scope.lsUserId);

          el.bind('click', function(){
            $http.post(path).success(function(){
              scope.lsIsFollow = !scope.lsIsFollow;
            })
          });
        }
      }
    }
  ]);
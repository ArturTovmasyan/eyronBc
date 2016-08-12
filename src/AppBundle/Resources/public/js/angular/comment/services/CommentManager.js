'use strict';

angular.module('comments')
  .service('CommentManager', ['$resource', 'envPrefix',
    function($resource, envPrefix){
      return $resource( envPrefix + 'api/v1.0/comments/:param1/:param2', {}, {
        add: {method:'PUT', transformResponse: function (object) {
          return angular.fromJson(object);
        }},
        comments: {method:'GET', isArray: true, transformResponse: function (object) {
          return angular.fromJson(object);
        }}
      });
  }])
  .directive('lsReport',['$compile',
    '$http',
    '$rootScope',
    'template',
    'userData',
    function($compile, $http, $rootScope, template, userData){
      return {
        restrict: 'EA',
        scope: {
          lsUser: '@',
          lsComment: '@'
        },
        link: function(scope, el){

          el.bind('click', function(){
            scope.run();
          });

          scope.run = function(){
            $(".modal-loading").show();
             userData.report = {
                user: scope.lsUser,
                comment: scope.lsComment
              };
              scope.runCallback()
          };

          scope.runCallback = function(){
            var sc = $rootScope.$new();
            var tmp = $compile(template.reportTemplate)(sc);
            scope.openModal(tmp);
            $(".modal-loading").hide();
          };

          scope.openModal = function(tmp){

            angular.element('body').append(tmp);
            tmp.modal({
              fadeDuration: 300
            });

            tmp.on($.modal.CLOSE, function(){
              tmp.remove();
            })
          }

        }
      }
    }
  ]);

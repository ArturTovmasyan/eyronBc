'use strict';

angular.module('adminGoal', ['Interpolation',
  'Google',
  'PathPrefix',
  'Authenticator',
  'mgcrea.ngStrap.popover',
  'ngAnimate',
  'ngSanitize',
  'Confirm',
  'videosharing-embed',
  'Components'
])
  .directive('delayAddClass',['$interval', function($interval){
    return {
      restrict: 'EA',
      scope: {
        delay: '=',
        className: '@'
      },
      link: function(scope, el){
        var dl = scope.delay ? scope.delay : 8000;
        var cl = scope.className ? scope.className: 'active';
        var items = el.children();
        var activeIndex = 0;

        if(items.length) {
          angular.element(items[0]).addClass(cl);

          if (items.length > 1) {
            $interval(function () {
              items.removeClass(cl);

              if(activeIndex === items.length - 1){
                activeIndex = 0;
              }
              else {
                activeIndex++;
              }

              angular.element(items[activeIndex]).addClass(cl);

            }, dl);
          }
        }
      }
    }
  }])
  .directive('videos', ['$sce', function($sce){
    return {
      restrict: 'EA',
      scope: {
        array: '=',
        key: '=',
        link: '=',
        limit: '=',
        for: '@',
        formId: '@',
        formName: '@'
      },
      templateUrl: '/bundles/app/htmls/addVideo.html',
      link: function(scope){

        scope.lm = scope.limit ? scope.limit : 3;

        scope.$watch('link',function(d){
          if(angular.isUndefined(d)){
            return;
          }

          if(d === ''){
            scope.removeItem();
          }
          else {
            if(!scope.array[scope.key + 1] && Object.keys(scope.array).length < scope.lm){
              scope.array[scope.key + 1] = {};
            }
          }
        },true);

        scope.removeItem = function(){
          if(scope.array[scope.array.length-1].link){
            scope.array[scope.array.length] = {};
          }

          if(scope.key === 0){
            if(scope.array.length > 1){
              scope.array.splice(scope.key, 1);
            }
          }
          else {
            scope.array.splice(scope.key, 1);
          }
        };

        scope.isVideoLink = function(url){
          if(!url || url.indexOf("https:/") == -1) return false;
          return true;
        };
        scope.trustedUrl = function(url){
          return $sce.trustAsResourceUrl(url);
        };
      }
    }
  }]);


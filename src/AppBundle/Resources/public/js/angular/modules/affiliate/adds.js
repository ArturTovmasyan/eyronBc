'use strict';

angular.module('adds', ['Interpolation',
  'Components',
  'angular-cache',
  'ngResource',
  'PathPrefix',
  'Authenticator'
  ])
  .service('AffiliateDataManager', ['$resource', 'envPrefix',
    function($resource, envPrefix){
      return $resource( envPrefix + 'api/v1.0/affiliates', {}, {
        affiliate: {method:'POST', isArray: true}
      });
    }])
  .directive('addsAffiliate',['AffiliateDataManager', function(AffiliateDataManager){
    return {
      restrict: 'EA',
      scope: {
        zone: '@',
        link: '@'
      },
      compile: function(){
        return function(scope, element){
          AffiliateDataManager.affiliate({},{page_link: scope.link, zone: scope.zone}, function (res) {
            if(res.length){
              angular.forEach(res, function (affiliate) {
                element.append(affiliate.html_content);
                element.append(affiliate.js_content);
              });
            }
          });
        }
      }
    }
  }]);
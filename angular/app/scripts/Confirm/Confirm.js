'use strict';

angular.module('Confirm',['mgcrea.ngStrap.modal', 'ngAnimate'])
    .directive('lsConfirm',['$modal', '$location', function($modal,  $location){
        return {
            restrict: 'EA',
            scope: {
                lsModalTitle: '@',
                lsHref: '@',
                lsConfirm: '&'
            },
            link: function(scope, el){

                scope.yes = function(){
                    if(scope.href){
                        $location.path(scope.href);
                    }
                    else if(scope.confirm){
                        scope.$eval(scope.confirm);
                    }
                };

                el.bind('click',function(){
                    $modal({
                        scope: scope,
                        title: scope.modalTitle ? scope.modalTitle : 'Confirm',
                        templateUrl: '/app/scripts/Confirm/confirm.html'
                    });
                })
            }
        }
    }]);
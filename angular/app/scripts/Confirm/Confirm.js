'use strict';

angular.module('Confirm',['Interpolation'])
    .directive('lsConfirm',['$location', '$http', '$compile', function($location, $http, $compile){
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
                    $http.get('/app/scripts/Confirm/confirm.html')
                        .success(function(res){
                            var tmp = $compile(res)(scope);

                            angular.element('body').append(tmp);
                            tmp.modal({
                                fadeDuration: 500
                            });

                            tmp.on($.modal.CLOSE, function(){
                                tmp.remove();
                            })
                        });
                })
            }
        }
    }]);
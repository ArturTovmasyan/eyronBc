'use strict';

angular.module('Components',[])
    .directive('ngEnterSubmit',[function(){
        return {
            restrict: 'EA',
            scope: {
                ngEnterSubmit: '@'
            },
            link: function(scope, el){

                el.bind('keyup',function(ev){

                    if(ev.which === 13){
                        angular.element(scope.ngEnterSubmit).submit();
                    }
                })
            }
        }
    }]);
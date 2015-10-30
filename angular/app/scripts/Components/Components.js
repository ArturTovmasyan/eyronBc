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
    }])
    .directive('openPopover',['$timeout',function($timeout){
        return {
            restrict: 'EA',
            scope: {
                selector: '@'
            },
            compile: function(){
                return function(scope){
                    var middleScope = angular.element(scope.selector).scope();
                    var popoverScope = middleScope.$$childHead;

                    if(!popoverScope.$isShown){
                        $timeout(function(){
                            popoverScope.$show();
                            middleScope.joinToggle2 = !middleScope.joinToggle2;
                        },400);
                    }
                }
            }
        }
    }])
    .animation('.slide', function() {
        var NG_HIDE_CLASS = 'ng-hide';
        return {
            beforeAddClass: function(element, className, done) {
                if(className === NG_HIDE_CLASS) {
                    element.slideUp(done);
                }
            },
            removeClass: function(element, className, done) {
                if(className === NG_HIDE_CLASS) {
                    element.hide().slideDown(done);
                }
            }
        }
    });
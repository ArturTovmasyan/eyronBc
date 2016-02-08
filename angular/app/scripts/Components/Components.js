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

                    if(ev.which === 13 && !ev.shiftKey){
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
    .directive('lsScrollTo',[function(){
        return {
            restrict: 'EA',
            scope: {
                targetSelector: '@'
            },
            link: function(scope, el){
                el.bind('click', function(){
                    var target = angular.element(scope.targetSelector);
                    angular.element(window).scrollTo(target, 700);
                })
            }
        }
    }])
    .directive('lsJqueryModal',['$compile', '$http', '$rootScope', function($compile, $http, $rootScope){
        return {
            restrict: 'EA',
            scope: {
                lsTemplate: '@',
                lsTemplateUrl: '@',
                lsIdentity: '@'
            },
            link: function(scope, el){

                el.bind('click', function(){
                    scope.run();
                });

                // for non angular events
                el.on('openLsModal', function(event, dataId){
                    if(dataId === scope.lsIdentity){
                        scope.run();
                        scope.$apply();
                    }
                });

                // for angular events
                scope.$on('openLsModal', function(event, dataId){
                    if(dataId === scope.lsIdentity){
                        scope.run();
                    }
                });

                scope.run = function(){
                    if(scope.lsTemplate){
                        var tmp = $compile(scope.lsTemplate)(scope);
                        scope.openModal(tmp);
                    }
                    else if(scope.lsTemplateUrl){
                        $http.get(scope.lsTemplateUrl)
                            .success(function(res){
                                var tmp = $compile(res)(scope);
                                scope.openModal(tmp);
                            });
                    }
                }

                scope.openModal = function(tmp){
                    angular.element('body').append(tmp);
                    tmp.modal({
                        fadeDuration: 500
                    });
                    $rootScope.$broadcast('lsJqueryModalOpened'+scope.lsIdentity);

                    tmp.on($.modal.CLOSE, function(){
                        tmp.remove();
                        $rootScope.$broadcast('lsJqueryModalClosed'+scope.lsIdentity);
                    })
                }

            }
        }
    }])
    .directive('lsFileUploadPreview',[function(){
        return {
            restrict: 'EA',
            scope: {
                imageUrl: '='
            },
            link: function(scope, el){

                scope.readURL = function(input) {

                    if (input.files && input.files[0]) {
                        var reader = new FileReader();

                        reader.onload = function (e) {
                            scope.imageUrl = e.target.result;
                            scope.$apply();
                        }

                        reader.readAsDataURL(input.files[0]);
                    }
                }

                el.change(function(){
                    scope.readURL(el[0]);
                });

            }
        }
    }])
    .directive('lsChecked',[function(){
        return {
            restrict: 'EA',
            require: '^ngModel',
            link: function(scope, el, attr, ngModel){

                scope.$watch(attr.lsChecked, function(){
                    var val = scope.$eval(attr.lsChecked);
                    el.prop('checked', val);
                    el.val(val);
                }, true);

                el.change(function(){
                    ngModel.$setViewValue(el.is(':checked') ? 1:0);
                    scope.$apply();
                });
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
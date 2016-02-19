'use strict';

angular.module('Components',[])
    .service('loginPopoverService', ['$timeout', function($timeout){

        function openLoginPopover(){
            $timeout(function(){
                var logged = angular.element(".user");
                var notLogged = angular.element('.sign-in-popover');

                if(logged.length){
                    logged.hide();
                }

                if(notLogged) {

                    notLogged.fadeIn();

                    var middleScope = notLogged.scope();
                    var popoverScope = middleScope.$$childHead;

                    if (!popoverScope.$isShown) {
                        popoverScope.$show();
                        middleScope.joinToggle2 = !middleScope.joinToggle2;
                    }
                }
            }, 500);
        }

        return {
            openLoginPopover: openLoginPopover
        }
    }])
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
    .directive('openPopover',['$timeout', 'loginPopoverService', function($timeout, loginPopoverService){
        return {
            restrict: 'EA',
            scope: {},
            compile: function(){
                return function(){
                    loginPopoverService.openLoginPopover();
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
    .directive('lsJqueryModal',['$compile',
        '$http',
        '$rootScope',
        'loginPopoverService',
        function($compile, $http, $rootScope, loginPopoverService){
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
                            })
                            .error(function(res, status){
                                if(status === 401) {
                                    loginPopoverService.openLoginPopover();
                                }
                            });
                    }
                }

                scope.openModal = function(tmp){
                    angular.element('body').append(tmp);
                    tmp.modal({
                        fadeDuration: 500
                    });
                    $rootScope.$broadcast('lsJqueryModalOpened'+scope.lsIdentity);
                    el.trigger('lsJqueryModalOpened' + scope.lsIdentity);

                    tmp.on($.modal.CLOSE, function(){
                        tmp.remove();
                        $rootScope.$broadcast('lsJqueryModalClosed' + scope.lsIdentity);
                        el.trigger('lsJqueryModalClosed' + scope.lsIdentity);
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
                    if(val) {
                        el.prop('checked', val);
                        el.val(val);
                    }
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
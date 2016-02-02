'use strict';

angular.module('goal', ['Interpolation',
        'Google',
        'user',
        'mgcrea.ngStrap.popover',
        'ngAnimate',
        'ngSanitize',
        'Components'
    ])
    .controller('goalAdd',['$scope', '$sce', '$timeout', function($scope, $sce, $timeout){

        $scope.files = [];

        $scope.openSignInPopover = function(){
            var middleScope = angular.element(".sign-in-popover").scope();
            var popoverScope = middleScope.$$childHead;

            if(!popoverScope.$isShown){
                popoverScope.$show();
                middleScope.joinToggle2 = !middleScope.joinToggle2;
            }
        }

        $('input[type=checkbox]').iCheck({
            checkboxClass: 'icheckbox_square-purple',
            increaseArea: '20%'
        }).on('ifChanged', function (event) {
            $(event.target).trigger('change');
        });
        
        // file uploads

        Dropzone.options.goalDropzone = false;

        $scope.initDropzone = function(url){
            if(!url){
                return;
            }

            $timeout(function(){
                $scope.goalDropzone = new Dropzone('#goalDropzone', {
                    url: url,
                    addRemoveLinks: true,
                    uploadMultiple: false,
                    maxThumbnailFilesize: 6,
                    maxFiles: 6,
                    complete: function(res){
                        if(res.xhr.status !== 200){
                            return;
                        }

                        $scope.files = $scope.files.concat(JSON.parse(res.xhr.responseText));
                        $scope.$apply();
                    }
                });
            },500);
        };

        // end file uploads

        $scope.trustedUrl = function(url){
            return $sce.trustAsResourceUrl(url);
        };

        // description Tagging

        $scope.$watch('description',function(d){
            if(!d){
                return;
            }

            var reg = /(#[a-z0-9][a-z0-9\-_]+)/ig;
            $scope.tags = d.match(reg);
        },true);

        // end description Tagging

        $(".goal-create-submit").click(function(){
            $("#goal-create-form").ajaxForm({
                success: function(res, text, header){
                    if(header.status === 200){
                        $scope.goalSubmitTemplate = res;
                        $scope.$apply();
                        $scope.$broadcast('openLsModal', 'goalSave');
                    }
                }
            });
        });

        $(".goal-view-submit").click(function(){
            $("#goal-create-form").ajaxFormUnbind();
        });

    }])
    .controller('goalEnd', ['$scope', '$timeout', function($scope, $timeout){

        $scope.stepsArray = [{}];
        $scope.openSignInPopover = function(){
            var middleScope = angular.element(".sign-in-popover").scope();
            var popoverScope = middleScope.$$childHead;

            if(!popoverScope.$isShown){
                popoverScope.$show();
                middleScope.joinToggle2 = !middleScope.joinToggle2;
            }
        };

        $scope.initSteps = function(json){
            $scope.stepsArray = json;
        };

        $scope.removeLocation = function(){
            angular.element(".location .location-hidden").val(null);
            angular.element(".location .location-hidden").attr('value',null);
            angular.element(".location .place-autocomplete").val('');
        }


        $timeout(function(){
            angular.element('#datepicker').datepicker({
                beforeShowDay: function(){
                    var cond = angular.element('#datepicker').data('datepicker-disable');
                    if(cond){
                        return false;
                    }
                    else {
                        return true;
                    }
                },
                todayHighlight: true
            });

            angular.element("#datepicker").on("changeDate", function() {
                $scope.datepicker_title = true;
                angular.element(".hidden_date_value").val(
                    angular.element("#datepicker").datepicker('getFormattedDate')
                );

                $scope.$apply();
            });

            angular.element('input.important-radio').iCheck({
                radioClass: 'iradio_square-purple',
                increaseArea: '20%'
            }).on('ifChanged', function (event) {
                var target = angular.element(event.target);
                target.trigger('change');
            });

        }, 500);

    }])
    .controller('goalInner',['$scope',function($scope){

        $scope.openSignInPopover = function(){
            var middleScope = angular.element(".sign-in-popover").scope();
            var popoverScope = middleScope.$$childHead;

            if(!popoverScope.$isShown){
                popoverScope.$show();
                middleScope.joinToggle2 = !middleScope.joinToggle2;
            }
        };

        angular.element('.goal-information').scrollToFixed({
            marginTop: 85,
            limit: angular.element('footer').offset().top
        });

        angular.element('.ticker').ticker();

        angular.element('.suggest-input input').iCheck({
            checkboxClass: 'icheckbox_square-purple',
            increaseArea: '20%'
        });
    }])
    .controller('goalList',['$scope', function($scope){

        $scope.adventureText = function(slug, cJson){
            var item = null;

            angular.forEach(cJson, function(v){
                if(v.slug === slug){
                   item = v;
                }
            });

            return item;
        }

    }])
    .controller('goalMyBucketList', ['$scope', '$http', '$compile', function($scope, $http, $compile){

        var mapModalTemplateUrl = '/bundles/app/htmls/mapModal.html';

        $scope.onMarkerClick = function(goal){
            console.log(goal);

            $http.get(mapModalTemplateUrl)
                .success(function(res){

                    var newSc = $scope.$new();
                    newSc.goal = goal;

                    var tmp = $compile(res)(newSc);
                    angular.element('body').append(tmp);
                    tmp.modal({
                        fadeDuration: 500
                    });
                    tmp.on($.modal.CLOSE, function(){
                        tmp.remove();
                    })
                });
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
                formId: '@',
                formName: '@'
            },
            templateUrl: '/bundles/app/htmls/addVideo.html',
            link: function(scope){

                scope.limit = scope.limit ? scope.limit : 3;

                scope.$watch('link',function(d){
                    if(angular.isUndefined(d)){
                        return;
                    }

                    if(d === ''){
                        scope.removeItem();
                    }
                    else {
                        if(!scope.array[scope.key + 1] && Object.keys(scope.array).length < scope.limit){
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
                }

                scope.trustedUrl = function(url){
                    return $sce.trustAsResourceUrl(url);
                };
            }
        }
    }])
    .directive('step',[function(){
        return {
            restrict: 'EA',
            scope: {
                ngModel: '=',
                array: '=',
                key: '='
            },
            compile: function(){
                return function(scope){
                    scope.$watch('ngModel',function(d){
                        if(angular.isUndefined(d)){
                            return;
                        }

                        if(d === ''){
                            if(scope.key === 0){
                                if(scope.array.length > 1){
                                    scope.array.splice(scope.key, 1);
                                }
                            }
                            else {
                                scope.array.splice(scope.key, 1);
                            }
                        }
                        else {
                            if(!scope.array[scope.key + 1]){
                                scope.array[scope.key + 1] = {};
                            }
                        }
                    },true);
                }
            }
        }
    }]);

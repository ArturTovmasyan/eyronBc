'use strict';

angular.module('goal', ['Interpolation',
        'Google',
        'mgcrea.ngStrap.popover',
        'ngAnimate',
        'ngSanitize',
        'Components'
    ])
    .controller('goalAdd',['$scope', '$sce', function($scope, $sce){

        $scope.files = [];

        $scope.openSignInPopover = function(){
            var middleScope = angular.element(".sign-in-popover").scope();
            var popoverScope = middleScope.$$childHead;

            if(!popoverScope.$isShown){
                popoverScope.$show();
                middleScope.joinToggle2 = !middleScope.joinToggle2;
            }
        }

        $('.purple input').iCheck({
            checkboxClass: 'iradio_square-grey',
            increaseArea: '20%'
        });

        // file uploads

        Dropzone.options.goalDropzone = false;

        $scope.initDropzone = function(url){
            if(!url){
                return;
            }

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

    }])
    .controller('goalEnd', ['$scope', function($scope){

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
            angular.element(".hidden_date_value").val(
                angular.element("#datepicker").datepicker('getFormattedDate')
            )
        });

        angular.element('input.private-checkbox').iCheck({
            checkboxClass: 'iradio_square-grey',
            increaseArea: '20%'
        });

        angular.element('.place-autocomplete').bind('keydown',function(ev){
            if(ev.which === 13){
                ev.preventDefault();
                ev.stopPropagation();
                return false;
            }
        });
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
                            if(!scope.key){
                                if(scope.array.length > 1){
                                    scope.array.splice(scope.key, 1);
                                }
                            }
                            else {
                                scope.array.splice(scope.key,1);
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

'use strict';

angular.module('goal', ['Interpolation',
        'Google',
        'mgcrea.ngStrap.popover',
        'ngAnimate'
    ])
    .controller('goalAdd',['$scope', '$sce', function($scope, $sce){

        $scope.files = [];

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
                uploadMultiple: true,
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
    .controller('goalEnd',[function(){

        $('input.private-checkbox').iCheck({
            checkboxClass: 'iradio_square-grey',
            increaseArea: '20%'
        });
    }])
    .controller('goalInner',[function(){

        if(angular.element('.main-pgwSlideshow').length){
            angular.element('.main-pgwSlideshow').pgwSlideshow({
                displayList: false,
                intervalDuration: 3000,
                autoSlide: true
            });
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
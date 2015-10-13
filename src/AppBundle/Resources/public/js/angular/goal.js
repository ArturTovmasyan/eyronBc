'use strict';

angular.module('goal', ['Interpolation',
        'GoogleMaps',
        'mgcrea.ngStrap.popover',
        'ngAnimate'
    ])
    .controller('goalAdd',['$scope', '$timeout', function($scope, $timeout){

        $('.purple input').iCheck({
            checkboxClass: 'iradio_square-grey',
            increaseArea: '20%'
        });


        // file uploads

        Dropzone.options.goalDropzone = false;
        $scope.submit = function(){
            $scope.goalDropzone.uploadFiles($scope.goalDropzone.files);
        };

        $scope.initDropzone = function(url, formSelector){
            if(!url){
                return;
            }

            $scope.goalDropzone = new Dropzone('#goalDropzone', {
                url: url,
                addRemoveLinks: true,
                uploadMultiple: true,
                autoProcessQueue: false,
                completemultiple: function(){
                    $timeout(function(){
                        angular.element(formSelector)[0].submit();
                    },1000);
                }
            });
        };

        // end file uploads

        // description Tagging

        $scope.$watch('description',function(d){
            if(!d){
                return;
            }

            var reg = /(#[a-z0-9][a-z0-9\-_]+)/ig;
            $scope.tags = d.match(reg);
        },true);

        // end description Tagging

    }]);
'use strict';

angular.module('goal', ['Interpolation',
        'Google',
        'mgcrea.ngStrap.popover',
        'ngAnimate'
    ])
    .controller('goalAdd',['$scope', function($scope){

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

                    $scope.files.push(JSON.parse(res.xhr.responseText));
                    $scope.$apply();
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
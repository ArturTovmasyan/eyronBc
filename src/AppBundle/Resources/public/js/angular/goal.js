'use strict';

angular.module('goal', [])
    .controller('goalAdd',['$scope', '$timeout', function($scope, $timeout){

        $('.purple input').iCheck({
            checkboxClass: 'iradio_square-grey',
            increaseArea: '20%'
        });

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
        }
    }]);
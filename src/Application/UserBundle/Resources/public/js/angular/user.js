'use strict';

angular.module('user', ['Components', 'Interpolation'])
    .controller('SettingController', ['$scope', '$timeout',function($scope, $timeout){

        $scope.errorMessages = [];

        $timeout(function(){
            angular.element(".settings select").niceSelect();

            angular.element('input[type=radio]').iCheck({
                radioClass: 'iradio_minimal-purple',
                increaseArea: '20%'
            });

            angular.element("#settings-form").ajaxForm({
                success: function(res, text, header){
                    $.modal.close();
                },
                error: function(res, text, header){
                    $scope.errorMessages = angular.fromJson(res.responseText);
                    $scope.$apply();
                }
            });

        }, 600);
    }]);
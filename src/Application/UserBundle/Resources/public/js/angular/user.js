'use strict';

angular.module('user', ['Components', 'Interpolation'])
    .controller('SettingController', ['$scope', '$timeout', 'loginPopoverService', '$window', function($scope, $timeout, loginPopoverService, $window){

        $scope.errorMessages = [];

        $timeout(function(){
            angular.element(".settings select").niceSelect();

            angular.element('input[type=radio]').iCheck({
                radioClass: 'iradio_minimal-purple',
                increaseArea: '20%'
            });

            // angular.element("#settings-form").ajaxForm({
            //     success: function(){
            //         $window.location.reload();
            //     },
            //     error: function(res){
            //         $scope.errorMessages = angular.fromJson(res.responseText);
            //         if(res.status === 401) {
            //             $.modal.close();
            //             loginPopoverService.openLoginPopover();
            //         }
            //         $scope.$apply();
            //     }
            // });

        }, 600);
    }]);
'use strict';

angular.module('user', ['Components', 'Interpolation'])
    .controller('SettingController', ['$scope', '$timeout',function($scope, $timeout){
        $timeout(function(){
            angular.element(".settings select").niceSelect();

            angular.element('input[type=radio]').iCheck({
                radioClass: 'iradio_minimal-purple',
                increaseArea: '20%'
            });

            angular.element("#settings-form").ajaxForm({
                success: function(res, text, header){
                    console.log(res, text, header, 'SUCCESS');
                },
                error: function(res, text, header){
                    console.log(res, text, header, 'ERROR');
                }
            });

        }, 600);
    }]);
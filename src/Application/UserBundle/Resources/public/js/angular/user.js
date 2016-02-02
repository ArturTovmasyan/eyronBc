'use strict';

angular.module('user', ['Components', 'Interpolation'])
    .controller('SettingController', ['$scope', '$timeout',function($scope, $timeout){
        $timeout(function(){
            angular.element(".settings select").niceSelect();
        }, 600);
    }]);
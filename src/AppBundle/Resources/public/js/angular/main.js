'use strict';

angular.module('main',['mgcrea.ngStrap.popover',
    'ngAnimate',
    'Components',
    'ngSanitize'])
    .controller('MainController',['$scope',function($scope){
        console.log($scope);

        $scope.openSignInPopover = function(){
            var popoverScope = angular.element(".sign-in-popover").scope().$$childHead;
            if(!popoverScope.$isShown){
                popoverScope.$show();
                $scope.joinToggle2 = !$scope.joinToggle2;
            }
        }
    }]);
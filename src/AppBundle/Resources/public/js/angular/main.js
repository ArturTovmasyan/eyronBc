'use strict';

angular.module('main',['mgcrea.ngStrap.popover',
    'ngAnimate',
    'Components',
    'Google',
    'ngSanitize'])
    .controller('MainController',['$scope',function($scope){

        $scope.openSignInPopover = function(){
            var middleScope = angular.element(".sign-in-popover").scope();
            var popoverScope = middleScope.$$childHead;

            if(!popoverScope.$isShown){
                popoverScope.$show();
                middleScope.joinToggle2 = !middleScope.joinToggle2;
            }
        }
    }]);
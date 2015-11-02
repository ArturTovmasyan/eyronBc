'use strict';

angular.module('main',['mgcrea.ngStrap.modal', 'mgcrea.ngStrap.popover',
    'ngAnimate',
    'Components',
    'Interpolation',
    'Google',
    'ngSanitize'])
    .controller('MainController',['$scope', '$modal', function($scope, $modal){

        $scope.openSignInPopover = function(){
            var middleScope = angular.element(".sign-in-popover").scope();
            var popoverScope = middleScope.$$childHead;

            if(!popoverScope.$isShown){
                popoverScope.$show();
                middleScope.joinToggle2 = !middleScope.joinToggle2;
            }
        };

        console.log($scope);

        $scope.onMarkerClick = function(goal){
            console.log(goal);
            $scope.mapPopup = goal;
            $modal({scope: $scope, templateUrl: '/bundles/app/htmls/mapPopup.html',show: true});
        }
    }]);
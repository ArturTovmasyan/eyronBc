'use strict';

angular.module('main',['mgcrea.ngStrap.modal',
    'mgcrea.ngStrap.popover',
    'ng.deviceDetector',
    'ngAnimate',
    'user',
    'Components',
    'Interpolation',
    'Google',
    'ngSanitize'])
    .controller('MainController',['$scope',
        '$modal',
        '$timeout',
        'deviceDetector',
        function($scope, $modal, $timeout, deviceDetector){

        if (deviceDetector.raw.os.android || deviceDetector.raw.os.ios) {
            // open modal
            $timeout(function(){
                $scope.$broadcast('openLsModal', 'mobileDetectModal');
            }, 500);
        }

        $scope.openSignInPopover = function(){
            var middleScope = angular.element(".sign-in-popover").scope();
            var popoverScope = middleScope.$$childHead;

            if(!popoverScope.$isShown){
                popoverScope.$show();
                middleScope.joinToggle2 = !middleScope.joinToggle2;
            }
        };

        $scope.triggerMap = function(mapSelector){
            if(!mapSelector){
                return;
            }
            $timeout(function(){
                var mapScope = angular.element(mapSelector).isolateScope();
                google.maps.event.trigger(mapScope.map, 'resize');
            },150);
        }

        $scope.onMarkerClick = function(goal){
            console.log(goal);
            $scope.mapPopup = goal;
            $modal({scope: $scope, templateUrl: '/bundles/app/htmls/mapPopup.html',show: true});
        }
    }]);
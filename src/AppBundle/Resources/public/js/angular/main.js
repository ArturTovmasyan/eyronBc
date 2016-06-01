'use strict';

angular.module('main',['mgcrea.ngStrap.modal',
    'mgcrea.ngStrap.popover',
    'ng.deviceDetector',
    'ngAnimate',
    'user',
    'Confirm',
    'Components',
    'Interpolation',
    'Google',
    'angular-cache',
    'PathPrefix',
    'ngSanitize'])
    .config(function(CacheFactoryProvider){
        angular.extend(CacheFactoryProvider.defaults, {
            maxAge: 24 * 60 * 60 * 1000, // Items added to this cache expire after 15 minutes.
            cacheFlushInterval: 60 * 60 * 1000, // This cache will clear itself every hour.
            deleteOnExpire: 'aggressive', // Items will be deleted from this cache right when they expire.
            storageMode: 'localStorage' // This cache will use `localStorage`.
        });
    })
    .controller('MainController',['$scope',
        '$modal',
        '$timeout',
        'deviceDetector',
        function($scope, $modal, $timeout, deviceDetector){

        //if (deviceDetector.raw.os.android || deviceDetector.raw.os.ios) {
        //    // open modal
        //    $timeout(function(){
        //        $scope.$broadcast('openLsModal', 'mobileDetectModal');
        //    }, 500);
        //}

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
        };

        $scope.onMarkerClick = function(goal){
            $scope.mapPopup = goal;
            $modal({scope: $scope, templateUrl: '/bundles/app/htmls/mapPopup.html',show: true});
        };

    }])
    .controller('goalFooter', ['$scope', '$timeout', function($scope, $timeout){
        $scope.popoverByMobile = function(){
            $timeout(function(){
                angular.element('.navbar-toggle').click();
                    }, 500);
        };
    }])
    .controller('mobileModal',['$scope', 'deviceDetector', function($scope, deviceDetector) {
        $scope.deviceDetector = deviceDetector;

        $scope.isRuLanguage = (window.navigator.language.toLowerCase() == 'ru');
    }])
    .controller('popularGoalsController', ['$scope', '$http', 'CacheFactory', 'envPrefix', function($scope, $http, CacheFactory, envPrefix){
        var path = envPrefix + "api/v1.0/top-ideas/{count}";

        var profileCache = CacheFactory.get('bucketlist');

        if(!profileCache){
            profileCache = CacheFactory('bucketlist');
        }

        $scope.getPopularGoals = function(id){
            path = path.replace('{count}', $scope.count);

            var topIdeas = profileCache.get('top-ideas'+id);

            if (!topIdeas) {

                $http.get(path)
                    .success(function(data){
                        $scope.popularGoals = data;
                        profileCache.put('top-ideas'+id, data);
                    });
            }else {
                $scope.popularGoals = topIdeas;
            }
        };

        $scope.$watch('userId', function(id){
            $scope.getPopularGoals(id);
        })
    }]);
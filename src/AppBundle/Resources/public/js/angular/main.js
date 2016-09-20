'use strict';

angular.module('main',['mgcrea.ngStrap.modal',
    'mgcrea.ngStrap.popover',
    'ng.deviceDetector',
    'ngAnimate',
    'manage',
    'goalComponents',
    'user',
    'Confirm',
    'videosharing-embed',
    'Components',
    'Interpolation',
    'Google',
    'angular-cache',
    'PathPrefix',
    'Authenticator',
    'notification',
    'activity',
    'ngScrollbars',
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
        '$filter',
        'AuthenticatorLoginService',
        'envPrefix',
        '$http',
        function($scope, $modal, $timeout, deviceDetector, $filter, AuthenticatorLoginService, envPrefix, $http){

        //if (deviceDetector.raw.os.android || deviceDetector.raw.os.ios) {
        //    // open modal
        //    $timeout(function(){
        //        $scope.$broadcast('openLsModal', 'mobileDetectModal');
        //    }, 500);
        //}
        $scope.capitalizeFirstLetter = function (string) {
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        };

        $scope.dateToLocal = function(date){
            return $scope.capitalizeFirstLetter($filter('date')(new Date(date), "MMMM d 'at' hh:mm a"));
        };

        $scope.openSignInPopover = function(id){
            if(!id){
                AuthenticatorLoginService.openLoginPopup();
            } else {
                var url = envPrefix + 'api/v1.0/success-story/add-vote/{storyId}';
                url = url.replace('{storyId}', id);
                $http.get(url).success(function() {})
                    .error(function (res) {
                        AuthenticatorLoginService.openLoginPopup();
                    });
            }
        };

        $scope.triggerMap = function(mapSelector){
            if(!mapSelector){
                return;
            }

            $timeout(function(){
                var mapScope = angular.element(mapSelector).isolateScope();
                google.maps.event.trigger(mapScope.map, 'resize');

            }, 150);
        };

        $scope.onMarkerClick = function(goal){
            $scope.mapPopup = goal;
            $modal({scope: $scope, templateUrl: '/bundles/app/htmls/mapPopup.html',show: true});
        };

        var storyCount = $( ".swiper-wrapper" ).data('story-count');

        if(storyCount){
            for(var i = 0;i<storyCount;i++){
                $( '.swipebox-'+i ).swipebox();
                $( '.swipebox-video-'+i ).swipebox();
            }
        }

        $scope.scroller_config = {
            autoHideScrollbar: false,
            theme: 'minimal-dark',
            axis: 'y',
            advanced:{
                updateOnContentResize: true
            },
            callbacks:{
                onCreate: function(){
                    $(this).css({
                        'height': 'initial',
                        'max-height': '100px'
                    });
                }
            },
            setHeight: 200,
            scrollInertia: 0
        };

    }])
    .controller('goalFooter', ['$scope', '$timeout', '$http', 'loginPopoverService', function($scope, $timeout, $http, loginPopoverService){
        $scope.popoverByMobile = function(){
            $timeout(function(){
                angular.element('.navbar-toggle').click();
            }, 500);
        };
    }])
    .controller('mobileModal',['$scope', 'deviceDetector', function($scope, deviceDetector) {
        $scope.deviceDetector = deviceDetector;

        $scope.isRuLanguage = (window.navigator.language.toLowerCase() == 'ru');
    }]);
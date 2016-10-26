'use strict';

angular.module('leaderboard', ['Interpolation',
  'Components',
  'notification',
  'infinite-scroll',
  'ngAnimate',
  'PathPrefix'
]).constant('LeaderboardConstant',{
  TYPE_TRAVELLER : 1,
  TYPE_MOTIVATOR : 2,
  TYPE_INNOVATOR : 3,
  TRAVELLER_PATH : 'Traveller',
  MOTIVATOR_PATH : 'S.S. writer',
  INNOVATOR_PATH : 'Innovator',
  MAXIMUM_NORMALIZE_SCORE : 10
  })
  .controller('leaderboardController',['$scope', 'envPrefix', 'LeaderboardConstant', '$http', '$location', '$timeout', 'UserContext',
  function ($scope, envPrefix, LeaderboardConstant, $http, $location, $timeout, UserContext) {
    var path = $location.$$path;
    $scope.users = [];
    $scope.usersCount = 10;
    $scope.currentUserId = UserContext.id;
    $scope.isMobile = (window.innerWidth < 768);
    $scope.LeaderboardConstant = LeaderboardConstant;
    $scope.pageStatus = LeaderboardConstant.TYPE_INNOVATOR;
    var url = envPrefix + 'api/v1.0/badges/{type}/topusers/' + $scope.usersCount;

    if(path.length){
      $timeout(function () {
        path = path.slice(1);
        switch (path){
          case LeaderboardConstant.TRAVELLER_PATH:
            // $scope.goTo(LeaderboardConstant.TYPE_TRAVELLER);
            break;
          case LeaderboardConstant.MOTIVATOR_PATH:
            $scope.goTo(LeaderboardConstant.TYPE_MOTIVATOR);
            break;
          default:
            $scope.goTo($scope.pageStatus);
        }
      },100);
    } else {
      var currentUrl = url.replace('{type}', $scope.pageStatus);
      $http.get(currentUrl).success(function(data) {
        $scope.users = data;
      });
    }

    $scope.goTo = function (pageNumber) {
      switch (pageNumber){
        case LeaderboardConstant.TYPE_MOTIVATOR:
          $scope.users = [];
          $scope.pageStatus = pageNumber;
          break;
        case LeaderboardConstant.TYPE_INNOVATOR:
          $scope.users = [];
          $scope.pageStatus = pageNumber;
          break;
        // default:
        //   $scope.users = [];
        //   $scope.pageStatus = LeaderboardConstant.TYPE_TRAVELLER;
      }

      currentUrl = url.replace('{type}', $scope.pageStatus);
      $http.get(currentUrl).success(function(data) {
        $scope.users = data;
      });
    };

    $scope.getFullName = function (user) {
      if($scope.isMobile){
        return (user.first_name.length > 16)?(user.first_name.substr(0,13) + '...'):(user.first_name.length + user.last_name.length > 16)?(user.first_name + ' ' + user.last_name.substr(0,13 - user.first_name.length) + '...'): user.first_name + ' ' + user.last_name;
      } else {
        return user.first_name + ' ' + user.last_name;
      }
    }
  }
]);
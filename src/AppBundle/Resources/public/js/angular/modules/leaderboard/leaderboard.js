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
  MAXIMUM_NORMALIZE_SCORE : 10
  })
  .controller('leaderboardController',['$scope', 'envPrefix', 'LeaderboardConstant', '$http',
  function ($scope, envPrefix, LeaderboardConstant, $http) {
    $scope.users = [];
    $scope.usersCount = 10;
    $scope.isMobile = (window.innerWidth < 768);
    $scope.LeaderboardConstant = LeaderboardConstant;
    $scope.pageStatus = LeaderboardConstant.TYPE_TRAVELLER;
    var url = envPrefix + 'api/v1.0/badges/{type}/topusers/' + $scope.usersCount;

    var currentUrl = url.replace('{type}', $scope.pageStatus);
    $http.get(currentUrl).success(function(data) {
      $scope.users = data;
    })
    .error(function (res) {
      console.log(res);
      // if(res == "User not found") {
      //   $(".modal-loading").show();
      //   AuthenticatorLoginService.openLoginPopup();
      //   $(".modal-loading").hide();
      // }
    });

    $scope.goTo = function (pageNumber) {
      switch (pageNumber){
        case LeaderboardConstant.TYPE_MOTIVATOR:
          $scope.users = [];
          $scope.pageStatus = LeaderboardConstant.TYPE_MOTIVATOR;
          break;
        case LeaderboardConstant.TYPE_INNOVATOR:
          $scope.users = [];
          $scope.pageStatus = LeaderboardConstant.TYPE_INNOVATOR;
          break;
        default:
          $scope.users = [];
          $scope.pageStatus = LeaderboardConstant.TYPE_TRAVELLER;
      }

      currentUrl = url.replace('{type}', $scope.pageStatus);
      $http.get(currentUrl).success(function(data) {
        $scope.users = data;
      })
      .error(function (res) {
        console.log(res);
        // if(res == "User not found") {
        //   $(".modal-loading").show();
        //   AuthenticatorLoginService.openLoginPopup();
        //   $(".modal-loading").hide();
        // }
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

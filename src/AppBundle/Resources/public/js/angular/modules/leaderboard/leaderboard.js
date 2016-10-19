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
    $scope.pageStatus = LeaderboardConstant.TYPE_TRAVELLER;
    var url = envPrefix + 'api/v1.0/badges/{type}/topusers/' + $scope.usersCount;

    url = url.replace('{type}', $scope.pageStatus);
    $http.get(url).success(function(data) {
      console.log(data);
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
          $scope.pageStatus = LeaderboardConstant.TYPE_MOTIVATOR;
          break;
        case LeaderboardConstant.TYPE_INNOVATOR:
          $scope.pageStatus = LeaderboardConstant.TYPE_INNOVATOR;
          break;
        default:
          $scope.pageStatus = LeaderboardConstant.TYPE_TRAVELLER;
      }

      url = url.replace('{type}', $scope.pageStatus);
      $http.get(url).success(function(data) {
          console.log(data);
      })
      .error(function (res) {
        console.log(res);
        // if(res == "User not found") {
        //   $(".modal-loading").show();
        //   AuthenticatorLoginService.openLoginPopup();
        //   $(".modal-loading").hide();
        // }
      });
    }
  }
]);

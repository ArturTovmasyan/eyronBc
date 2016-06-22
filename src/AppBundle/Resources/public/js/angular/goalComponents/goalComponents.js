'use strict';

angular.module('goalComponents', ['Interpolation',
    'Components',
    'angular-cache',
    'PathPrefix'
    ])
  .controller('popularGoalsController', ['$scope', '$http', 'CacheFactory', 'envPrefix', 'refreshingDate',
    function($scope, $http, CacheFactory, envPrefix, refreshingDate){
    var path = envPrefix + "api/v1.0/top-ideas/{count}";
    var deg = 360;

    var popularCache = CacheFactory.get('bucketlist_by_popular');

    if(!popularCache){
      popularCache = CacheFactory('bucketlist_by_popular', {
        maxAge: 3 * 24 * 60 * 60 * 1000 ,// 3 day,
        deleteOnExpire: 'aggressive'
      });
    }

    $scope.refreshPopulars = function () {
      angular.element('#popularLoad').css({
        '-webkit-transform': 'rotate('+deg+'deg)',
        '-ms-transform': 'rotate('+deg+'deg)',
        'transform': 'rotate('+deg+'deg)'
      });
      deg += 360;
      $http.get(path)
        .success(function(data){
          $scope.popularGoals = data;
          popularCache.put('top-ideas'+$scope.userId, data);
        });
    };

    $scope.getPopularGoals = function(id){
      path = path.replace('{count}', $scope.count);

      var topIdeas = popularCache.get('top-ideas'+id);

      if (!topIdeas) {

        $http.get(path)
          .success(function(data){
            $scope.popularGoals = data;
            popularCache.put('top-ideas'+id, data);
          });
      }else {
        $scope.popularGoals = topIdeas;
      }
    };

    $scope.$on('addGoal', function(){
      angular.forEach($scope.popularGoals, function(item){
        if(item.id == refreshingDate.goalId){
          $scope.refreshPopulars();
        }
      });
    });

    $scope.$watch('userId', function(id){
      $scope.getPopularGoals(id);
    })
  }])
  .controller('userStatesController', ['$scope', '$http', 'CacheFactory', 'envPrefix', 'UserContext',
    function($scope, $http, CacheFactory, envPrefix, UserContext){

      var statePath = envPrefix + "api/v1.0/users/{id}/states";

      $scope.$on('addGoal', function(){
        $scope.changeStates();
      });

      $scope.changeStates = function () {
        statePath = statePath.replace('{id}', UserContext.id);

        $http.get(statePath)
          .success(function(data){
            $scope.isChange = true;
            $scope.stats = data;
            // profileCache.put('user-states'+id, data);
          });
      };

  }])
  .controller('goalFriends', ['$scope', '$http', 'CacheFactory', 'envPrefix', function($scope, $http, CacheFactory, envPrefix){
    var path = envPrefix + "api/v1.0/goal/random/friends";

    var profileCache = CacheFactory.get('bucketlist');
    var deg = 360;

    if(!profileCache){
      profileCache = CacheFactory('bucketlist');
    }

    $scope.getGaolFriends = function(id){

      var goalFriends = profileCache.get('goal-friends'+id);

      if (!goalFriends) {

        $http.get(path)
          .success(function(data){
            $scope.goalFriends = data[1];
            $scope.length = data['length'];
            profileCache.put('goal-friends'+id, data);
          });
      }else {
        $scope.goalFriends = goalFriends[1];
        $scope.length = goalFriends['length'];
      }
    };

    $scope.refreshGoalFriends = function () {
      angular.element('#goalFriendLoad').css({
        '-webkit-transform': 'rotate('+deg+'deg)',
        '-ms-transform': 'rotate('+deg+'deg)',
        'transform': 'rotate('+deg+'deg)'
      });
      deg += 360;
      $http.get(path)
        .success(function(data){
          var id = $scope.userId;
          $scope.length = data['length'];
          $scope.goalFriends = data[1];
          profileCache.put('goal-friends'+id, data);
        });
    };

    $scope.$on('addGoal', function(){
      $scope.refreshGoalFriends();
    });

    $scope.$watch('userId', function(id){
      $scope.getGaolFriends(id);
    })
  }]);


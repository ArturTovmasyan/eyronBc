'use strict';

angular.module('goalManage')
  .service('UserGoalDataManager', ['$resource', 'envPrefix', '$analytics', '$timeout', '$rootScope', 'refreshCacheService', 'UserContext', 'refreshingDate',
    function($resource, envPrefix, $analytics, $timeout, $rootScope, refreshCacheService, UserContext, refreshingDate){
    return $resource( envPrefix + 'api/v1.0/usergoals/:id/:where/:what', {}, {
      creates: {method:'PUT', transformResponse: function (object) {
          $analytics.eventTrack('Goal create', {  category: 'Goal', label: 'Goal create from Web' });
          return angular.fromJson(object);
      }},
      add: {method:'PUT', transformResponse: function (object) {
          refreshCacheService.refreshCache(UserContext.id, refreshingDate.goalId);
          $timeout(function(){
            $rootScope.$broadcast('addGoal');
          },600);
          $analytics.eventTrack('Goal add', {  category: 'Goal', label: 'Goal add from Web' });
          return angular.fromJson(object);
      }},
      manage: {method:'PUT', transformResponse: function (object) {
          $analytics.eventTrack('Goal manage', {  category: 'Goal', label: 'Goal manage from Web' });
          return angular.fromJson(object);
      }},
      done: {method:'GET', params:{where: 'dones', what: true }, transformResponse: function (object) {
          refreshCacheService.refreshCache(UserContext.id, refreshingDate.goalId);
          $timeout(function(){
            $rootScope.$broadcast('doneGoal');
          },600);
          $analytics.eventTrack('Goal done', {  category: 'Goal', label: 'Goal done from Web' });
          return angular.fromJson(object);
      }},
      delete: {method:'DELETE', transformResponse: function (object) {
          refreshCacheService.refreshCache(UserContext.id);
          $analytics.eventTrack('Goal unlisted', {  category: 'Goal', label: 'Goal unlisted from Web' });
          return object;
      }}
    });
  }])
  .service('refreshCacheService', ['$timeout', 'CacheFactory', function($timeout, CacheFactory){
    function refreshCache(userId, goalId){
      var profileCache = CacheFactory.get('bucketlist');
      var popularCache = CacheFactory.get('bucketlist_by_popular');

      if(!profileCache){
        profileCache = CacheFactory('bucketlist');
      }

      if(!popularCache){
        popularCache = CacheFactory('bucketlist_by_popular', {
          maxAge: 3 * 24 * 60 * 60 * 1000 ,// 3 day,
          deleteOnExpire: 'aggressive'
        });
      }

      //remove top ideas in cache if they are changed
      if(goalId){
        var cache = popularCache.get('top-ideas' + userId);
        angular.forEach(cache, function(item) {
          if(item.id == goalId){
            popularCache.remove('top-ideas' + userId);
          }
        });
      }

      //remove goal friends on add or done event
      profileCache.remove('goal-friends'+ userId);
    }
    return {
      refreshCache: refreshCache
    }
  }]);

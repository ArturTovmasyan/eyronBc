'use strict';

angular.module('goal', ['angulartics', 'angulartics.google.analytics'])
  .service('UserGoalDataManager', ['$resource', 'envPrefix', '$analytics', function($resource, envPrefix, $analytics){
    return $resource( envPrefix + 'api/v1.0/usergoals/:id/:where/:what', {}, {
      addGoal: {method:'GET', params:{where: 'dones'}, transformResponse: function (object) {
          $analytics.eventTrack('Goal add', {  category: 'Goal', label: 'Goal add from Web' });
          return object;
      }},
      editGoal: {method:'PUT', transformResponse: function (object) {
          $analytics.eventTrack('Goal add', {  category: 'Goal', label: 'Goal add from Web' });
          return object;
      }},
      doneGoal: {method:'GET', params:{where: 'dones', what: true }, transformResponse: function (object) {
          $analytics.eventTrack('Goal add', {  category: 'Goal', label: 'Goal add from Web' });
          return object;
      }},
      deleteUserGoal: {method:'DELETE', transformResponse: function (object) {
          $analytics.eventTrack('Goal add', {  category: 'Goal', label: 'Goal add from Web' });
          return object;
      }}
    });
  }]);

'use strict';

angular.module('goal')
  .service('UserGoalDataManager', ['$resource', 'envPrefix', '$analytics', function($resource, envPrefix, $analytics){
    return $resource( envPrefix + 'api/v1.0/usergoals/:id/:where/:what', {}, {
      add: {method:'GET', params:{where: 'dones', what: false }, transformResponse: function (object) {
          $analytics.eventTrack('Goal add', {  category: 'Goal', label: 'Goal add from Web' });
          return object;
      }},
      manage: {method:'PUT', transformResponse: function (object) {
          $analytics.eventTrack('Goal manage', {  category: 'Goal', label: 'Goal manage from Web' });
          return object;
      }},
      done: {method:'GET', params:{where: 'dones', what: true }, transformResponse: function (object) {
          $analytics.eventTrack('Goal done', {  category: 'Goal', label: 'Goal done from Web' });
          return object;
      }},
      delete: {method:'DELETE', transformResponse: function (object) {
          $analytics.eventTrack('Goal delete', {  category: 'Goal', label: 'Goal delete from Web' });
          return object;
      }}
    });
  }]);

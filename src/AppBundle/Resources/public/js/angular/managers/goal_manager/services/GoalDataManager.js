'use strict';

angular.module('goal')
  .service('UserGoalDataManager', ['$resource', 'envPrefix', function($resource, envPrefix){
    return $resource( envPrefix + 'api/v1.0/usergoals/:id/:where/:what', {}, {
      addGoal: {method:'GET', params:{where: 'dones'}},
      editGoal: {method:'PUT'},
      doneGoal: {method:'GET', params:{where: 'dones', what: true }},
      deleteUserGoal: {method:'DELETE'}
    });
  }]);

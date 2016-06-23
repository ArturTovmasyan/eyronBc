'use strict';

angular.module('goalManage', ['Interpolation',
    'Components',
    'LocalStorageModule',
    'angular-cache',
    'angulartics',
    'ngResource',
    'angulartics.google.analytics',
    'PathPrefix'
    ])
  .value('template', { addTemplate: ''})
  .value('userGoalData', { data: {}})
  .value('refreshingDate', {
    userId: '',
    goalId: ''
  });

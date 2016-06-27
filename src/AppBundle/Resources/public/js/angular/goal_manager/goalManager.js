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
  .value('template', { 
    addTemplate: '',
    doneTemplate: ''
  })
  .value('userGoalData', { 
      data: {},
      doneData: {}
  })
  .value('refreshingDate', {
    userId: '',
    goalId: ''
  });

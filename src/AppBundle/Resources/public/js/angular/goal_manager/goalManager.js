'use strict';

angular.module('goalManage', ['Interpolation',
    'Components',
    'LocalStorageModule',
    'angular-cache',
    'angulartics',
    'ngResource',
    'angulartics.google.analytics',
    'LocalStorageModule',
    'PathPrefix'
    ])
  .config(function (localStorageServiceProvider ) {
    localStorageServiceProvider
      .setPrefix('goal')
      .setNotify(false, false);
  })
  .value('template', { 
    addTemplate: '',
    doneTemplate: '',
    goalUsersTemplate: '',
    commonTemplate: ''
  })
  .value('userGoalData', { 
      data: {},
      manage: "",
      doneData: {}
  })
  .value('userData', {
    data: {},
    goalId: 0,
    isListed: false
  })
  .value('refreshingDate', {
    userId: '',
    goalId: ''
  });

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
    reportTemplate: '',
    commonTemplate: ''
  })
  .value('userGoalData', { 
      data: {},
      manage: "",
      doneData: {}
  })
  .value('userData', {
    data: {},
    report: {},
    goalId: 0,
    usersCount: 0,
    isListed: false
  })
  .value('refreshingDate', {
    userId: '',
    goalId: ''
  });

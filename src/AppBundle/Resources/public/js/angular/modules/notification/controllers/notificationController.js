'use strict';

angular.module('notification')
  .controller('notificationController',['$scope', '$timeout', '$http', '$compile',
    function ($scope, $timeout, $http, $compile) {
      $scope.notifies = [];
    }
  ]);
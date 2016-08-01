'use strict';

angular.module('notification')
  .controller('notificationController',['$scope', '$timeout', 'NotificationManager', '$compile',
    function ($scope, $timeout, NotificationManager, $compile) {
      // $scope.notifies = [];

      NotificationManager.getAll({id: 0,where: 10}, function (res) {
        $scope.notifies = res;
      });
      
      $scope.readAll = function(){
        NotificationManager.readAll({}, function (res) {
          //...........
        });
      }
      
    }
  ]);
'use strict';

angular.module('notification')
  .controller('notificationController',['$scope', '$timeout', 'NotificationManager', '$compile', '$window',
    function ($scope, $timeout, NotificationManager, $compile, $window) {
      // $scope.notifies = [];

      NotificationManager.getAll({id: 0,where: 10}, function (res) {
        $scope.notifies = res;
        $('#notification').slimScroll({
          height: '500px'
        });
      });
      
      $scope.delete = function(id, index){
        NotificationManager.delete({id: id}, function () {
          $scope.notifies.splice(index, 1);
        });
      };

      $scope.readAll = function(){
        NotificationManager.readAll({}, function () {
          $scope.allRead = true;
        });
      };

      $scope.singleRead = function(id, index){
        NotificationManager.readSingle({id: id}, function () {
          $scope.notifies[index].is_read = true;
        });
      };
      
      $scope.goNotificationPage = function (notify, index) {
        $scope.singleRead(notify.id, index);
        $window.location.href = notify.link;
      }
      
    }
  ]);
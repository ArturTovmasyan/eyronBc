'use strict';

angular.module('notification')
  .controller('notificationController',['$scope', '$timeout', 'NotificationManager', '$compile', '$window', '$sce',
    function ($scope, $timeout, NotificationManager, $compile, $window, $sce) {
      // $scope.notifies = [];
      $scope.newNotCount = 0;
      $scope.scroller_config = {
        autoHideScrollbar: false,
        theme: 'minimal-dark',
        axis: 'y',
        advanced:{
          updateOnContentResize: true
        },
        callbacks:{
          onCreate: function(){
            $(this).css({
              'height': 'initial',
              'max-height': '300px'
            });
          }
        },
        setHeight: 400,
        scrollInertia: 0
      };

      NotificationManager.getAll({id: 0,where: 10}, function (res) {
        $scope.newNotCount = res.unreadCount;
        $scope.notifies = res.userNotifications;
      });

      $scope.bodyInHtml = function(body) {
        return $sce.trustAsHtml(body);
      };
      
      $scope.delete = function(id, index){
        //NotificationManager.delete({id: id}, function () {
        //  if(!$scope.notifies[index].is_read){
        //    $scope.newNotCount --;
        //  }
          $scope.notifies.splice(index, 1);
        //});
      };

      $scope.readAll = function(){
        NotificationManager.readAll({}, function () {
          $scope.newNotCount = 0;
          angular.forEach($scope.notifies, function (not) {
            not.is_read = true;
          });
        });
      };

      $scope.singleRead = function(id, index){
        NotificationManager.readSingle({id: id}, function () {
          $scope.newNotCount --;
          $scope.notifies[index].is_read = true;
        });
      };
      
      $scope.goNotificationPage = function (notify, index) {
        $scope.singleRead(notify.id, index);
        $window.location.href = notify.notification.link;
      }
      
    }
  ])
  .controller('notificationInnerController',['$scope', '$timeout', 'NotificationManager', '$compile', '$window', '$sce',
    function ($scope, $timeout, NotificationManager, $compile, $window, $sce) {
      $scope.busy = false;
      $scope.notifies = [];
      $scope.start = 0;
      $scope.request = 0;
      $scope.count = 10;
      $scope.reserve = [];
      $scope.noNotification = false;

      $scope.getReserve = function() {
        $scope.busy = $scope.noNotification;
        $scope.notifies = $scope.notifies.concat($scope.reserve);
        $scope.nextReserve();
      };

      $scope.nextReserve = function () {
        if ($scope.busy) return;
        $scope.busy = true;
        var lastId = $scope.reserve.length?$scope.reserve[$scope.count -1].id:$scope.notifies[$scope.notifies.length -1].id;

        NotificationManager.getAll({id: $scope.start,where: $scope.count, what: lastId}, function (res) {
          if(!res.userNotifications.length){
            $scope.noNotification = true;
          } else {
            $scope.reserve = res.userNotifications;
            $scope.start += $scope.count;
            $scope.request++;
            $scope.busy = false;
          }
        });
      };
      
      $scope.nextNotifications = function () {
        if ($scope.busy) return;
        $scope.busy = true;
        // $scope.noItem = false;

        if($scope.request){
          $scope.getReserve();
        } else {
          NotificationManager.getAll({id: $scope.start,where: $scope.count}, function (res) {
              // if get empty
              if(!res.userNotifications.length){
                $scope.noNotification = true;
              } else {
                $scope.notifies = $scope.notifies.concat(res.userNotifications);
                $scope.start += $scope.count;
                $scope.request++;
                $scope.busy = false;
                $scope.nextReserve();
              }
          });
        }
      };

      $scope.nextNotifications();

      $scope.bodyInHtml = function(body) {
        return $sce.trustAsHtml(body);
      };

      $scope.delete = function(id, index){
        NotificationManager.delete({id: id}, function () {
          $scope.notifies.splice(index, 1);
        });
      };

      $scope.readAll = function(){
        NotificationManager.readAll({}, function () {
          angular.forEach($scope.notifies, function (not) {
            not.is_read = true;
          });
          if($scope.reserve.length){
            angular.forEach($scope.reserve, function (not) {
              not.is_read = true;
            });
          }
        });
      };

      $scope.singleRead = function(id, index){
        NotificationManager.readSingle({id: id}, function () {
          $scope.notifies[index].is_read = true;
        });
      };

      $scope.goNotificationPage = function (notify, index) {
        $scope.singleRead(notify.id, index);
        $window.location.href = notify.notification.link;
      }

    }
  ]);
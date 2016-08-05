'use strict';

angular.module('notification')
  .controller('notificationController',['$scope', '$timeout', 'NotificationManager', '$compile', '$window', '$sce',
    function ($scope, $timeout, NotificationManager, $compile, $window, $sce) {
      // $scope.notifies = [];
      //todo go from back end
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
        $scope.notifies = res;
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
          //todo something
          $scope.allRead = true;
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
  ]);
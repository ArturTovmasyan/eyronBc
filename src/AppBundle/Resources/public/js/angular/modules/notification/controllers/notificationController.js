'use strict';

angular.module('notification')
  .controller('notificationController',['$scope', '$timeout', 'NotificationManager', '$compile', '$window', '$sce',
    function ($scope, $timeout, NotificationManager, $compile, $window, $sce) {
      // $scope.notifies = [];
      $scope.scroller_config = {
        autoHideScrollbar: false,
        theme: 'minimal-dark',
        advanced:{
          updateOnContentResize: true
        },
        callbacks:{
          // onTotalScroll:function(){
          //   //console.log(this);
          //   if(scope.disableOnScroll){
          //     return;
          //   }
          //   scope.notificationManager.nextPage();
          //   scope.$apply();
          // },
          onCreate: function(){
            $(this).css({
              'height': 'initial',
              'max-height': '400px'
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
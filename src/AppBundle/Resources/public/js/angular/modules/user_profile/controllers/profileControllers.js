'use strict';

angular.module('profile')
  .controller('profileController',['$scope', '$timeout', 'lsInfiniteGoals', '$http', '$compile', 'refreshingDate', '$location', 'UserGoalConstant',
    function ($scope, $timeout, lsInfiniteGoals, $http, $compile, refreshingDate, $location, UserGoalConstant) {
      var path = $location.$$path;
      $scope.errorMessages = [];
      angular.element(".settings select").niceSelect();
      
      $scope.ProfileItems = new lsInfiniteGoals(10);

      $scope.Math = window.Math;
      $scope.locations = [];
      $scope.noItem = false;
      $scope.isMobile =false;
      $scope.isMobile = window.innerWidth < 767;
      var mapModalTemplateUrl = '/bundles/app/htmls/mapModal.html';

      $scope.castInt = function(value){
        return parseInt(value);
      };

      $scope.$on('doneGoal', function(){
        angular.element('.goal' + refreshingDate.goalId).removeClass("active-idea");
        $scope['doDate' + refreshingDate.goalId] = new Date();
      });

      $scope.goTo = function (status) {
        $scope.ProfileItems.reset();
        if(!angular.isUndefined($scope.Activities)){
          $scope.Activities.reset();
        }
        switch (status){
          case 1:
            $scope.ProfileItems.busy = false;
            $scope.profile.condition = 1;
            $scope.profile.status = UserGoalConstant.ACTIVE_PATH;
            $scope.ProfileItems.nextPage($scope.profile);
            break;
          case 2:
            $scope.ProfileItems.busy = false;
            $scope.profile.condition = 2;
            $scope.profile.status = UserGoalConstant.COMPLETED_PATH;
            $scope.ProfileItems.nextPage($scope.profile);
            break;
          case 3:
            $scope.ProfileItems.busy = true;
            $scope.profile.status = UserGoalConstant.COMMON_PATH;
            $scope.ProfileItems.common($scope.profile.userId);
            break;
          case 4:
            $scope.ProfileItems.busy = true;
            $scope.profile.status = UserGoalConstant.ACTIVITY_PATH;
            $scope.Activities.nextActivity();
            break;
          default:
            $scope.ProfileItems.busy = false;
            $scope.profile.condition = 0;
            $scope.profile.status = '';
            $scope.ProfileItems.nextPage($scope.profile);
        }
      };

      if(path.length){
        $scope.ProfileItems.busy = true;
        $timeout(function () {
          path = path.slice(1);
          switch (path){
            case UserGoalConstant.ACTIVE_PATH:
              $scope.goTo(1);
              break;
            case UserGoalConstant.COMPLETED_PATH:
              $scope.goTo(2);
              break;
            case UserGoalConstant.COMMON_PATH:
              $scope.goTo(3);
              break;
            case UserGoalConstant.ACTIVITY_PATH:
              $scope.goTo(4);
              break;
            default:
              $scope.goTo(0);
          }
        },100);
      }

      $('input[type=checkbox]:not(".onoffswitch-checkbox")').on('ifChanged', function(event){
        var el = event.target.name,
          isChecket = $(event.target).is(":checked");
        switch (el){
          case 'd':
            $scope.profile.isDream = isChecket?"true": "false";
            break;
          case 'f_1':
            $scope.profile.f_1 = isChecket?"true": "false";
            break;
          case 'f_2':
            $scope.profile.f_2 = isChecket?"true": "false";
            break;
          case 'f_3':
            $scope.profile.f_3 = isChecket?"true": "false";
            break;
          case 'f_4':
            $scope.profile.f_4 = isChecket?"true": "false";
        }
        $scope.ProfileItems.reset();
        $scope.ProfileItems.nextPage($scope.profile);
      });

      $scope.isEmpty = function (object) {
        return !Object.keys(object).length;
      };

      $scope.isLate = function (date) {
        if(!date){
          return false;
        }

        var d1 = new Date(date);
        var d2 = new Date();

        return (d1 < d2);
      };

      $scope.onMarkerClick = function(goal){
        $http.get(mapModalTemplateUrl)
          .success(function(res){

            var newSc = $scope.$new();
            newSc.goal = goal;

            var tmp = $compile(res)(newSc);
            angular.element('body').append(tmp);
            tmp.modal({
              fadeDuration: 500
            });
            tmp.on($.modal.CLOSE, function(){
              tmp.remove();
            })
          });
      };

      $scope.$watch('ProfileItems.userGoals', function(d) {
        $scope.locations = [];
        angular.forEach(d, function(item) {
          var location = {};
          var goal = item.goal? item.goal: item;
          if(goal.location ){
            location.id = goal.id;
            location.latitude = goal.location.latitude;
            location.longitude = goal.location.longitude;
            location.title = goal.title;
            location.slug = goal.slug;
            $scope.locations.push(location);
          }
        });
      });

    }
  ])
  .controller('friendsController',['$scope', '$timeout', 'lsInfiniteGoals', 'userData',
    function ($scope, $timeout, lsInfiniteGoals, userData) {
      $scope.isListed = userData.isListed;
      $scope.goalId = userData.goalId;
      $scope.usersCount = userData.usersCount;
      $scope.slug = $scope.isListed?1: 2;
      $scope.friendName = '';
      $scope.category = 'all';

      $scope.getCategory = function(category){
        $scope.category = category;
        $scope.Friends.reset();
        $scope.Friends.nextFriends($scope.friendName, $scope.slug, $scope.goalId, $scope.category);
      };
      if($scope.goalId){
        $scope.Friends = new lsInfiniteGoals(10);
      } else {
        $scope.Friends = new lsInfiniteGoals(20);
      }

      $scope.Friends.nextFriends($scope.friendName, $scope.slug, $scope.goalId, $scope.category);
      
      $scope.resetFriends = function () {
        $scope.Friends.reset();
        $scope.Friends.nextFriends($scope.friendName, $scope.slug, $scope.goalId, $scope.category);
      };
      
      $scope.doSearch = function(ev){
        
        if(ev.which == 13){
          ev.preventDefault();
          ev.stopPropagation();

          $scope.resetFriends();
        }
      };
    }
  ])
  .controller('commonController',['$scope', 'userData',
    function ($scope, userData) {
      $scope.goals = userData.data;

      $scope.castInt = function(value){
        return parseInt(value);
      };
    }
  ])
  .controller('reportController',['$scope', 'userData', 'UserGoalDataManager', '$timeout',
  function ($scope, userData, UserGoalDataManager, $timeout) {
    $scope.reportDate = {};
    $scope.reportDate.contentId = userData.report.comment;
    $scope.reportDate.contentType = userData.report.type;
    $scope.isReported = false;

    $scope.report = function(){
      if(!($scope.reportOption || $scope.reportText))return;

      $scope.reportDate.reportType = $scope.reportOption?$scope.reportOption:null;
      $scope.reportDate.message = $scope.reportText?$scope.reportText:null;

      UserGoalDataManager.report({}, $scope.reportDate, function () {
        $scope.isReported = true;
        $timeout(function(){
          $('#report-modal .close-icon').click();
        },1500);
      })
    }

  }
  ]);

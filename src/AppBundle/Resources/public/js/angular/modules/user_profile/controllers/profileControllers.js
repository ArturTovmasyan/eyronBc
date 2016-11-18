'use strict';

angular.module('profile')
  .controller('profileController',
    ['$scope',
      '$rootScope',
      '$timeout',
      'lsInfiniteGoals',
      '$http',
      '$compile',
      'refreshingDate',
      '$location',
      'UserGoalConstant',
      'UserContext',
    function ($scope, $rootScope, $timeout, lsInfiniteGoals, $http, $compile, refreshingDate, $location, UserGoalConstant, UserContext) {
      var path = $location.$$path;
      $scope.errorMessages = [];
      $scope.userGoalIds = [];
      angular.element(".settings select").niceSelect();
      
      $scope.ProfileItems = new lsInfiniteGoals(10);

      $scope.Math = window.Math;
      $scope.locations = [];
      $scope.noItem = false;
      $scope.isMobile =false;
      $scope.isMobile = window.innerWidth < 767;
      var mapModalTemplateUrl = '/bundles/app/htmls/mapModal.html';

      $scope.scrollTop = function () {
        $("html, body").animate({ scrollTop: 0 }, "slow");
      };

      $timeout(function () {
        $('.alert-success').addClass('ng-hide');
      }, 5000);

      $scope.castInt = function(value){
        return parseInt(value);
      };

      $scope.$on('doneGoal', function(){
        angular.element('.goal' + refreshingDate.goalId).removeClass("active-idea");
        $scope['doDate' + refreshingDate.goalId] = new Date();
      });

      $rootScope.$on('removeUserGoal', function (ev, id) {
        var index = $scope.userGoalIds.indexOf(id);

        if(index !== -1){
          $scope.userGoalIds[index] = 'removed';
        }
      });

      $rootScope.$on('lsJqueryModalClosedSaveGoal', function (ev, userGoal) {

        if(!userGoal)return;

        var index = $scope.userGoalIds.indexOf(userGoal.id);

        if(index !== -1){
          $scope.ProfileItems.userGoals[index].is_visible = userGoal.is_visible;
          $scope.ProfileItems.userGoals[index].do_date = userGoal.do_date;
          $scope.ProfileItems.userGoals[index].steps = userGoal.steps;
          $scope.ProfileItems.userGoals[index].completed = userGoal.completed;
        }
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
            $scope.$emit('lsGoActivity');
            break;
          case 5:
            $scope.ProfileItems.busy = false;
            $scope.profile.status = UserGoalConstant.OWNED_PATH;
            $scope.ProfileItems.nextPage($scope.profile);
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
            case UserGoalConstant.OWNED_PATH:
              $scope.goTo(5);
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
        return (angular.isUndefined(object) || !Object.keys(object).length);
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
            location.status = goal.is_my_goal;
            $scope.locations.push(location);
          }
        });
      });

    }
  ])
  .controller('friendsController',['$scope', '$timeout', 'lsInfiniteGoals', 'userData', '$location',
    function ($scope, $timeout, lsInfiniteGoals, userData, $location) {
      var path = $location.$$path;
      $scope.slug = userData.type;
      $scope.goalId = userData.itemId;
      $scope.usersCount = userData.usersCount;
      $scope.friendName = '';
      $scope.category = 'all';

      $scope.$on('lsGoalUsersModalClosed', function(){
        if(!angular.isUndefined($scope.Friends)){
          $scope.Friends.busy = true;
        }
      });

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

      if(path.length && !$scope.goalId){
        $timeout(function () {
          path = path.slice(1);
          switch (path){
            case 'recently':
              $scope.getCategory(path);
              break;
            case 'match':
              $scope.getCategory(path);
              break;
            case 'active':
              $scope.getCategory(path);
              break;
            case 'follow':
              $scope.getCategory(path);
              break;
            default:
              $scope.getCategory('all');
          }
        },100);
      }
      
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
  ]);

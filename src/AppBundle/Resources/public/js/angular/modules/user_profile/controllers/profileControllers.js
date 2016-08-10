'use strict';

angular.module('profile')
  .controller('profileController',['$scope', '$timeout', 'lsInfiniteGoals', '$http', '$compile', 'refreshingDate',
    function ($scope, $timeout, lsInfiniteGoals, $http, $compile, refreshingDate) {

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
            $scope.ProfileItems.nextPage($scope.profile);
            break;
          case 2:
            $scope.ProfileItems.busy = false;
            $scope.profile.condition = 2;
            $scope.ProfileItems.nextPage($scope.profile);
            break;
          case 3:
            $scope.ProfileItems.busy = true;
            $scope.ProfileItems.common($scope.profile.userId);
            break;
          case 4:
            $scope.ProfileItems.busy = true;
            $scope.Activities.nextActivity();
            break;
          default:
            $scope.ProfileItems.busy = false;
            $scope.profile.condition = 0;
            $scope.ProfileItems.nextPage($scope.profile);
        }
      };

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
  ]);
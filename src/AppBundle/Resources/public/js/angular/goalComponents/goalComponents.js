'use strict';

angular.module('goalComponents', ['Interpolation',
  'Components',
  'angular-cache',
  'ngSanitize',
  'goalManage',
  'angulartics',
  'angulartics.google.analytics',
  'PathPrefix',
  'Facebook'
  ])
  .controller('goalFooter', ['$scope', '$timeout',
    function($scope, $timeout){
      $scope.completed = true;

      $scope.popoverByMobile = function(){
        $timeout(function(){
          angular.element('.navbar-toggle').click();
        }, 500);
      };
    }])
  .controller('popularGoalsController', ['$scope', '$http', 'CacheFactory', 'envPrefix', 'refreshingDate',
    function($scope, $http, CacheFactory, envPrefix, refreshingDate){
    var path = envPrefix + "api/v1.0/top-ideas/{count}";
    var deg = 360;

    var popularCache = CacheFactory.get('bucketlist_by_popular');

    if(!popularCache){
      popularCache = CacheFactory('bucketlist_by_popular', {
        maxAge: 3 * 24 * 60 * 60 * 1000 ,// 3 day,
        deleteOnExpire: 'aggressive'
      });
    }

    $scope.castInt = function(value){
      return parseInt(value);
    };

    $scope.refreshPopulars = function () {
      angular.element('#popularLoad').css({
        '-webkit-transform': 'rotate('+deg+'deg)',
        '-ms-transform': 'rotate('+deg+'deg)',
        'transform': 'rotate('+deg+'deg)'
      });
      deg += 360;
      $http.get(path)
        .success(function(data){
          $scope.popularGoals = data;
          popularCache.put('top-ideas'+$scope.userId, data);
        });
    };

    $scope.getPopularGoals = function(id){
      path = path.replace('{count}', $scope.count);

      var topIdeas = popularCache.get('top-ideas'+id);

      if (!topIdeas) {

        $http.get(path)
          .success(function(data){
            $scope.popularGoals = data;
            popularCache.put('top-ideas'+id, data);
          });
      }else {
        $scope.popularGoals = topIdeas;
      }
    };

    $scope.$on('addGoal', function(){
      angular.forEach($scope.popularGoals, function(item){
        if(item.id == refreshingDate.goalId){
          $scope.refreshPopulars();
        }
      });
    });

    $scope.$on('doneGoal', function(){
      angular.forEach($scope.popularGoals, function(item){
        if(item.id == refreshingDate.goalId){
          $scope.refreshPopulars();
        }
      });
    });

    $scope.$watch('userId', function(id){
      $scope.getPopularGoals(id);
    })
  }])
  .controller('featureGoalsController', ['$scope', '$http', 'CacheFactory', 'envPrefix', 'refreshingDate',
    function($scope, $http, CacheFactory, envPrefix, refreshingDate){
      var path = envPrefix + "api/v1.0/goal/featured";

      var popularCache = CacheFactory.get('bucketlist_by_feature');

      if(!popularCache){
        popularCache = CacheFactory('bucketlist_by_feature', {
          maxAge: 24 * 60 * 60 * 1000 ,// 1 day
          deleteOnExpire: 'aggressive'
        });
      }

      $scope.castInt = function(value){
        return parseInt(value);
      };

      $scope.refreshFeatures = function(){
        $http.get(path)
            .success(function(data){
              $scope.features = data;
              popularCache.put('features'+$scope.userId, data);
            });
      };

      $scope.getPopularGoals = function(id){

        var features = popularCache.get('features'+id);

        if (!features) {

          $http.get(path)
              .success(function(data){
                $scope.featureGoals = data;
                popularCache.put('features'+id, data);
              });
        }else {
          $scope.featureGoals = features;
        }
      };

      $scope.$on('addGoal', function(){
        angular.forEach($scope.featureGoals, function(item){
          if(item.id == refreshingDate.goalId){
            $scope.refreshFeatures();
          }
        });
      });

      $scope.$on('doneGoal', function(){
        angular.forEach($scope.popularGoals, function(item){
          if(item.id == refreshingDate.goalId){
            $scope.refreshFeatures();
          }
        });
      });

      $scope.$watch('userId', function(id){
        $scope.getPopularGoals(id);
      })
    }])
  .controller('userStatesController', ['$scope', '$http', 'CacheFactory', 'envPrefix', 'UserContext',
    function($scope, $http, CacheFactory, envPrefix, UserContext){

      var statePath = envPrefix + "api/v1.0/users/{id}/states";

      $scope.$on('addGoal', function(){
        $scope.changeStates();
      });

      $scope.$on('doneGoal', function(){
        $scope.changeStates();
      });

      $scope.changeStates = function () {
        statePath = statePath.replace('{id}', UserContext.id);

        $http.get(statePath)
          .success(function(data){
            $scope.isChange = true;
            $scope.stats = data;
            // profileCache.put('user-states'+id, data);
          });
      };

  }])
  .controller('goalFriends', ['$scope', '$http', 'CacheFactory', 'envPrefix', function($scope, $http, CacheFactory, envPrefix){
    var path = envPrefix + "api/v1.0/goal/random/friends";

    var profileCache = CacheFactory.get('bucketlist');
    var deg = 360;

    if(!profileCache){
      profileCache = CacheFactory('bucketlist');
    }

    $scope.getGaolFriends = function(id){

      var goalFriends = profileCache.get('goal-friends'+id);

      if (!goalFriends) {

        $http.get(path)
          .success(function(data){
            $scope.goalFriends = data[1];
            $scope.length = data['length'];
            profileCache.put('goal-friends'+id, data);
          });
      }else {
        $scope.goalFriends = goalFriends[1];
        $scope.length = goalFriends['length'];
      }
    };

    $scope.refreshGoalFriends = function () {
      angular.element('#goalFriendLoad').css({
        '-webkit-transform': 'rotate('+deg+'deg)',
        '-ms-transform': 'rotate('+deg+'deg)',
        'transform': 'rotate('+deg+'deg)'
      });
      deg += 360;
      $http.get(path)
        .success(function(data){
          var id = $scope.userId;
          $scope.length = data['length'];
          $scope.goalFriends = data[1];
          profileCache.put('goal-friends'+id, data);
        });
    };

    $scope.$on('addGoal', function(){
      $scope.refreshGoalFriends();
    });

    $scope.$on('doneGoal', function(){
      $scope.refreshGoalFriends();
    });

    $scope.$watch('userId', function(id){
      $scope.getGaolFriends(id);
    })
  }])
  .controller('goalDone', ['$scope',
    '$sce',
    '$timeout',
    '$window',
    'userGoalData',
    'UserGoalDataManager',
    'envPrefix',
    function($scope, $sce, $timeout, $window, userGoalData, UserGoalDataManager, envPrefix){

      $timeout(function(){
        angular.element("#story-modal select").niceSelect();
      }, 300);
      var date = new Date();

      $scope.month = moment(date).format('M');
      $scope.day = moment(date).format('D');
      $scope.year = moment(date).format('YYYY');

      $scope.userGoal = userGoalData.doneData;
      $scope.noStory = false;
      $scope.invalidYear = false;
      $scope.uncompletedYear = false;
      $scope.newAdded = userGoalData.manage? false: true;
      $scope.goalLink = window.location.origin + envPrefix + 'goal/' +$scope.userGoal.goal.slug;
      $scope.files = [];
      $scope.successStory = {};
      var imageCount = 6;
      var clickable = true;
      if(!angular.isUndefined($scope.userGoal.story) && !angular.isUndefined($scope.userGoal.story.files)){
        imageCount = 6 - $scope.userGoal.story.files.length
      }

      $('body').on('focus', 'textarea[name=story]', function() {
        $('textarea[name=story]').removeClass('border-red');
        $scope.noStory = false;
        $scope.invalidYear = false;
        $scope.uncompletedYear = false;
      });

      $scope.isInValid = function () {
        $scope.noStory = false;
        var noDate = $scope.noData();
        if(!noDate){
          if(angular.isUndefined($scope.userGoal.story)
            || angular.isUndefined($scope.userGoal.story.story)
            || $scope.userGoal.story.story.length < 3 )$scope.noStory = true;

        }
      };

      $scope.compareDates = function(date1, date2){
        if(!date1){
          return null;
        }

        var d1 = new Date(date1);
        var d2 = date2 ? new Date(date2): new Date();

        if(d1 < d2){
          return -1;
        }
        else if(d1 === d2){
          return 0;
        }
        else {
          return 1;
        }
      };

      $scope.noData = function () {
        return ((angular.isUndefined($scope.userGoal.videos_array) || $scope.userGoal.videos_array.length < 2)&&
              (angular.isUndefined($scope.files) || !$scope.files.length )&&
              ( angular.isUndefined($scope.userGoal.story) || angular.isUndefined($scope.userGoal.story.story)))
      };
      
      $scope.save = function () {
        $scope.isInValid();
        if($scope.year && $scope.month && $scope.day && $scope.newAdded){
            $scope.completion_date = moment($scope.month+','+$scope.day+','+$scope.year).format('MM-DD-YYYY');
            var comletion_date = {
              'goal_status'    : true,
              'completion_date': $scope.completion_date
            };

            if($scope.compareDates($scope.completion_date) === 1){
              $scope.invalidYear = true;
              return;
            } else {
              $scope.invalidYear = false;
            }

            UserGoalDataManager.manage({id: $scope.userGoal.goal.id}, comletion_date, function (){
              var selector = 'success' + $scope.userGoal.goal.id;
              if(angular.element('#'+ selector).length > 0) {
                var parentScope = angular.element('#' + selector).scope();
                if(!angular.isUndefined(parentScope.goalDate)) {
                  parentScope.goalDate[$scope.userGoal.goal.id] = new Date($scope.completion_date);
                }
              }

              if($scope.noData()){
                $scope.noStory = false;
                angular.element('#cancel').click();
              }
            });
        } else if(($scope.year || $scope.month || $scope.day) && $scope.newAdded){
          $scope.uncompletedYear = true;
          return;
        }
        if($scope.noStory){
          angular.element('textarea[name=story]').addClass('border-red');
          return;
        }
        if(!clickable){
          return;
        }
        $timeout(function(){
          $scope.video_link = [];
          angular.forEach($scope.userGoal.videos_array, function (d) {
            if(!angular.isUndefined(d.link) && d.link){
              $scope.video_link.push(d.link);
            }
          });
          var data = {
            'story'     : $scope.userGoal.story.story,
            'videoLink' : $scope.video_link,
            'files'     : $scope.files
          };
          UserGoalDataManager.editStory({id: $scope.userGoal.goal.id}, data, function (){
            angular.element('#cancel').click();
          });
        }, 100)
      };

      // file uploads

      Dropzone.options.goalDropzone = false;

      $scope.initDropzone = function(url){
        if(!url){
          return;
        }

        $timeout(function(){
          $scope.goalDropzone = new Dropzone('#goalDropzone', {
            url: url,
            addRemoveLinks: true,
            uploadMultiple: false,
            maxThumbnailFilesize: 6,
            maxFiles: imageCount,
            sending: function(){
              clickable = false;
            },
            removedfile: function(d){
              angular.element(d.previewElement).remove();
              var id = JSON.parse(d.xhr.responseText);
              var index = $scope.files.indexOf(id);
              if(index !== -1){
                $scope.files.splice(index, 1);
              }

              $scope.$apply();
            },
            complete: function(res){
              clickable = true;
              if(res.xhr.status !== 200){
                return;
              }

              $scope.files = $scope.files.concat(JSON.parse(res.xhr.responseText));
              $scope.$apply();
            }
          });
          if(!angular.isUndefined($scope.userGoal.story) && !angular.isUndefined($scope.userGoal.story.files) && $scope.userGoal.story.files) {
            var existingFiles = $scope.userGoal.story.files;

            angular.forEach(existingFiles, function (value) {

              $scope.files.push(value.id);

              var mockFile = {name: value.file_original_name, size: value.file_size, fileName: value.file_name, xhr: {responseText: value.id}};

              $scope.goalDropzone.emit("addedfile", mockFile);
              $scope.goalDropzone.emit("thumbnail", mockFile, value.image_path);
            });
          }
        }, 500);
      };

      // end file uploads
      $scope.trustedUrl = function(url){
        return $sce.trustAsResourceUrl(url);
      };

  }])
  .controller('goalEnd', ['$scope',
    '$timeout',
    '$window',
    'UserGoalConstant',
    'GoalConstant',
    '$http',
    'userGoalData',
    'UserGoalDataManager',
    '$analytics',
    'AuthenticatorLoginService',
    function(
      $scope,
      $timeout,
      $window,
      UserGoalConstant,
      GoalConstant,
      $http,
      userGoalData,
      UserGoalDataManager,
      $analytics,
      AuthenticatorLoginService
    ){

      $timeout(function(){
        angular.element("#goal-modal select").niceSelect();
      }, 300);
      $scope.updateDate = function (date) {
        if(date){
          $scope.month = moment(date).format('M');
          $scope.day = moment(date).format('D');
          $scope.year = moment(date).format('YYYY');
        }else {
          $scope.month = "";
          $scope.day   = "";
          $scope.year  = "";
        }
      };

      $scope.userGoal = userGoalData.data;
      if(!angular.isUndefined($scope.userGoal.completion_date) && $scope.userGoal.status == UserGoalConstant['COMPLETED']){
        $scope.updateDate($scope.userGoal.completion_date);
        $scope.userGoal.completion_date = moment($scope.userGoal.completion_date).format('MM-DD-YYYY');
      } else{
        if(!angular.isUndefined($scope.userGoal.do_date)){
          $scope.updateDate($scope.userGoal.do_date);
        }
      }
      angular.element('#goal-create-form').attr('data-goal-id', $scope.userGoal.goal.id);
      $scope.GoalConstant = GoalConstant;
      $scope.UserGoalConstant = UserGoalConstant;

      if(angular.element('#goal-create-form').length > 0){
        $scope.newAdded = true;
      } else {
        $scope.newAdded = false;
      }

      $scope.$on('addGoal', function(){
        $scope.newAdded = true;
      });

      $scope.stepsArray = [{}];

      if(!$scope.userGoal.goal || !$scope.userGoal.goal.id){
        console.warn('undefined goal or goalId of UserGoal');
      }

      var switchChanged = false;
      var dateChanged = false;
      var isSuccess = false;

      $scope.$watch('complete.switch', function (d) {
        if( d !== 0 && d !== 1){
          switchChanged = !switchChanged;
          if(d){
            $scope.updateDate(new Date());
          }
          else{
            if(!angular.isUndefined($scope.userGoal.do_date)){
              $scope.updateDate($scope.userGoal.do_date);
            }
            else{
              $scope.updateDate(null);
            }
          }

          $timeout(function(){
            angular.element("#goal-modal select").niceSelect('update');
          }, 20);

        }
        else {
          if(angular.element('#success' + $scope.userGoal.goal.id).length > 0) {
            isSuccess = angular.element('#success' + $scope.userGoal.goal.id).scope().success[$scope.userGoal.goal.id]?true:false;
          }
        }
      });

      $scope.openSignInPopup = function(){
        AuthenticatorLoginService.openLoginPopup()
      };

      $scope.compareDates = function(date1, date2){
        if(!date1){
          return null;
        }

        var d1 = new Date(date1);
        var d2 = date2 ? new Date(date2): new Date();

        if(d1 < d2){
          return -1;
        }
        else if(d1 === d2){
          return 0;
        }
        else {
          return 1;
        }
      };

      $scope.getCompleted = function(userGoal){
        if(!userGoal || !userGoal.steps || !userGoal.steps.length){
          return 100;
        }

        var result = 0;
        angular.forEach(userGoal.steps, function(v){
          if(v === $scope.UserGoalConstant['DONE']){
            result++;
          }
        });

        return result * 100 / userGoal.steps.length;
      };

      $scope.momentDateFormat = function(date, format){
        return moment(date).format(format);
      };

      $scope.momentDateModify = function(date, value, key, format){
        var m = moment(date);

        if(key === 'day'){
          return m.day(value).format(format);
        }
      };

      //$scope.getSecondPickerDate = function(date, format){
      //  var days = parseInt(moment(date).format('D'));
      //
      //  if(days > 28 && days < 32){
      //    return $scope.momentDateModify(date, '+10', 'day', format)
      //  }
      //  else {
      //    return $scope.momentDateModify(date, '+33', 'day', format)
      //  }
      //};

      $scope.getPriority = function(userGoal){
        if(!userGoal || !userGoal.id){
          return null;
        }

        if(userGoal.urgent && userGoal.important){
          return $scope.UserGoalConstant['URGENT_IMPORTANT'];
        }
        else if(userGoal.urgent && !userGoal.important){
          return $scope.UserGoalConstant['URGENT_NOT_IMPORTANT'];
        }
        else if(!userGoal.urgent && userGoal.important) {
          return $scope.UserGoalConstant['NOT_URGENT_IMPORTANT'];
        }
        else if(!userGoal.urgent && !userGoal.important){
          return $scope.UserGoalConstant['NOT_URGENT_NOT_IMPORTANT'];
        }

        return null;
      };

      $scope.getUrgentImportant = function(priority){
        if(priority === $scope.UserGoalConstant['URGENT_IMPORTANT']){
          return {urgent: true, important: true};
        }
        else if(priority === $scope.UserGoalConstant['URGENT_NOT_IMPORTANT']){
          return {urgent: true, important: false};
        }
        else if(priority === $scope.UserGoalConstant['NOT_URGENT_IMPORTANT']) {
          return {urgent: false, important: true};
        }
        else if(priority === $scope.UserGoalConstant['NOT_URGENT_NOT_IMPORTANT']){
          return {urgent: false, important: false};
        }
      };

      $scope.removeLocation = function(){
        angular.element(".location .location-hidden").val(null);
        angular.element(".location .location-hidden").attr('value',null);
        angular.element(".location .place-autocomplete").val('');
      };
      $scope.uncompletedYear = false;

      $scope.save = function () {
        $timeout(function(){
          $scope.uncompletedYear = false;
          if($scope.year && $scope.month && $scope.day){
            dateChanged = true;
            if($scope.complete.switch){
              $scope.userGoal.completion_date = moment($scope.month+','+$scope.day+','+$scope.year).format('MM-DD-YYYY');
            }else{
              $scope.userGoal.do_date = moment($scope.month+','+$scope.day+','+$scope.year).format('MM-DD-YYYY');
            }
          } else if($scope.year || $scope.month || $scope.day){
            $scope.uncompletedYear = true;
            return;
          }
          $scope.invalidYear = false;
          if($scope.userGoal.completion_date && $scope.compareDates($scope.userGoal.completion_date) === 1){
            $scope.invalidYear = true;
            return;
          }
          var selector = 'success' + $scope.userGoal.goal.id;
          if(angular.element('#'+ selector).length > 0) {
            var parentScope = angular.element('#' + selector).scope();
            //if goal status changed
            if (switchChanged) {
              parentScope.success[$scope.userGoal.goal.id] = !parentScope.success[$scope.userGoal.goal.id];
              parentScope.completed = !parentScope.completed;
              if(!angular.isUndefined(parentScope.goalDate)){
                //if goal changed  from success to active
                if (isSuccess) {
                  //and date be changed
                  if (dateChanged && $scope.userGoal.do_date) {
                    //change  doDate
                    parentScope.goalDate[$scope.userGoal.goal.id] = new Date($scope.userGoal.do_date);
                    angular.element('.goal' + $scope.userGoal.goal.id).addClass("active-idea");
                  } else {
                    if($scope.userGoal.do_date){
                      parentScope.goalDate[$scope.userGoal.goal.id] = new Date($scope.userGoal.do_date);
                      angular.element('.goal' + $scope.userGoal.goal.id).addClass("active-idea");
                    }else {
                      //infinity
                      parentScope.goalDate[$scope.userGoal.goal.id] = 'dreaming';
                      angular.element('.goal' + $scope.userGoal.goal.id).removeClass("active-idea");
                    }
                  }
                } else {
                  //new datetime for completed
                  angular.element('.goal' + $scope.userGoal.goal.id).removeClass("active-idea");
                  if($scope.userGoal.completion_date){
                    parentScope.goalDate[$scope.userGoal.goal.id] = new Date($scope.userGoal.completion_date);
                  }else {
                    parentScope.goalDate[$scope.userGoal.goal.id] = new Date();
                  }
                }
              }
            } else {
              if (!isSuccess && dateChanged && $scope.userGoal.do_date && !angular.isUndefined(parentScope.goalDate)) {
                //change for doDate
                parentScope.goalDate[$scope.userGoal.goal.id] = new Date($scope.userGoal.do_date);
                angular.element('.goal' + $scope.userGoal.goal.id).addClass("active-idea");
              }else{
                if(isSuccess && dateChanged && $scope.userGoal.completion_date){
                  angular.element('.goal' + $scope.userGoal.goal.id).removeClass("active-idea");
                  parentScope.goalDate[$scope.userGoal.goal.id] = new Date($scope.userGoal.completion_date);
                }
              }
            }
          }

          $scope.userGoal.steps = {};
          angular.forEach($scope.userGoal.formatted_steps, function(v){
            if(v.text) {
              $scope.userGoal.steps[v.text] = v.switch ? v.switch : false;
            }
          });

          var ui = $scope.getUrgentImportant(parseInt($scope.userGoal.priority));
          if(ui){
            $scope.userGoal.urgent    = ui.urgent;
            $scope.userGoal.important = ui.important;
          }

          $scope.userGoal.goal_status = $scope.complete.switch;

          UserGoalDataManager.manage({id: $scope.userGoal.goal.id}, $scope.userGoal, function (){
            angular.element('#cancel').click();
            if(angular.element('#goal-create-form').length > 0 && $scope.redirectPath){
              $window.location.href = $scope.redirectPath;
            }
          });
        }, 100)
      };

      $scope.removeUserGoal = function (id) {
        UserGoalDataManager.delete({id:id}, function (resource){
          if(resource[0] == 1){
            $analytics.eventTrack('Goal delete', {  category: 'Goal', label: 'Goal delete from Web' });
          }
          window.location.reload();
        });
      };

      $timeout(function(){
        //angular.element('#datepicker').datepicker({
        //  beforeShowDay: function(){
        //    var cond = angular.element('#datepicker').data('datepicker-disable');
        //    return !cond;
        //  },
        //  todayHighlight: true
        //});
        //angular.element('#secondPicker').datepicker({
        //  beforeShowDay: function(){
        //    var cond = angular.element('#datepicker').data('datepicker-disable');
        //    return !cond;
        //  },
        //  todayHighlight: true
        //});
        //
        //angular.element("#secondPicker").find( "td" ).removeClass("active");
        //
        //angular.element("#datepicker").on("changeDate", function() {
        //  angular.element("#secondPicker").find( "td" ).removeClass("active");
        //  $scope.datepicker_title = true;
        //  var doDate =  angular.element("#datepicker").datepicker('getDate');
        //  $scope.userGoal.do_date = moment(doDate).format('MM-DD-YYYY');
        //  dateChanged = true;
        //  $scope.$apply();
        //});
        //angular.element("#secondPicker").on("changeDate", function() {
        //  angular.element("#datepicker").find( "td" ).removeClass("active");
        //  $scope.datepicker_title = true;
        //  var doDate = angular.element("#secondPicker").datepicker('getDate');
        //  dateChanged = true;
        //  $scope.userGoal.do_date = moment(doDate).format('MM-DD-YYYY');
        //  $scope.$apply();
        //});

        angular.element('input.important-radio').iCheck({
          radioClass: 'iradio_minimal-purple',
          increaseArea: '20%'
        }).on('ifChanged', function (event) {
          var target = angular.element(event.target);
          angular.element(".priority-radio").removeClass('active-important');
          target.parents().closest('.priority-radio').addClass('active-important');
          $scope.userGoal.priority = target.val();
          target.trigger('change');
        });
      }, 100);
  }]);

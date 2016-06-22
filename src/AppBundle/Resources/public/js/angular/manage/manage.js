'use strict';

angular.module('manage', ['Interpolation',
    'Components',
    'LocalStorageModule',
    'angular-cache',
    'angulartics',
    'ngResource',
    'goalManage',
    'angulartics.google.analytics',
    'PathPrefix'
    ])
    .run(['$http', 'envPrefix', 'template',function($http, envPrefix, template){
        var url = envPrefix + "goal/add-modal";
        $http.get(url).success(function(data) {
            template.addTemplate = data;
        })
    }])
    .directive('lsGoalManage',['$compile',
        '$http',
        '$rootScope',
        'loginPopoverService',
        'template',
        'userGoalData',
        'UserGoalDataManager',
        '$timeout',
        'refreshingDate',
        function($compile, $http, $rootScope, loginPopoverService, template, userGoalData, UserGoalDataManager, $timeout, refreshingDate){
            return {
                restrict: 'EA',
                scope: {
                    lsGoalId: '@',
                    lsType: '@',
                    lsInitialRun: '=',
                    lsUserId: '@'
                },
                link: function(scope, el){

                    if(scope.lsInitialRun){
                        $timeout(function(){
                            scope.run();
                        }, 1000);
                    }

                    el.bind('click', function(){
                        scope.run();
                    });

                    scope.run = function(){
                        $(".modal-loading").show();

                        if(scope.lsType){
                            UserGoalDataManager.get({id: scope.lsGoalId}, function (uGoal){
                                scope.runCallback(uGoal);
                            }, function(res){
                                if(res.status === 401){
                                    loginPopoverService.openLoginPopover();
                                }
                            });
                        }
                        else {
                            refreshingDate.goalId = scope.lsGoalId;
                            
                            if(scope.lsUserId){
                                //for refresh cache event
                                refreshingDate.userId = scope.lsUserId;
                            }
                            
                            if(scope.lsInitialRun){
                                UserGoalDataManager.get({id: scope.lsGoalId}, function (uGoal){
                                    if(uGoal.id){
                                        scope.runCallback(uGoal);
                                    }
                                    else {
                                        UserGoalDataManager.add({id: scope.lsGoalId}, {}, function (uGoal){
                                            scope.runCallback(uGoal);
                                        }) 
                                    }
                                })
                            }
                            else {
                                UserGoalDataManager.add({id: scope.lsGoalId}, {}, function (uGoal){
                                    scope.runCallback(uGoal);
                                }, function(res){
                                    if(res.status === 401){
                                        loginPopoverService.openLoginPopover();
                                    }
                                });
                            }
                        }
                    };

                    scope.runCallback = function(uGoal){
                        userGoalData.data = uGoal;
                        if(userGoalData.data.do_date){
                            userGoalData.data.do_date = moment(userGoalData.data.do_date).format('MM-DD-YYYY');
                        }

                        var tmp = $compile(template.addTemplate)(scope);
                        scope.openModal(tmp);
                        $(".modal-loading").hide();
                    };

                    scope.openModal = function(tmp){

                        angular.element('body').append(tmp);
                        tmp.modal({
                            fadeDuration: 300
                        });

                        tmp.on($.modal.CLOSE, function(){
                            tmp.remove();
                        })
                    }

                }
            }
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
      'refreshingDate',
      'refreshCacheService',
      function($scope, $timeout, $window, UserGoalConstant, GoalConstant, $http, userGoalData, UserGoalDataManager, $analytics, refreshingDate, refreshCacheService){

          $scope.userGoal = userGoalData.data;
          angular.element('#goal-create-form').attr('data-goal-id', $scope.userGoal.goal.id);
          $scope.GoalConstant = GoalConstant;
          $scope.UserGoalConstant = UserGoalConstant;

          if(angular.element('#goal-create-form').length > 0){
              $scope.newAdded = true;
          }else {
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
                  switchChanged = !switchChanged
              }else {
                  if(angular.element('#success' + $scope.userGoal.goal.id).length > 0) {
                      isSuccess = angular.element('#success' + $scope.userGoal.goal.id).scope()['success' + $scope.userGoal.goal.id]?true:false;
                  }
              }
          });

          $scope.openSignInPopover = function(){
              var middleScope = angular.element(".sign-in-popover").scope();
              var popoverScope = middleScope.$$childHead;

              if(!popoverScope.$isShown){
                  popoverScope.$show();
                  middleScope.joinToggle2 = !middleScope.joinToggle2;
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

          $scope.getSecondPickerDate = function(date, format){
              var days = parseInt(moment(date).format('D'));

              if(days > 28 && days < 32){
                  return $scope.momentDateModify(date, '+10', 'day', format)
              }
              else {
                  return $scope.momentDateModify(date, '+33', 'day', format)
              }
          };

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

          $scope.save = function () {
              $timeout(function(){
                  var selector = 'success' + $scope.userGoal.goal.id;
                  if(angular.element('#'+ selector).length > 0) {
                      var parentScope = angular.element('#' + selector).scope();
                      //if goal status changed
                      if (switchChanged) {
                          parentScope[selector] = !parentScope[selector];
                          //if goal changed  from success to active
                          if (isSuccess) {
                              //and date be changed
                              if (dateChanged && $scope.userGoal.do_date) {
                                  //change  doDate
                                  parentScope['change' + $scope.userGoal.goal.id] = 2;
                                  parentScope['doDate' + $scope.userGoal.goal.id] = new Date($scope.userGoal.do_date);
                                  angular.element('.goal' + $scope.userGoal.goal.id).addClass("active-idea");
                              } else {
                                  if($scope.userGoal.do_date){
                                      parentScope['change' + $scope.userGoal.goal.id] = 2;
                                      parentScope['doDate' + $scope.userGoal.goal.id] = new Date($scope.userGoal.do_date);
                                      angular.element('.goal' + $scope.userGoal.goal.id).addClass("active-idea");
                                  }else {
                                      //infinity
                                      parentScope['change' + $scope.userGoal.goal.id] = 1;
                                      angular.element('.goal' + $scope.userGoal.goal.id).removeClass("active-idea");
                                  }
                              }
                          } else {
                              //new datetime for completed
                              parentScope['change' + $scope.userGoal.goal.id] = 2;
                              angular.element('.goal' + $scope.userGoal.goal.id).removeClass("active-idea");
                              parentScope['doDate' + $scope.userGoal.goal.id] = new Date();
                          }
                      } else {
                          if (!isSuccess && dateChanged && $scope.userGoal.do_date) {
                              //change for doDate
                              parentScope['change' + $scope.userGoal.goal.id] = 2;
                              parentScope['doDate' + $scope.userGoal.goal.id] = new Date($scope.userGoal.do_date);
                              angular.element('.goal' + $scope.userGoal.goal.id).addClass("active-idea");
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
                  $window.location.href = $window.location.href;
              });
          };

          $timeout(function(){
              angular.element('#datepicker').datepicker({
                  beforeShowDay: function(){
                      var cond = angular.element('#datepicker').data('datepicker-disable');
                      return !cond;
                  },
                  todayHighlight: true
              });
              angular.element('#secondPicker').datepicker({
                  beforeShowDay: function(){
                      var cond = angular.element('#datepicker').data('datepicker-disable');
                      return !cond;
                  },
                  todayHighlight: true
              });

              angular.element("#secondPicker").find( "td" ).removeClass("active");

              angular.element("#datepicker").on("changeDate", function() {
                  angular.element("#secondPicker").find( "td" ).removeClass("active");
                  $scope.datepicker_title = true;
                  var doDate =  angular.element("#datepicker").datepicker('getDate');
                  $scope.userGoal.do_date = moment(doDate).format('MM-DD-YYYY');
                  dateChanged = true;
                  $scope.$apply();
              });
              angular.element("#secondPicker").on("changeDate", function() {
                  angular.element("#datepicker").find( "td" ).removeClass("active");
                  $scope.datepicker_title = true;
                  var doDate = angular.element("#secondPicker").datepicker('getDate');
                  dateChanged = true;
                  $scope.userGoal.do_date = moment(doDate).format('MM-DD-YYYY');
                  $scope.$apply();
              });

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

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
        var addUrl = envPrefix + "goal/add-modal";
        var doneUrl = envPrefix + "goal/done-modal";
        $http.get(addUrl).success(function(data) {
            template.addTemplate = data;
        });
        
        $http.get(doneUrl).success(function(data) {
            template.doneTemplate = data;
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
  .directive('lsUserGoalManage',['$compile',
      '$http',
      '$rootScope',
      'loginPopoverService',
      'template',
      'userGoalData',
      'UserGoalDataManager',
      '$timeout',
      'refreshingDate',
      'UserGoalConstant',
      function($compile, $http, $rootScope, loginPopoverService, template, userGoalData, UserGoalDataManager, $timeout, refreshingDate, UserGoalConstant){
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
                              UserGoalDataManager.getStory({id: scope.lsGoalId}, function (goal){
                                  if(goal){
                                      scope.runCallback(goal);
                                  }
                                  else {
                                      UserGoalDataManager.done({id: scope.lsGoalId}, function (){
                                          UserGoalDataManager.getStory({id: scope.lsGoalId}, function (goal) {
                                              scope.runCallback(goal);
                                          });
                                      })
                                  }
                              })
                          }
                          else {
                              UserGoalDataManager.done({id: scope.lsGoalId}, function (){
                                  UserGoalDataManager.getStory({id: scope.lsGoalId}, function (goal) {
                                      scope.runCallback(goal);
                                  });
                              }, function(res){
                                  if(res.status === 401){
                                      loginPopoverService.openLoginPopover();
                                  }
                              });
                          }
                      }
                  };
    
                  scope.runCallback = function(uGoal){
                      userGoalData.doneData = uGoal;
                      userGoalData.doneData.goal.videos_array = [];
                        //todo check goal or story video link is it
                      angular.forEach(userGoalData.doneData.goal.video_link, function(v){
                          userGoalData.doneData.goal.videos_array.push({link: v});
                      });
    
                      var tmp = $compile(template.doneTemplate)(scope);
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
  }]);

'use strict';

angular.module('manage', ['Interpolation',
    'Components',
    'LocalStorageModule',
    'angular-cache',
    'angulartics',
    'ngResource',
    'goalManage',
    'angulartics.google.analytics',
    'PathPrefix',
    'Authenticator',
    'angular-cache'
    ])
    .config(function(CacheFactoryProvider){
      angular.extend(CacheFactoryProvider.defaults, {
          maxAge: 24 * 60 * 60 * 1000, // Items added to this cache expire after 15 minutes.
          cacheFlushInterval: 60 * 60 * 1000, // This cache will clear itself every hour.
          deleteOnExpire: 'aggressive', // Items will be deleted from this cache right when they expire.
          storageMode: 'localStorage' // This cache will use `localStorage`.
      });
    })
    .run(['$http', 'envPrefix', 'template', 'UserContext', 'CacheFactory', function($http, envPrefix, template, UserContext, CacheFactory){
        var addUrl = envPrefix + "goal/add-modal";
        var doneUrl = envPrefix + "goal/done-modal";
        var commonUrl = envPrefix + "user/common";
        var goalUsersUrl = envPrefix + "goal/users";
        var id = UserContext.id;

        var templateCache = CacheFactory.get('bucketlist_templates');

        if(!templateCache){
            templateCache = CacheFactory('bucketlist_templates', {
                maxAge: 3 * 24 * 60 * 60 * 1000 ,// 3 day,
                deleteOnExpire: 'aggressive'
            });
        }

        if(id){
            var addTemplate = templateCache.get('add-template'+id);
            var doneTemplate = templateCache.get('done-template'+id);
            var commonTemplate = templateCache.get('common-template'+id);
            var goalUsersTemplate = templateCache.get('goal-users-template'+id);

            if (!addTemplate) {
                $http.get(addUrl).success(function(data){
                    template.addTemplate = data;
                    templateCache.put('add-template'+id, data);
                    })
            }else {
                template.addTemplate = addTemplate;
            }

            if (!doneTemplate) {
                $http.get(doneUrl).success(function(data){
                    template.doneTemplate = data;
                    templateCache.put('done-template'+id, data);
                })
            }else {
                template.doneTemplate = doneTemplate;
            }

            if (!commonTemplate) {
                $http.get(commonUrl).success(function(data){
                    template.commonTemplate = data;
                    templateCache.put('common-template'+id, data);
                })
            }else {
                template.commonTemplate = commonTemplate;
            }

            if (!goalUsersTemplate) {
                $http.get(goalUsersUrl).success(function(data){
                    template.goalUsersTemplate = data;
                    templateCache.put('goal-users-template'+id, data);
                })
            }else {
                template.goalUsersTemplate = goalUsersTemplate;
            }

        }
    }])
    .directive('lsGoalManage',['$compile',
        '$http',
        '$rootScope',
        'AuthenticatorLoginService',
        'template',
        'userGoalData',
        'UserGoalDataManager',
        '$timeout',
        'refreshingDate',
        function($compile, $http, $rootScope, AuthenticatorLoginService, template, userGoalData, UserGoalDataManager, $timeout, refreshingDate){
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
                                    AuthenticatorLoginService.openLoginPopup();
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
                                        AuthenticatorLoginService.openLoginPopup();
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

                        var sc = $rootScope.$new();
                        var tmp = $compile(template.addTemplate)(sc);
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
      'AuthenticatorLoginService',
      'template',
      'userGoalData',
      'UserGoalDataManager',
      '$timeout',
      'refreshingDate',
      function($compile, $http, $rootScope, AuthenticatorLoginService, template, userGoalData, UserGoalDataManager, $timeout, refreshingDate){
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
                          UserGoalDataManager.getStory({id: scope.lsGoalId}, function (uGoal){
                              userGoalData.manage = "done";
                              scope.runCallback(uGoal);
                          }, function(res){
                              if(res.status === 401){
                                  AuthenticatorLoginService.openLoginPopup();
                              }
                          });
                      }
                      else {
                          userGoalData.manage = "";
                          refreshingDate.goalId = scope.lsGoalId;
    
                          if(scope.lsUserId){
                              //for refresh cache event
                              refreshingDate.userId = scope.lsUserId;
                          }
                          
                          UserGoalDataManager.done({id: scope.lsGoalId}, function (){
                              UserGoalDataManager.getStory({id: scope.lsGoalId}, function (goal) {
                                  scope.runCallback(goal);
                              });
                          }, function(res){
                              if(res.status === 401){
                                  AuthenticatorLoginService.openLoginPopup();
                              }
                          });
                      }
                  };
    
                  scope.runCallback = function(uGoal){
                      userGoalData.doneData = uGoal;
                      userGoalData.doneData.videos_array = [];

                      if(uGoal.story && uGoal.story.video_link.length > 0){
                          angular.forEach(userGoalData.doneData.story.video_link, function(v){
                              userGoalData.doneData.videos_array.push({link: v});
                          });
                      }else {
                          userGoalData.doneData.videos_array.push({});
                      }

                      var sc = $rootScope.$new();
                      var tmp = $compile(template.doneTemplate)(sc);
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
  .directive('lsCommonManage',['$compile',
      '$http',
      '$rootScope',
      'AuthenticatorLoginService',
      'template',
      'userData',
      'UserGoalDataManager',
      function($compile, $http, $rootScope, AuthenticatorLoginService, template, userData, UserGoalDataManager){
          return {
              restrict: 'EA',
              scope: {
                  lsUser: '@'
              },
              link: function(scope, el){

                  el.bind('click', function(){
                      scope.run();
                  });

                  scope.run = function(){
                      $(".modal-loading").show();

                      UserGoalDataManager.common({id: scope.lsUser}, function (data){
                          userData.data = data.goals;
                          scope.runCallback();
                      }, function(res){
                          if(res.status === 401){
                              AuthenticatorLoginService.openLoginPopup();
                          }
                      });
                  };

                  scope.runCallback = function(){
                      var sc = $rootScope.$new();
                      var tmp = $compile(template.commonTemplate)(sc);
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
      }
  ])
  .directive('lsGoalUsers',['$compile',
    '$http',
    '$rootScope',
    'AuthenticatorLoginService',
    'template',
    'userData',
    'UserGoalDataManager',
    'UserContext',
    function($compile, $http, $rootScope, AuthenticatorLoginService, template, userData, UserGoalDataManager, UserContext){
        return {
            restrict: 'EA',
            scope: {
                lsGoalId: '@',
                lsCategory: '@'
            },
            link: function(scope, el){

                el.bind('click', function(){
                    scope.run();
                });

                scope.run = function(){
                    $(".modal-loading").show();

                    if(UserContext.id){
                        userData.isListed = scope.lsCategory?true: false;
                        userData.goalId = scope.lsGoalId;
                        scope.runCallback();
                    } else {
                        AuthenticatorLoginService.openLoginPopup();
                    }
                };

                scope.runCallback = function(){
                    var sc = $rootScope.$new();
                    var tmp = $compile(template.goalUsersTemplate)(sc);
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
    }
  ]);

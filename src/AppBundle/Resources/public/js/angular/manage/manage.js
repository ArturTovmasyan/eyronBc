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
    .run(['$http', 'envPrefix', 'template', 'UserContext', 'CacheFactory', '$rootScope', 'UserGoalDataManager',
        function($http, envPrefix, template, UserContext, CacheFactory, $rootScope, UserGoalDataManager){
        var addUrl = envPrefix + "goal/add-modal",
            doneUrl = envPrefix + "goal/done-modal",
            commonUrl = envPrefix + "user/common",
            goalUsersUrl = envPrefix + "goal/users",
            id = UserContext.id;

        var templateCache = CacheFactory.get('bucketlist_templates_v1');

        if(!templateCache){
            templateCache = CacheFactory('bucketlist_templates_v1', {
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
                            scope.closePrefix = false;
                            UserGoalDataManager.get({id: scope.lsGoalId}, function (uGoal){
                                scope.runCallback(uGoal);
                            }, function(res){
                                if(res.status === 401){
                                    AuthenticatorLoginService.openLoginPopup();
                                    $(".modal-loading").hide();
                                }
                            });
                        }
                        else {
                            scope.closePrefix = true;
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
                                        $(".modal-loading").hide();
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

                    $rootScope.$on('addGoal', function(){
                        scope.isSave = false;
                    });

                    $rootScope.$on('lsJqueryModalClosedSaveGoal', function(){
                        scope.isSave = true;
                    });

                    scope.openModal = function(tmp){

                        scope.isSave = false;
                        angular.element('body').append(tmp);
                        tmp.modal({
                            fadeDuration: 300
                        });

                        tmp.on($.modal.CLOSE, function(){
                            if(scope.closePrefix){
                                if(!scope.isSave){
                                    UserGoalDataManager.creates({id: scope.lsGoalId}, {is_visible: true}, function (resource){
                                        // userGoalData.data = resource;
                                    });
                                } else {
                                    scope.isSave = false;
                                }
                            }
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
                                  $(".modal-loading").hide();
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
                                  $(".modal-loading").hide();
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
                              $(".modal-loading").hide();
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
    '$timeout',
    function($compile, $http, $rootScope, AuthenticatorLoginService, template, userData, UserGoalDataManager, UserContext, $timeout){
        return {
            restrict: 'EA',
            scope: {
                lsGoalId: '@',
                lsCount: '@',
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
                        userData.usersCount = scope.lsCount;
                        scope.runCallback();
                    } else {
                        AuthenticatorLoginService.openLoginPopup();
                        $(".modal-loading").hide();
                    }
                };

                scope.runCallback = function(){
                    var sc = $rootScope.$new();
                    var tmp = $compile(template.goalUsersTemplate)(sc);
                    $timeout(function(){
                        $(".modal-loading").hide();
                        scope.openModal(tmp);
                    }, 500);
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
  .directive('videoLink', ['$sce', function($sce){
      return {
          restrict: 'EA',
          scope: {
              array: '=',
              key: '=',
              link: '=',
              limit: '='
          },
          templateUrl: '/bundles/app/htmls/videoLink.html',
          link: function(scope){

              scope.lm = scope.limit ? scope.limit : 3;

              scope.$watch('link',function(d){
                  if(angular.isUndefined(d)){
                      return;
                  }

                  if(d === ''){
                      scope.removeItem();
                  }
                  else {
                      if(!scope.array[scope.key + 1] && Object.keys(scope.array).length < scope.lm){
                          scope.array[scope.key + 1] = {};
                      }
                  }
              }, true);

              scope.removeItem = function(){
                  if(scope.array[scope.array.length - 1].link){
                      scope.array[scope.array.length] = {};
                  }

                  if(scope.key === 0){
                      if(scope.array.length > 1){
                          scope.array.splice(scope.key, 1);
                      }
                  }
                  else {
                      scope.array.splice(scope.key, 1);
                  }
              };

              scope.isVideoLink = function(url){
                  return !(!angular.isString(url) || url.indexOf("https:/") == -1);
              };

              scope.trustedUrl = function(url){
                  return $sce.trustAsResourceUrl(url);
              };
          }
      }
  }])
  .directive('step',[function(){
      return {
          restrict: 'EA',
          scope: {
              ngModel: '=',
              array: '=',
              key: '='
          },
          compile: function(){
              return function(scope){
                  scope.$watch('ngModel',function(d){
                      if(angular.isUndefined(d)){
                          return;
                      }

                      if(d === ''){
                          if(scope.key === 0){
                              if(scope.array.length > 1) {
                                  scope.array.splice(scope.key, 1);
                              }
                          }
                          else {
                              scope.array.splice(scope.key, 1);
                          }
                      }
                      else {
                          if(!scope.array[scope.key + 1]) {
                              scope.array[scope.key + 1] = {};
                          }
                      }
                  },true);
              }
          }
      }
  }]);
'use strict';

angular.module('manage', ['Interpolation',
        'Components',
        'LocalStorageModule',
        'angular-cache',
        'angulartics',
        'ngResource',
        'angulartics.google.analytics',
        'PathPrefix'
    ])
    .value('template', { addTemplate: ''})
    .value('userGoalData', { data: {}})
    .value('refreshingDate', { 
        userId: '',
        goalId: ''
    })
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
                            if(scope.lsGoalId && scope.lsUserId){
                                //for refresh cache event
                                refreshingDate.goalId = scope.lsGoalId;
                                refreshingDate.userId = scope.lsUserId;
                            }
                            
                            if(scope.lsInitialRun){
                                UserGoalDataManager.get({id: scope.lsGoalId}, function (uGoal){
                                    if(uGoal.id){
                                        scope.runCallback(uGoal);
                                    }
                                    else {
                                        UserGoalDataManager.add({id: scope.lsGoalId}, {}, function (uGoal){
                                            $timeout(function(){
                                                $rootScope.$broadcast('addGoal');
                                            },600);
                                            
                                            scope.runCallback(uGoal);
                                        }) 
                                    }
                                })
                            }
                            else {
                                UserGoalDataManager.add({id: scope.lsGoalId}, {}, function (uGoal){
                                    $timeout(function(){
                                        $rootScope.$broadcast('addGoal');
                                    },600);
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
        }]);

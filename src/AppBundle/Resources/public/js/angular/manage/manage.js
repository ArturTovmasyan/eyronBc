'use strict';

angular.module('manage', ['Interpolation',
    'Components',
    'LocalStorageModule',
    'angular-cache',
    'angulartics',
    'angulartics.google.analytics',
    'PathPrefix'
    ])
    .value('template', { addTemplate: ''})
    .value('userGoalData', { data: {}})
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
        function($compile, $http, $rootScope, loginPopoverService, template, userGoalData, UserGoalDataManager){
            return {
                restrict: 'EA',
                scope: {
                    lsGoalId: '@',
                    lsType: '@'
                },
                link: function(scope, el){

                    el.bind('click', function(){
                        scope.run();
                    });

                    // for non angular events
                    // el.on('openLsModal', function(event, dataId){
                    //     if(dataId === scope.lsIdentity){
                    //         scope.run();
                    //         scope.$apply();
                    //     }
                    // });

                    // for angular events
                    // scope.$on('openLsModal', function(event, dataId){
                    //     if(dataId === scope.lsIdentity){
                    //         scope.run();
                    //     }
                    // });

                    scope.run = function(){
                        if(scope.lsType == "manage"){
                            UserGoalDataManager.getGoal({id:id}, {}, function (resource){
                                userGoalData.data = resource;
                            });
                        }
                        else{
                            UserGoalDataManager.add({id:scope.lsGoalId}, {}, function (resource){
                                userGoalData.data = resource;
                            });
                            // $http.get(scope.lsTemplateUrl)
                            //     .success(function(res){
                            var tmp = $compile(template.addTemplate)(scope);
                                scope.openModal(tmp);
                            //     .error(function(res, status){
                            //         if(status === 401) {
                            //             loginPopoverService.openLoginPopover();
                            //         }
                            //     });
                            // 
                        }
                    };

                    scope.openModal = function(tmp){

                        angular.element('body').append(tmp);
                        tmp.modal({
                            fadeDuration: 300
                        });

                        // $rootScope.$broadcast('lsJqueryModalOpened' + scope.lsIdentity);
                        // el.trigger('lsJqueryModalOpened' + scope.lsIdentity);

                        tmp.on($.modal.CLOSE, function(){
                            tmp.remove();
                            // $rootScope.$broadcast('lsJqueryModalClosed' + scope.lsIdentity);
                            // el.trigger('lsJqueryModalClosed' + scope.lsIdentity);
                        })
                    }

                }
            }
        }]);

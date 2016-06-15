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

                    scope.run = function(){
                        if(scope.lsType == "manage"){
                            UserGoalDataManager.get({id: scope.lsGoalId}, function (resource){
                                userGoalData.data = resource;
                                var tmp = $compile(template.addTemplate)(scope);
                                scope.openModal(tmp);
                            });
                        }
                        else {
                            UserGoalDataManager.add({id: scope.lsGoalId}, {}, function (resource){
                                userGoalData.data = resource;
                                var tmp = $compile(template.addTemplate)(scope);
                                scope.openModal(tmp);
                            });
                        }
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

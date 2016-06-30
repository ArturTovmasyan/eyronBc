'use strict';

angular.module('Authenticator', ['PathPrefix'])
  .config(['$httpProvider', function($httpProvider){
    //$httpProvider.interceptors.push('AuthenticatorInterceptor');
  }])
  .run(['$rootScope', 'AuthenticatorLoginService', function($rootScope, AuthenticatorLoginService){
    console.log("run");

    $rootScope.$on('openLoginPopup', function(){
      AuthenticatorLoginService.openLoginPopup();
    });

  }])
  .service('AuthenticatorLoginService', [
    '$http',
    '$compile',
    '$rootScope',
    'envPrefix',
    '$httpParamSerializer',
    function(
      $http,
      $compile,
      $rootScope,
      envPrefix,
      $httpParamSerializer
    ){

    function openModal(tmp){
      var scope = $rootScope.$new();

      tmp = $compile(tmp)(scope);

      angular.element('body').append(tmp);
      tmp.modal({
        fadeDuration: 300
      });

      tmp.on($.modal.CLOSE, function(){
        tmp.remove();
      });
    }

    return {
      openLoginPopup: function(){
        $http.get('/app/scripts/Authenticator/login.html')
          .success(function(res){
            openModal(angular.element(res));
          });
      },
      login: function(data){
        return $http({
          method: 'POST',
          url: envPrefix + 'api/v1.0/users/logins',
          data: $httpParamSerializer(data),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
      }
    }
  }])
  .service('AuthenticatorInterceptor', ['$q', function($q){
    return {
      request: function(config){
        return config;
      },
      response: function(config){
        return config;
      },
      responseError: function(config){
        return $q.reject(config)
      }
    }
  }])
  .directive('authenticatorLoginTrigger',[
    'AuthenticatorLoginService',
    function(
      AuthenticatorLoginService
    ){
    return {
      restrict: 'EA',
      scope: {},
      link: function(scope, el){
        el.click(function(){
          AuthenticatorLoginService.openLoginPopup();
        });
      }
    }
  }])
  .controller('AuthenticatorLoginController', [
    '$scope',
    'AuthenticatorLoginService',
    'envPrefix',
    function(
      $scope,
      AuthenticatorLoginService,
      envPrefix
    ){

    $scope.envPrefix  = envPrefix;
    $scope.login_form = {};

    $scope.login = function(){
      AuthenticatorLoginService.login($scope.login_form)
        .success(function(){
          window.location.reload();
        });
    }
  }]);

























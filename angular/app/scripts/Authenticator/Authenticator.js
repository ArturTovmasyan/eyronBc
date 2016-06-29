'use strict';

angular.module('Authenticator', [])
  .config(['$httpProvider', function($httpProvider){
    $httpProvider.interceptors.push('AuthenticatorInterceptor');
  }])
  .run(['$rootScope', 'AuthenticatorLogin', '$timeout', function($rootScope, AuthenticatorLogin, $timeout){
    console.log("run");

    $timeout(function(){
      AuthenticatorLogin.login();
    }, 5000)
  }])
  .service('AuthenticatorLogin', ['$http', '$compile', function($http){
    function openModal(tmp){

      angular.element('body').append(tmp);
      tmp.modal({
        fadeDuration: 300
      });

      tmp.on($.modal.CLOSE, function(){
        tmp.remove();
      });
    }

    return {
      login: function(){
        $http.get('/app/scripts/Authenticator/login.html')
          .success(function(res){
            openModal(angular.element(res));
          });
      }
    }
  }])
  .service('AuthenticatorInterceptor', [function(){
    return {
      request: function(config){
        return config;
      },
      response: function(config){
        return config;
      },
      responseError: function(config){
        return config
      }
    }
  }]);
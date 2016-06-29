'use strict';

angular.module('Authenticator', [])
  .config(['$httpProvider', function($httpProvider){
    $httpProvider.interceptors.push('AuthenticatorInterceptor');
  }])
  .service('AuthenticatorLogin', ['$http', function($http){
    return {
      login: function(){
        
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
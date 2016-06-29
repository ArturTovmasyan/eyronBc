'use strict';

angular.module('Authenticator', ['PathPrefix'])
  .config(['$httpProvider', function($httpProvider){
    $httpProvider.interceptors.push('AuthenticatorInterceptor');
  }])
  .run(['$rootScope', 'AuthenticatorLogin', '$timeout', function($rootScope, AuthenticatorLogin, $timeout){
    console.log("run");

    $rootScope.$on('openLoginPopup', function(){
      AuthenticatorLogin.openLoginPopup();
    });

    $timeout(function(){
      AuthenticatorLogin.openLoginPopup();
    }, 5000)
  }])
  .service('AuthenticatorLogin', [
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
  }])
  .controller('AuthenticatorLoginController', ['$scope', 'AuthenticatorLogin', function($scope, AuthenticatorLogin){
    $scope.login_form = {};

    $scope.login = function(){
      AuthenticatorLogin.login($scope.login_form)
        .success(function(res){
          console.log(res, 'success login')
        });
    }
  }]);

























'use strict';

angular.module('goal', [])
    .controller('goalAdd',['$scope',function($scope){

        $('.purple input').iCheck({
            checkboxClass: 'iradio_square-grey',
            increaseArea: '20%'
        });
    }]);
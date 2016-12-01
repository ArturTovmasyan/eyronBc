'use strict';

angular.module('statistic',["chart.js"])
  .config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      chartColors: ['#FF5252', '#00CCCC'],
      responsive: false
    });
    // Configure all line charts
    ChartJsProvider.setOptions('line', {
      showLines: true
    });
  }])
  .controller("LineCtrl", ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
    var envPrefix = (window.location.pathname.indexOf('app_dev.php') === -1) ? "/" : "/app_dev.php/",
      path = envPrefix + 'api/v1.0/statistic/{type}/{groupBy}/{start}/{end}';
    $scope.groupType = 'month';
    $scope.dateTo = new Date();
    $scope.dateFrom = new Date(moment(new Date()).format('YYYY') + '-01-01');

    $scope.series = ['Read','Send'];

    $scope.onClick = function (points, evt) {
      // console.log(points, evt);
    };
    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
    $scope.options = {
      scales: {
        yAxes: [
          {
            id: 'y-axis-1',
            type: 'linear',
            display: true,
            position: 'left'
          },
          {
            id: 'y-axis-2',
            type: 'linear',
            display: true,
            position: 'right'
          }
        ]
      }
    };

    $scope.filter = function () {
      var timeTo = $scope.dateTo?moment($scope.dateTo).format('YYYY-MM-DD'):null,
          timeFrom = $scope.dateFrom?moment($scope.dateFrom).format('YYYY-MM-DD'):null;
      $scope.readCount = 0;
      $scope.sendCount = 0;
      if(timeTo && timeFrom && $scope.groupType){
        var url = path.replace('{type}', 'email').replace('{groupBy}', $scope.groupType).replace('{start}', timeFrom).replace('{end}', timeTo);
        $http.get(url).success(function(res) {
          $scope.labels = [];
          $scope.data = [[],[]];

          switch ($scope.groupType){
            case 'month':
              angular.forEach(res, function (d) {
                $scope.labels.push(moment(d.created).format('MMMM'));
                calculate(d);
              });
              break;
            case 'week':
              angular.forEach(res, function (d) {
                $scope.labels.push(new Date(d.created).toLocaleString('en-us', {  weekday: 'long' }));
                calculate(d);
              });
              break;
            case 'day':
              angular.forEach(res, function (d) {
                $scope.labels.push(moment(d.created).format('YYYY-MM-DD'));
                calculate(d);
              });
              break;
          }

          $scope.percent = $scope.sendCount?(100 * $scope.readCount/$scope.sendCount):0;

        })
      }
    };

    function calculate(d) {
      $scope.readCount += +d.read;
      $scope.sendCount += +d.send;
      $scope.data[0].push(d.read);
      $scope.data[1].push(d.send);
    }

    $scope.filter();
  }]);
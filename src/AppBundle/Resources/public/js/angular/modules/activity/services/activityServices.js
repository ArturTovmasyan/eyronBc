'use strict';

angular.module('activity')
  .service('ActivityDataManager', ['$resource', 'envPrefix',
    function($resource, envPrefix){
      return $resource( envPrefix + 'api/v2.0/activities/:first/:count/:userId/:param', {}, {
        activities: {method:'GET', isArray: true, transformResponse: function (object) {
          return angular.fromJson(object);
        }},
        singleActivity: {method:'GET', isArray: true, transformResponse: function (object) {
          return angular.fromJson(object);
        }}
      });
    }])
  .factory('lsActivities', ['$http', 'localStorageService', 'ActivityDataManager', '$analytics', 'UserContext',
    function($http, localStorageService, ActivityDataManager, $analytics, UserContext) {
    var lsActivities = function(loadCount, userId) {
      this.items = [];
      this.users = [];
      this.id = userId? userId: 0;
      this.noItem = false;
      this.busy = false;
      this.isReset = false;
      this.storage_name = 'activities_storage';
      this.request = 0;
      this.start = 0;
      this.reserve = [];
      this.count = loadCount ? loadCount : 7;
    };

    lsActivities.prototype.loadAddthis = function(){
      var olds = $('script[src="http://s7.addthis.com/js/300/addthis_widget.js#domready=1"]');
      olds.remove();

      var addthisScript = document.createElement('script');
      addthisScript.setAttribute('src', 'http://s7.addthis.com/js/300/addthis_widget.js#domready=1');
      return document.body.appendChild(addthisScript);
    };

    lsActivities.prototype.reset = function(){
      this.isReset = true;
      this.items = [];
      this.users = [];
      this.category = 'all';
      this.busy = false;
      this.reserve = [];
      this.request = 0;
      this.start = 0;
      this.id = 0;
      this.slug = 0;
      this.search = '';
    };

    lsActivities.prototype.imageLoad = function(profile) {
      var img;
      this.busy = false;
      angular.forEach(this.reserve, function(item) {
        if (!angular.isUndefined(item.goals) && item.goals[0].cached_image) {
          img = new Image();
          img.src = item.goals[0].cached_image;
        }
      });
    };

    lsActivities.prototype.newActivity = function(time, cb){
      ActivityDataManager.activities({ first: 0, count: this.count, time: time}, function (newData) {
        if(angular.isFunction(cb)){
          cb(newData);
        }
      });
    };

    lsActivities.prototype.addNewActivity = function(data, cb){
      var itemIds = [];

      // TODO needs to optimize
      angular.forEach(this.items, function (d) {
        itemIds.push(d.id);
      });

      var removingCount = 0,k;

      angular.element('#activities').addClass('comingByTop');

      // TODO needs to optimize
      for(var i = data.length - 1, j = 0; i >= 0; i--, j++){
        k = itemIds.indexOf(data[i].id);
        if(k !== -1){
          this.items.splice(k + j - removingCount, 1);
          removingCount++;
        }
        this.items.unshift(data[i]);
      }
      if(angular.isFunction(cb)){
        cb();
      }
      angular.element('#activities').removeClass('comingByTop');
    };

    lsActivities.prototype.getReserve = function() {
      this.busy = this.noItem;
      this.items = this.items.concat(this.reserve);
      this.nextReserve();
      if(angular.element('#activities').length > 0){
        $analytics.eventTrack('Activity load more', {  category: 'Activity', label: 'Load more from Web' });
      }
    };

    lsActivities.prototype.nextReserve = function() {

      if (this.busy) return;
      this.busy = true;

      var lastId = this.items[this.items.length - 1].id;
      var lastDate = this.items[this.items.length - 1].datetime;
      var first = lastId? 0 : this.start;
      
      if(this.id){
        ActivityDataManager.singleActivity({ first: first, count: this.count, userId: this.id, id: lastId, time: lastDate}, function (newData) {
          if(!newData.length){
            this.noItem = true;
          } else {
            this.reserve = newData;
            this.imageLoad();
            this.start += this.count;
            this.request++;
            this.busy = false;
          }
        }.bind(this));
      } else {
        ActivityDataManager.activities({ first: first, count: this.count, id: lastId, time: lastDate}, function (newData) {
          if(!newData.length){
            this.noItem = true;
          } else {
            this.reserve = newData;
            this.imageLoad();
            this.start += this.count;
            this.request++;
            this.busy = false;
          }
        }.bind(this));
      }
      
    };

    lsActivities.prototype.nextActivity = function() {
      if (this.busy) return;
      this.busy = true;

      this.noItem = false;
      
      if(this.request){
        this.getReserve();
      } else {
        if(this.id){
          ActivityDataManager.singleActivity({ first: this.start, count: this.count, userId: this.id}, function (newData) {
            if(!newData.length){
              this.noItem = true;
            } else {
              this.items = this.items.concat(newData);
              this.start += this.count;
              this.request++;
              this.busy = false;
              this.nextReserve();
            }
          }.bind(this));
        } else {
          if(UserContext.id && !this.isReset &&
            localStorageService.isSupported &&
            localStorageService.get(this.storage_name + UserContext.id))
          {
            var data = localStorageService.get(this.storage_name + UserContext.id);
            this.items = this.items.concat(data);

            // url = url.replace('{first}', 0).replace('{count}', this.count);
            ActivityDataManager.activities({first: 0, count: this.count}, function (newData) {
              if(newData.length){
                localStorageService.set(this.storage_name + UserContext.id, newData);
                if(data.length){
                  if(newData[0].datetime !== data[0].datetime ){
                    angular.element('#activities').addClass('comingByTop');

                    // TODO Change this
                    for(var i = this.count - 1; i >= 0; i--){
                      this.items.unshift(newData[i]);
                      this.items.pop();
                    }

                    this.reserve = [];
                  }
                } else {
                  this.items = this.items.concat(newData);
                }
              } else {
                if(!data.length){
                  this.noItem = true;
                }
              }

              this.start += this.count;
              this.request++;
              this.busy = data.length ? false : true;

              if(this.items.length){
                this.nextReserve();
              }
            }.bind(this));

          } else {
            ActivityDataManager.activities({first: this.start, count: this.count}, function (newData) {
              if (!newData.length) {
                this.noItem = true;
              } else {
                if (UserContext.id && localStorageService.isSupported) {
                  localStorageService.set(this.storage_name + UserContext.id, newData);
                }
                this.items = this.items.concat(newData);
                this.start += this.count;
                this.request++;
                this.busy = false;
                if(this.items.length){
                  this.nextReserve();
                }
              }
            }.bind(this));
          }
        }
      }
    };

    return lsActivities;
  }])
  .directive('lsActivities',['lsActivities',
    '$interval',
    '$timeout',
    function(lsActivities, $interval, $timeout){
      return {
        restrict: 'EA',
        scope: {
          lsUser: '@',
          lsCount: '@'
        },
        link: function(scope, el){
          scope.newActivity = false;

          scope.castInt = function(value){
            return parseInt(value);
          };

          function newActivity() {
            scope.Activities.newActivity(scope.Activities.items[0].datetime, function(data){
              if(data && data.length != 0){
                scope.newData = data;
                scope.newActivity = true;
                $interval.cancel(interval);
              }
            });
          }

          scope.loadImage = function (index) {
            var activeIndex = scope.Activities.items[index].activeIndex;
            if(!scope.Activities.items[index].reserveGoals[activeIndex] && scope.Activities.items[index].goals[activeIndex]){
              scope.Activities.items[index].reserveGoals.push(scope.Activities.items[index].goals[activeIndex]);
            }
          };

          $('body').on('click', '.ActivityPage', function() {
            if(scope.newActivity){
              scope.addNew();
            } else {
              $("html, body").animate({ scrollTop: 0 }, "slow");
            }
          });

          var interval = $interval(newActivity,120000);

          scope.addNew = function () {
            scope.newActivity = false;
            $("html, body").animate({ scrollTop: 0 }, "slow");
            $timeout(function(){
              scope.Activities.addNewActivity(scope.newData, slideInsert);
            }, 1000);
            interval = $interval(newActivity,120000);
          };

          function slideInsert(){
            $timeout(function(){
              var activity_swiper = new Swiper('div.activity-slider:not(.swiper-container-horizontal)', {
                observer: true,
                autoHeight: true,
                onSlideNextStart: function (ev) {
                  scope.Activities.items[$(ev.container).data('index')].activeIndex++;
                  scope.loadImage($(ev.container).data('index'));
                  scope.$apply();
                },
                onSlidePrevStart: function (ev) {
                  scope.Activities.items[$(ev.container).data('index')].activeIndex--;
                  scope.$apply();
                },

                // loop: true,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                spaceBetween: 30
              })
            }, 2000);
          }
          scope.Activities = new lsActivities(scope.lsCount? scope.lsCount: 7, scope.lsUser);
          scope.Activities.nextActivity();
          scope.showNoActivities = false;

          scope.$watch('Activities.items', function(d) {
            if(!d.length){
              if(scope.Activities.noItem ){
                scope.showNoActivities = true;
                angular.element('#non-activity').css('display', 'block');
              }
            } else {
              slideInsert();
            }
          });

        }
      }
    }
  ]);
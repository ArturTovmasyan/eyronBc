'use strict';

angular.module('profile')
  .factory('lsInfiniteGoals', ['$http', 'localStorageService', 'UserGoalDataManager', '$analytics', function($http, localStorageService, UserGoalDataManager, $analytics) {
    var lsInfiniteGoals = function(loadCount) {
      this.userGoals = [];
      this.users = [];
      this.id = 0;
      this.slug = 0;
      this.search = '';
      this.noItem = false;
      this.busy = false;
      this.request = 0;
      this.start = 0;
      this.reserve = [];
      this.count = loadCount ? loadCount : 10;
    };
  
    lsInfiniteGoals.prototype.loadAddthis = function(){
      var olds = $('script[src="http://s7.addthis.com/js/300/addthis_widget.js#domready=1"]');
      olds.remove();
  
      var addthisScript = document.createElement('script');
      addthisScript.setAttribute('src', 'http://s7.addthis.com/js/300/addthis_widget.js#domready=1');
      return document.body.appendChild(addthisScript);
    };
  
    lsInfiniteGoals.prototype.reset = function(){
      this.userGoals = [];
      this.users = [];
      this.busy = false;
      this.reserve = [];
      this.request = 0;
      this.start = 0;
      this.id = 0;
      this.slug = 0;
      this.search = '';
    };

    lsInfiniteGoals.prototype.imageLoad = function(profile) {
      var img;
      this.busy = false;
        angular.forEach(this.reserve, function(item) {
        if(profile && item.goal.image_path ){
          img = new Image();
          img.src = item.goal.image_path;
        } else if(item.image_path){
          img = new Image();
          img.src = item.image_path;
        }
      });
    };
  
    lsInfiniteGoals.prototype.getReserve = function(data) {
      this.busy = this.noItem;
      if(data){
        this.userGoals = this.userGoals.concat(this.reserve);
        this.nextReserve(data); 
      }else {
        this.users = this.users.concat(this.reserve);
        this.nextReserve();
      }
    };
  
    lsInfiniteGoals.prototype.nextReserve = function(data) {
  
      if (this.busy) return;
      this.busy = true;
      //when profile page
      if(data){
        UserGoalDataManager.profile({}, data, function (newData) {
          if(!newData.user_goals.length){
            this.noItem = true;
          } else {
            this.reserve = newData.user_goals;
            this.imageLoad(true);
            this.start += this.count;
            this.request++;
            this.busy = false;
          }
        }.bind(this));
      } else {//when goal users page
        if(this.id){
          UserGoalDataManager.friends({id: this.start, where: this.count, what: this.id, param: this.slug, search: this.search}, function (newData) {
            if(!newData.length){
              // this.noItem = true;
            } else {
              this.reserve = newData;
              this.imageLoad(false);
              this.start += this.count;
              this.request++;
              this.busy = false;
            }
          }.bind(this));
        } else {//when friends page
          UserGoalDataManager.friends({id: this.start, where: this.count, search: this.search}, function (newData) {
            if(!newData.length){
              // this.noItem = true;
            } else {
              this.reserve = newData;
              this.imageLoad(false);
              this.start += this.count;
              this.request++;
              this.busy = false;
            }
          }.bind(this));
        }
      }
    };
  
    lsInfiniteGoals.prototype.common = function(id) {
      UserGoalDataManager.common({id: id}, function (newData) {
        // if get empty
        if(!newData.goals.length){
          this.noItem = true;
        } else {
          this.userGoals = this.userGoals.concat(newData.goals);
        }
      }.bind(this));
    };

    lsInfiniteGoals.prototype.nextFriends = function(search, slug, id) {
      if (this.busy) return;
      this.busy = true;
      this.noItem = false;

      if(this.request){
        this.getReserve();
      } else {
        this.id = id;
        this.slug = slug;
        this.search = search;
        if(id){
          UserGoalDataManager.friends({id: this.start, where: this.count, what: id, param: slug, search: search}, function (newData) {
            // if get empty
            if(!newData.length){
              this.noItem = true;
            } else {
              this.busy = false;
              this.users = this.users.concat(newData);
              this.start += this.count;
              this.request++;
              this.nextReserve();
            }
          }.bind(this));
        } else {
          UserGoalDataManager.friends({id: this.start, where: this.count, search: search}, function (newData) {
            // if get empty
            if(!newData.length){
              this.noItem = true;
            } else {
              this.busy = false;
              this.users = this.users.concat(newData);
              this.start += this.count;
              this.request++;
              this.nextReserve();
            }
          }.bind(this));
        }
      }
    };
  
    lsInfiniteGoals.prototype.nextPage = function(data) {
      if (this.busy) return;
      this.busy = true;
  
      this.noItem = false;
  
      var post = {
        'first'       : this.start,
        'count'       : this.count,
        'condition'   : data.condition,
        'isDream'     : (data.isDream === 'true'),
        'userId'      : data.userId,
        'urgentImportant'       : (data.f_1 === 'true'),
        'urgentNotImportant'    : (data.f_2 === 'true'),
        'notUrgentImportant'    : (data.f_3 === 'true'),
        'notUrgentNotImportant' : (data.f_4 === 'true')
  
      };
  
      if(this.request){
        this.getReserve(post);
      } else {
        UserGoalDataManager.profile({}, post, function (newData) {
          // if get empty
          if(!newData.user_goals.length){
            this.noItem = true;
          } else {
            this.busy = false;
            this.userGoals = this.userGoals.concat(newData.user_goals);
            this.start += this.count;
            this.request++;
            post['first'] = this.start;
            post['count'] = this.count;
            this.nextReserve(post);
          }
        }.bind(this));
      }
    };
  
    return lsInfiniteGoals;
  }]);
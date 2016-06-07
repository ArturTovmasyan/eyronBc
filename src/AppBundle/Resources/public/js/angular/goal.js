'use strict';

angular.module('goal', ['Interpolation',
        'Google',
        'user',
        'mgcrea.ngStrap.popover',
        'ngAnimate',
        'ngSanitize',
        'infinite-scroll',
        'Confirm',
        'videosharing-embed',
        'Components',
        'LocalStorageModule',
        'angular-cache',
        'ngResource',
        'PathPrefix'
    ])
    .config(function (localStorageServiceProvider ) {

        localStorageServiceProvider
            .setPrefix('goal')
            .setNotify(false, false);
    })
    .config(function(CacheFactoryProvider){
        angular.extend(CacheFactoryProvider.defaults, {
            maxAge: 24 * 60 * 60 * 1000, // Items added to this cache expire after 15 minutes.
            cacheFlushInterval: 60 * 60 * 1000, // This cache will clear itself every hour.
            deleteOnExpire: 'aggressive', // Items will be deleted from this cache right when they expire.
            storageMode: 'localStorage' // This cache will use `localStorage`.
        });
    })
    .service('refreshCacheService', ['$timeout', 'CacheFactory', function($timeout, CacheFactory){
        function refreshCache(userId, goalId){
            var profileCache = CacheFactory.get('bucketlist');

            if(!profileCache){
                profileCache = CacheFactory('bucketlist');
            }
            var cache = profileCache.get('top-ideas' + userId);
            angular.forEach(cache, function(item) {
                if(item.id == goalId){
                    profileCache.remove('top-ideas' + userId);
                }
            });
        }
        return {
            refreshCache: refreshCache
        }
    }])
    .factory('lsInfiniteItems', ['$http', 'localStorageService', 'envPrefix', function($http, localStorageService, envPrefix) {
        var lsInfiniteItems = function(loadCount) {
            this.items = [];
            this.busy = false;
            this.noItem = false;
            //this.oldChache = false;
            this.isReset = false;
            this.request = 0;
            this.start = 0;
            this.reserve = [];
            this.count = loadCount ? loadCount : 7;
        };

        lsInfiniteItems.prototype.loadAddthis = function(){
            var olds = $('script[src="http://s7.addthis.com/js/300/addthis_widget.js#domready=1"]');
            olds.remove();

            var addthisScript = document.createElement('script');
            addthisScript.setAttribute('src', 'http://s7.addthis.com/js/300/addthis_widget.js#domready=1');
            return document.body.appendChild(addthisScript);
        };

        lsInfiniteItems.prototype.loadRandomItems = function(count){

        };

        lsInfiniteItems.prototype.reset = function(){
            this.isReset = true;
            this.items = [];
            this.reserve = [];
            this.busy = false;
            this.request = 0;
            this.start = 0;
            //this.oldChache = false;
        };

        lsInfiniteItems.prototype.getReserve = function(url, search, category) {
            angular.element('#activities').removeClass('comingByTop');
            this.items = this.items.concat(this.reserve);
            this.nextReserve(url, search, category);
            //setTimeout(function(){
            //    this.loadAddthis();
            //}.bind(this), 500);

        };
        lsInfiniteItems.prototype.nextReserve = function(url, search, category) {
            //if busy or in goal show page
            if (this.busy || (this.count == 3 && url == envPrefix + 'api/v1.0/goals/{first}/{count}')) {
                return;
            }
            if (!search) {
                search = "";
            }
            if (!category) {
                category = "";
            }
            this.busy = true;
            var lastId = this.items[this.items.length -1].id;
            var first = (url.indexOf('activities') != -1 && lastId)?0:this.start;
            url = url.replace('{first}', first).replace('{count}', this.count);
            url += '?search=' + search+ '&category=' + category;
            if(!first && lastId){
                url += '&id=' + lastId
            }
            $http.get(url).success(function(data) {
                this.reserve = data;
                this.busy = data.length ? false : true;
                angular.forEach(this.reserve, function(item) {
                    if(item.cached_image){
                        var img = new Image();
                        img.src = item.cached_image;
                    }else {
                        if(item.goal.cached_image){
                            var img = new Image();
                            img.src = item.goal.cached_image;
                        }
                    }
                });
                this.start += this.count;
                this.request++;
            }.bind(this));
        };

        lsInfiniteItems.prototype.nextPage = function(url, search, category, userId) {
            if (this.busy) {
                return;
            }
            if (!search) {
                search = "";
            }

            if (!category) {
                category = "";
            }

            this.busy = true;
            this.noItem = false;
            //this.oldChache = false;
            var reserveUrl = url;

            //if have userId and caching data by activities
            if(userId && !this.isReset && localStorageService.isSupported && localStorageService.get('active_data'+userId) && url == envPrefix + 'api/v1.0/activities/{first}/{count}' && !category && !search) {
                var data = localStorageService.get('active_data'+userId);
                this.items = this.items.concat(data);

                url = url.replace('{first}', 0).replace('{count}', this.count);
                $http.get(url).success(function(newData) {
                    localStorageService.set('active_data'+userId, newData);
                    if(newData[0].datetime !== data[0].datetime ){
                        angular.element('#activities').addClass('comingByTop');
                        for(var j = 1; j < this.count; j++){
                            if(newData[j].datetime !== data[0].datetime){
                                if(j == this.count -1){
                                    for(var i = j; i >= 0; i--) {
                                        this.items.unshift(newData[i]);
                                        this.items.pop();
                                    }
                                    break;
                                }else {
                                    continue;
                                }
                            }else {
                                for(var i = j-1; i >= 0; i--) {
                                    this.items.unshift(newData[i]);
                                    this.start++;
                                }
                                break;
                            }
                        }
                        this.reserve = [];
                        // this.busy = false;
                        // this.nextReserve(reserveUrl, search, category);

                    }
                }.bind(this));

                this.start += this.count;
                this.request++;
                this.busy = data.length ? false : true;
                this.nextReserve(reserveUrl, search, category);

                //setTimeout(function(){
                //    this.loadAddthis();
                //}.bind(this), 500);
            }else{
                var first = (url.indexOf('activities') != -1)?0:this.start;
                url = url.replace('{first}', first).replace('{count}', this.count);
                url += '?search=' + search + '&category=' + category;
                $http.get(url).success(function (data) {
                    if (userId && localStorageService.isSupported && url == envPrefix + 'api/v1.0/activities/0/'+this.count+'?search=&category=') {
                        localStorageService.set('active_data' + userId, data);
                    }
                    //if get empty
                    if(!data.length){
                        this.noItem = true;
                    }
                    this.items = this.items.concat(data);
                    this.busy = data.length ? false : true;
                    this.start += this.count;
                    this.request++;
                    this.nextReserve(reserveUrl, search, category);

                    if (!this.items.length) {
                        this.loadRandomItems(this.count);

                    }

                    //setTimeout(function () {
                    //    this.loadAddthis();
                    //}.bind(this), 500);
                }.bind(this));
            }
        };

        return lsInfiniteItems;
    }])
    .controller('goalAdd', ['$scope', '$sce', '$timeout', 'loginPopoverService', '$window', 'envPrefix', function($scope, $sce, $timeout, loginPopoverService, $window, envPrefix){

        $scope.files = [];
        $scope.disablePreview = false;

        $scope.openSignInPopover = function(){
            var middleScope = angular.element(".sign-in-popover").scope();
            var popoverScope = middleScope.$$childHead;

            if(!popoverScope.$isShown){
                popoverScope.$show();
                middleScope.joinToggle2 = !middleScope.joinToggle2;
            }
        };

        $timeout(function(){
            angular.element("#goal-done-form").ajaxForm({
                beforeSubmit: function(){
                    $scope.$apply();
                },
                success: function(res, text, header){
                    if(header.status === 200){
                        angular.element('#cancel').click();
                        $scope.$apply();

                    }
                }
            });
        },500);

        angular.element('input[type=checkbox]').iCheck({
            checkboxClass: 'icheckbox_square-purple',
            increaseArea: '20%'
        }).on('ifChanged', function (event) {
            $(event.target).trigger('change');
        });
        
        // file uploads

        Dropzone.options.goalDropzone = false;

        $scope.initDropzone = function(url){
            if(!url){
                return;
            }

            $timeout(function(){
                $scope.goalDropzone = new Dropzone('#goalDropzone', {
                    url: url,
                    addRemoveLinks: true,
                    uploadMultiple: false,
                    maxThumbnailFilesize: 6,
                    maxFiles: 6,
                    removedfile: function(d){
                        angular.element(d.previewElement).remove();
                        var id = JSON.parse(d.xhr.responseText);
                        var index = $scope.files.indexOf(id);
                        if(index !== -1){
                            $scope.files.splice(index, 1);
                        }

                        $scope.$apply();
                    },
                    complete: function(res){
                        if(res.xhr.status !== 200){
                            return;
                        }

                        $scope.files = $scope.files.concat(JSON.parse(res.xhr.responseText));
                        $scope.$apply();
                    }
                });

                $scope.goalDropzone.on('addedfile', function(){
                    $scope.disablePreview = true;
                    $scope.$apply();
                });

                $scope.goalDropzone.on('queuecomplete', function(){
                    $scope.disablePreview = false;
                    $scope.$apply();
                })
            },500);
        };

        // end file uploads

        $scope.trustedUrl = function(url){
            return $sce.trustAsResourceUrl(url);
        };

        // description Tagging

        $scope.$watch('description',function(d){
            if(!d){
                return;
            }

            var reg = /(#[a-z0-9][a-z0-9\-_]+)/ig;
            $scope.tags = d.match(reg);
        },true);

        // end description Tagging

        angular.element(".goal-create-submit").click(function(){
            angular.element("#goal-create-form").ajaxForm({
                beforeSubmit: function(){
                    $scope.loading = true;
                    $scope.$apply();
                },
                error: function(res, text, header){
                    if(res.status === 401) {
                        loginPopoverService.openLoginPopover();
                    }
                },
                success: function(res, text, header){
                    if(header.status === 200){
                        $scope.goalSubmitTemplate = res;
                        $scope.loading = false;
                        $scope.$apply();
                        $timeout(function(){
                            $scope.$broadcast('openLsModal', 'goalSave');
                        },10);
                    }
                }
            });

            if(!$scope.$$phase){
                $scope.$apply()
            }

        });

        angular.element(".goal-view-submit").click(function(){
            angular.element("#goal-create-form").ajaxFormUnbind();
        });

        $scope.$on('lsJqueryModalClosedgoalSave', function(){
            if(window.location.href.indexOf('goal/create') != -1 && window.location.href.indexOf('?id=') === -1){
                var goalId = angular.element('#goal-create-form').attr('data-goal-id');
                $window.location.href = window.location.href + '?id=' + goalId;
            }
            $scope.goalSubmitTemplate = '';
            $scope.$apply();
        })

    }])
    .controller('goalEnd', ['$scope', '$timeout', '$window',function($scope, $timeout, $window){

        $scope.stepsArray = [{}];
        $scope.openSignInPopover = function(){
            var middleScope = angular.element(".sign-in-popover").scope();
            var popoverScope = middleScope.$$childHead;

            if(!popoverScope.$isShown){
                popoverScope.$show();
                middleScope.joinToggle2 = !middleScope.joinToggle2;
            }
        };

        $scope.initSteps = function(json){
            $scope.stepsArray = json;
        };

        $scope.removeLocation = function(){
            angular.element(".location .location-hidden").val(null);
            angular.element(".location .location-hidden").attr('value',null);
            angular.element(".location .place-autocomplete").val('');
        };


        $timeout(function(){
            angular.element('#goal-create-form').attr('data-goal-id', $scope.goalId);
            angular.element("#goal-add-form").ajaxForm({
                beforeSubmit: function(){
                    $scope.$apply();
                },
                success: function(res, text, header){
                    if(header.status === 200){
                        angular.element('#cancel').click();
                        $scope.$apply();

                    }
                }
            });
            angular.element("#goal-add-for-create-form").ajaxForm({
                beforeSubmit: function(){
                    $scope.$apply();
                },
                success: function(res, text, header){
                    if(header.status === 200){
                        $window.location.href = $scope.redirectPath;
                        $scope.$apply();
                    }
                }
            });
            angular.element('#datepicker').datepicker({
                beforeShowDay: function(){
                    var cond = angular.element('#datepicker').data('datepicker-disable');
                    if(cond){
                        return false;
                    }
                    else {
                        return true;
                    }
                },
                todayHighlight: true
            });
            angular.element('#secondPicker').datepicker({
                beforeShowDay: function(){
                    var cond = angular.element('#datepicker').data('datepicker-disable');
                    if(cond){
                        return false;
                    }
                    else {
                        return true;
                    }
                },
                todayHighlight: true
            });

            angular.element("#secondPicker").find( "td" ).removeClass("active");

            angular.element("#datepicker").on("changeDate", function() {
                angular.element("#secondPicker").find( "td" ).removeClass("active");
                $scope.datepicker_title = true;
                angular.element(".hidden_date_value").val(
                    angular.element("#datepicker").datepicker('getFormattedDate')
                );

                $scope.$apply();
            });
            angular.element("#secondPicker").on("changeDate", function() {
                angular.element("#datepicker").find( "td" ).removeClass("active");
                $scope.datepicker_title = true;
                angular.element(".hidden_date_value").val(
                    angular.element("#secondPicker").datepicker('getFormattedDate')
                );

                $scope.$apply();
            });

            angular.element('input.important-radio').iCheck({
                radioClass: 'iradio_minimal-purple',
                increaseArea: '20%'
            }).on('ifChanged', function (event) {
                var target = angular.element(event.target);
                angular.element(".priority-radio").removeClass('active-important');
                target.parents().closest('.priority-radio').addClass('active-important');

                target.trigger('change');
            });

        }, 500);

    }])
    .controller('goalInner', ['$scope', '$filter', '$timeout', 'lsInfiniteItems', 'refreshCacheService', '$http', function($scope, $filter, $timeout, lsInfiniteItems, refreshCacheService, $http){

        $scope.successStoryShow = [];
        $scope.successStoryActiveIndex = null;
        $scope.Ideas = new lsInfiniteItems(3);
        $scope.refreshCache = function(userId, goalId){
            refreshCacheService.refreshCache(userId, goalId);
        };

        $scope.popoverByMobile = function(){
            $timeout(function(){
                angular.element('.navbar-toggle').click();
            }, 500);
        };

        $scope.addDone = function(path, id){
            $http.get(path)
                .success(function(res){
                    $scope.completed = false;
                    angular.element('#'+id).click();
                });
        };

        $scope.openSignInPopover = function(){
            var middleScope = angular.element(".sign-in-popover").scope();
            var popoverScope = middleScope.$$childHead;

            if(!popoverScope.$isShown){
                popoverScope.$show();
                middleScope.joinToggle2 = !middleScope.joinToggle2;
            }
        };

        $scope.showMoreSuccessStory = function(storiesLength){
            if($scope.successStoryActiveIndex === 0){
                return;
            }

            var startIndex = storiesLength - 2;

            if($scope.successStoryActiveIndex === null){
                $scope.successStoryActiveIndex = storiesLength - 2;
            }

            if($scope.successStoryActiveIndex > 4){
                startIndex = $scope.successStoryActiveIndex;
                $scope.successStoryActiveIndex -= 5;
            }
            else {
                startIndex = $scope.successStoryActiveIndex;
                $scope.successStoryActiveIndex = 0;
            }

            for(var i = startIndex - 1; i >= $scope.successStoryActiveIndex; i--){
                $scope.successStoryShow[i] = true;
            }

            $timeout(function(){
                $(".story-slider").trigger('showMoreStories');
            }, 50);
        };

        $scope.capitalizeFirstLetter = function (string) {
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        };

        $scope.dateToLocal = function(date){
            return $scope.capitalizeFirstLetter($filter('date')(new Date(date), "MMMM d 'at' hh:mm a"));
        };

        if(angular.element('.goal-information') && screen.width >= 992  && window.innerWidth >= 992) {
            angular.element('.goal-information').scrollToFixed({
                marginTop: 85,
                limit: function () {
                    var limit = angular.element('#random_goals').offset().top - angular.element('.goal-information').outerHeight(true) - 15;
                    return limit;
                },
                unfixed: function() {
                    var limit = angular.element('#random_goals').offset().top - angular.element('.goal-information').outerHeight(true) - 355;
                    angular.element('.goal-information').css('left', '0').css('top', limit);}
            });
        }

        if(angular.element('.suggest-input input')) {
            angular.element('.suggest-input input').iCheck({
                checkboxClass: 'icheckbox_square-purple',
                increaseArea: '20%'
            });
        }

        $( '.swipebox' ).swipebox();
    }])
    .controller('goalList', ['$scope', 'lsInfiniteItems', '$timeout', 'envPrefix', function($scope, lsInfiniteItems, $timeout, envPrefix){

        $scope.Ideas = new lsInfiniteItems();
        $scope.locations = [];
        $scope.ideasTitle = true;
        $scope.noIdeas = false;
        var locationsIds = [];

        $scope.castInt = function(value){
            return parseInt(value);
        };

        $scope.getParameterByName = function(name, href){
            name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
            var regexS = "[\\?&]"+name+"=([^&#]*)";
            var regex = new RegExp( regexS );
            var results = regex.exec( href );
            if(results == null){
                return "";
            }
            else {
                return decodeURIComponent(results[1].replace(/\+/g, " "));
            }
        };

        $scope.search = $scope.getParameterByName('search',window.location.href);

        $scope.doSearch = function(ev){
            if(ev.which === 13 && screen.width < 768) {
                angular.element('.icon-remove-email').click();
            }
            $scope.noIdeas = false;
            $scope.ideasTitle = false;
            angular.element('.idea-item').addClass('ideas-result');
            $scope.locations = [];
            locationsIds = [];
            if(ev.which == 13){
                ev.preventDefault();
                ev.stopPropagation();

                var ptName = window.location.pathname;
                window.history.pushState("", "", ptName + "?search=" + $scope.search);
                $scope.Ideas.reset();
                $scope.Ideas.nextPage(envPrefix + "api/v1.0/goals/{first}/{count}", $scope.search);
            }
        };

        $scope.$watch('Ideas.items', function(d) {
            if(!d.length){
                    if($scope.Ideas.noItem ){
                        $scope.noIdeas = true;
                        angular.element('.idea-item').removeClass('ideas-result');
                        $scope.Ideas.reset();
                        $scope.Ideas.nextPage(envPrefix + "api/v1.0/goals/{first}/{count}", '');
                    };
            }

            angular.forEach(d, function(item) {
                var location = {};
                if(item.location && locationsIds.indexOf(item.id) == -1){
                    location.id = item.id;
                    locationsIds.push(location.id);
                    location.latitude = item.location.latitude;
                    location.longitude = item.location.longitude;
                    location.title = item.title;
                    location.slug = item.slug;
                    $scope.locations.push(location);
                }
            });
        });

        $scope.adventureText = function(slug, cJson){
            var item = null;

            angular.forEach(cJson, function(v){
                if(v.slug === slug){
                   item = v;
                }
            });

            return item;
        }

    }])
    .controller('ActivityController', ['$scope', 'lsInfiniteItems', '$timeout', function($scope, lsInfiniteItems, $timeout){

        $scope.Activities = new lsInfiniteItems(10);
        $scope.showNoActivities = false;

        $scope.$watch('Activities.items', function(d) {
            if(!d.length){
                if($scope.Activities.noItem ){
                    $scope.showNoActivities = true;
                    angular.element('#non-activity').css('display', 'block');
                }
            }
        });

    }])
    .controller('goalFooter', ['$scope', '$http', 'refreshCacheService', '$timeout', function($scope, $http, refreshCacheService, $timeout){
        $scope.completed = true;

        $scope.refreshCache = function(userId, goalId){
            refreshCacheService.refreshCache(userId, goalId);
        };

        $scope.popoverByMobile = function(){
            $timeout(function(){
                angular.element('.navbar-toggle').click();
            }, 500);
        };

        $scope.addDone = function(path, id){
            $http.get(path)
                .success(function(res){
                    $scope.completed = false;
                    angular.element('#'+id).click();
                });
        };
    }])
    .controller('goalMyBucketList', ['$scope', '$http', '$compile', function($scope, $http, $compile){

        var mapModalTemplateUrl = '/bundles/app/htmls/mapModal.html';
        $scope.addDone = function(path, id){
            $http.get(path)
                .success(function(res){
                    $scope[id] = true;
                    angular.element('#'+id).click();
                });
        };

        $scope.onMarkerClick = function(goal){
            $http.get(mapModalTemplateUrl)
                .success(function(res){

                    var newSc = $scope.$new();
                    newSc.goal = goal;

                    var tmp = $compile(res)(newSc);
                    angular.element('body').append(tmp);
                    tmp.modal({
                        fadeDuration: 500
                    });
                    tmp.on($.modal.CLOSE, function(){
                        tmp.remove();
                    })
                });
        }

    }])
    .controller('goalFriends', ['$scope', '$http', 'CacheFactory', 'envPrefix', function($scope, $http, CacheFactory, envPrefix){
        var path = envPrefix + "api/v1.0/goal-friends";

        $scope.getGaolFriends = function(id){

            var profileCache = CacheFactory.get('bucketlist');

            if(!profileCache){
                profileCache = CacheFactory('bucketlist');
            }

            var goalFriends = profileCache.get('goal-friends'+id);

            if (!goalFriends) {

                $http.get(path)
                    .success(function(data){
                        $scope.goalFriends = data[1];
                        $scope.length = data['length'];
                        profileCache.put('goal-friends'+id, data);
                    });
            }else {
                $scope.goalFriends = goalFriends[1];
                $scope.length = goalFriends['length'];
            }
        };

        $scope.$watch('userId', function(id){
            $scope.getGaolFriends(id);
        })
    }])
    .controller('popularGoalsController', ['$scope', '$http', 'CacheFactory', 'envPrefix', function($scope, $http, CacheFactory, envPrefix){
        var path = envPrefix + "api/v1.0/top-ideas/{count}";

        var profileCache = CacheFactory.get('bucketlist');

        if(!profileCache){
            profileCache = CacheFactory('bucketlist');
        }

        $scope.getPopularGoals = function(id){
            path = path.replace('{count}', $scope.count);

            var topIdeas = profileCache.get('top-ideas'+id);

            if (!topIdeas) {

                $http.get(path)
                    .success(function(data){
                        $scope.popularGoals = data;
                        profileCache.put('top-ideas'+id, data);
                    });
            }else {
                $scope.popularGoals = topIdeas;
            }
        };

        $scope.$watch('userId', function(id){
            $scope.getPopularGoals(id);
        })
    }])
    .directive('delayAddClass',['$interval', function($interval){
        return {
            restrict: 'EA',
            scope: {
                delay: '=',
                className: '@'
            },
            link: function(scope, el){
                var dl = scope.delay ? scope.delay : 8000;
                var cl = scope.className ? scope.className: 'active';
                var items = el.children();
                var activeIndex = 0;

                if(items.length) {
                    angular.element(items[0]).addClass(cl);

                    if (items.length > 1) {
                        $interval(function () {
                            items.removeClass(cl);

                            if(activeIndex === items.length - 1){
                                activeIndex = 0;
                            }
                            else {
                                activeIndex++;
                            }

                            angular.element(items[activeIndex]).addClass(cl);

                        }, dl);
                    }
                }


            }
        }
    }])
    .directive('videos', ['$sce', function($sce){
        return {
            restrict: 'EA',
            scope: {
                array: '=',
                key: '=',
                link: '=',
                limit: '=',
                for: '@',
                formId: '@',
                formName: '@'
            },
            templateUrl: '/bundles/app/htmls/addVideo.html',
            link: function(scope){

                scope.lm = scope.limit ? scope.limit : 3;

                scope.$watch('link',function(d){
                    if(angular.isUndefined(d)){
                        return;
                    }

                    if(d === ''){
                        scope.removeItem();
                    }
                    else {
                        if(!scope.array[scope.key + 1] && Object.keys(scope.array).length < scope.lm){
                            scope.array[scope.key + 1] = {};
                        }
                    }
                },true);

                scope.removeItem = function(){
                    if(scope.array[scope.array.length-1].link){
                        scope.array[scope.array.length] = {};
                    }

                    if(scope.key === 0){
                        if(scope.array.length > 1){
                            scope.array.splice(scope.key, 1);
                        }
                    }
                    else {
                        scope.array.splice(scope.key, 1);
                    }
                }

                scope.isVideoLink = function(url){
                    if(!url || url.indexOf("https:/") == -1)return false;
                    return true;
                };
                scope.trustedUrl = function(url){
                    return $sce.trustAsResourceUrl(url);
                };
            }
        }
    }])
    .directive('step',[function(){
        return {
            restrict: 'EA',
            scope: {
                ngModel: '=',
                array: '=',
                key: '='
            },
            compile: function(){
                return function(scope){
                    scope.$watch('ngModel',function(d){
                        if(angular.isUndefined(d)){
                            return;
                        }

                        if(d === ''){
                            if(scope.key === 0){
                                if(scope.array.length > 1){
                                    scope.array.splice(scope.key, 1);
                                }
                            }
                            else {
                                scope.array.splice(scope.key, 1);
                            }
                        }
                        else {
                            if(!scope.array[scope.key + 1]){
                                scope.array[scope.key + 1] = {};
                            }
                        }
                    },true);
                }
            }
        }
    }]);

'use strict';

angular.module('goal', ['Interpolation',
        'Google',
        'user',
        'manage',
        'Authenticator',
        'goalComponents',
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
        'angulartics',
        'angulartics.google.analytics',
        'PathPrefix',
        'slickCarousel'
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
    .factory('lsInfiniteItems', ['$http', 'localStorageService', 'envPrefix', '$analytics', function($http, localStorageService, envPrefix, $analytics) {
        var lsInfiniteItems = function(loadCount) {
            this.items = [];
            this.busy = false;
            this.noItem = false;
            this.category = "";
            this.page = "";
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

        lsInfiniteItems.prototype.newActivity = function(time, cb){
            var url = envPrefix + 'api/v2.0/activities/0/10?time=' + time;
            $http.get(url).success(function(data) {
                if(angular.isFunction(cb)){
                    cb(data);
                }
            });
        };

        lsInfiniteItems.prototype.addNewActivity = function(data, cb){
            var itemIds = [];
            angular.forEach(this.items, function (d) {
                itemIds.push(d.id);
            });

            var removingCount = 0,k;

            angular.element('#activities').addClass('comingByTop');
            for(var i = data.length -1,j=0; i >= 0; i--,j++){
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

        lsInfiniteItems.prototype.getReserve = function(url, search, category) {
            angular.element('#activities').removeClass('comingByTop');
            this.items = this.items.concat(this.reserve);
            this.nextReserve(url, search, category);
            if(category){
                $analytics.eventTrack('Load more in select category', {  category: 'Goal', label: 'Load more in category ' + category + ' from Web' });
            }else {
                if(angular.element('#activities').length > 0){
                    $analytics.eventTrack('Activity load more', {  category: 'Activity', label: 'Load more from Web' });
                }
            }

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
                category = this.category;
            }else {
                this.category = category;
            }

            this.busy = true;
            this.page = (url.indexOf('activities') != -1)?'activity': 'list';
            var lastId = this.items[this.items.length -1].id;
            var lastDate = this.items[this.items.length -1].datetime;
            var first = (this.page == 'activity' && lastId)?0:this.start;
            url = url.replace('{first}', first).replace('{count}', this.count);
            url += '?search=' + search+ '&category=' + category;
            if(!first && lastId){
                url += '&id=' + lastId + '&time=' + lastDate;
            }
            $http.get(url).success(function(data) {
                this.reserve = data;
                this.busy = data.length ? false : true;
                var img;
                angular.forEach(this.reserve, function(item) {
                    if(item.cached_image){
                        img = new Image();
                        img.src = item.cached_image;
                    } else {
                        if (item.goals[0].cached_image) {
                            img = new Image();
                            img.src = item.goals[0].cached_image;
                        }
                    }
                });
                this.start += this.count;
                this.request++;
            }.bind(this));
        };

        lsInfiniteItems.prototype.nextPage = function(url, search, category, userId , notReserve) {
            if (this.busy) {
                return;
            }
            if (!search) {
                search = "";
            }

            if (!category) {
                category = this.category;
            }else {
                this.category = category;
            }

            this.busy = true;
            this.noItem = false;
            //this.oldChache = false;
            var reserveUrl = url;

            //if have userId and caching data by activities
            if(userId && !this.isReset && localStorageService.isSupported && localStorageService.get('active_cache'+userId) && url == envPrefix + 'api/v2.0/activities/{first}/{count}' && !category && !search) {
                var data = localStorageService.get('active_cache'+userId);
                this.items = this.items.concat(data);

                url = url.replace('{first}', 0).replace('{count}', this.count);
                $http.get(url).success(function(newData) {
                    localStorageService.set('active_cache'+userId, newData);
                    if(newData[0].datetime !== data[0].datetime ){
                        angular.element('#activities').addClass('comingByTop');
                        for(var i = this.count -1; i >= 0; i--){
                            this.items.unshift(newData[i]);
                            this.items.pop();
                        }
                        // for(var j = 1; j < this.count; j++){
                        //     if(newData[j].datetime !== data[0].datetime){
                        //         if(j == this.count -1){
                        //             for(var i = j; i >= 0; i--) {
                        //                 this.items.unshift(newData[i]);
                        //                 this.items.pop();
                        //             }
                        //             break;
                        //         } else {
                        //             continue;
                        //         }
                        //     }else {
                        //         for(var i = j-1; i >= 0; i--) {
                        //             this.items.unshift(newData[i]);
                        //             this.start++;
                        //         }
                        //         break;
                        //     }
                        // }
                        this.reserve = [];
                        // this.busy = false;
                        // this.nextReserve(reserveUrl, search, category);

                    }

                    this.start += this.count;
                    this.request++;
                    this.busy = data.length ? false : true;
                    if(!notReserve){
                        this.nextReserve(reserveUrl, search, category);
                    }

                }.bind(this));

                //setTimeout(function(){
                //    this.loadAddthis();
                //}.bind(this), 500);
            }else{
                var first = (url.indexOf('activities') != -1)?0:this.start;
                url = url.replace('{first}', first).replace('{count}', this.count);
                url += '?search=' + search + '&category=' + category;
                $http.get(url).success(function (data) {
                    if (userId && localStorageService.isSupported && url == envPrefix + 'api/v2.0/activities/0/'+this.count+'?search=&category=') {
                        localStorageService.set('active_cache' + userId, data);
                    }
                    //if get empty
                    if(!data.length){
                        this.noItem = true;
                    }
                    this.items = this.items.concat(data);
                    this.busy = data.length ? false : true;
                    this.start += this.count;
                    this.request++;
                    if(!notReserve){
                        this.nextReserve(reserveUrl, search, category);
                    }

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
    .controller('goalAdd', ['$scope', 
        '$sce',
        '$timeout',
        'AuthenticatorLoginService',
        '$window',
        'envPrefix',
        'UserGoalDataManager',
        'template',
        'userGoalData',
        '$analytics',
        'lsInfiniteItems',
        function($scope, $sce, $timeout, AuthenticatorLoginService, $window, envPrefix, UserGoalDataManager, template, userGoalData, $analytics, lsInfiniteItems){

        $scope.files = [];

        $scope.slickConfig = {
            slidesToShow: 3,
            slidesToScroll: 3,
            arrows: false,
            method: {},
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 1
                    }
                }
            ]
        };

        $scope.searchTimeoutPtr = null;
        $scope.disablePreview = false;
        $scope.isMore = false;
        $scope.Ideas = new lsInfiniteItems(9);

        $scope.haveIdeas = false;

        $scope.searchGoal = function(ev){
            $timeout.cancel($scope.searchTimeoutPtr);

            $scope.searchTimeoutPtr = $timeout(function(){
                $scope.Ideas.reset();
                $scope.Ideas.nextPage(envPrefix + "api/v1.0/goals/{first}/{count}", $scope.addTitle, null, null, true);
            }, 600);

        };

        $scope.$watch('Ideas.items', function(d) {
            if(d.length){
                $scope.isMore = d.length > 3;
                $scope.haveIdeas = $scope.addTitle? true: false;
            }else {
                $scope.isMore = false;
                $scope.haveIdeas = false;
            }
        });

        $scope.openSignInPopup = function(){
            AuthenticatorLoginService.openLoginPopup();
        };

        $timeout(function(){
            angular.element("#goal-done-form").ajaxForm({
                beforeSubmit: function(){
                    $scope.$apply();
                },
                success: function(res, text, header){
                    if(header.status === 200){
                        $analytics.eventTrack('Success story', {  category: 'Success story', label: 'Add success story from Web' });
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
        
        angular.element(".draft-save-submit").click(function(){
            angular.element("#goal-create-form").ajaxForm({
                beforeSubmit: function(){
                    $scope.$apply();
                },
                error: function(res){
                    if(res.status === 401) {
                        AuthenticatorLoginService.openLoginPopup();
                    }
                },
                success: function(res, text, header){
                    if(header.status === 200){
                        $window.location.href = $window.location.origin + envPrefix + 'goal/my-ideas/drafts';
                    }
                }
            });
        
            if(!$scope.$$phase){
                $scope.$apply()
            }
        
        });

        // end description Tagging

        angular.element(".goal-create-submit").click(function(){
            angular.element("#goal-create-form").ajaxForm({
                beforeSubmit: function(){
                    $scope.loading = true;
                    $scope.$apply();
                },
                error: function(res){
                    if(res.status === 401) {
                        AuthenticatorLoginService.openLoginPopup();
                    }
                },
                success: function(res, text, header){
                    if(header.status === 200){
                        UserGoalDataManager.creates({id:res}, {}, function (resource){
                            userGoalData.data = resource;
                            $scope.goalSubmitTemplate = template.addTemplate;
                            $scope.loading = false;
                            $timeout(function(){
                                $scope.$broadcast('openLsModal', 'goalSave');
                            },10);
                        });
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
                // var goalId = angular.element('#goal-create-form').attr('data-goal-id');
                $window.location.href = $scope.redirectPath;
            }
            $scope.goalSubmitTemplate = '';
        })

    }])
    .controller('goalInner', ['$scope', '$filter', '$timeout', 'lsInfiniteItems', 'AuthenticatorLoginService',
        function($scope, $filter, $timeout, lsInfiniteItems, AuthenticatorLoginService){

        $scope.successStoryShow = [];
        $scope.successStoryActiveIndex = null;
        $scope.Ideas = new lsInfiniteItems(3);

        $timeout(function(){
            if(window.location.hash && window.location.hash == "#/comments"){

                $('html, body').stop().animate( {
                    'scrollTop': $('#fos_comment_thread').offset().top-100
                }, 900);
            }
        }, 5000);


        var imageHeight;

        if(angular.element('.goal-image').length > 0 && angular.element('#main-slider').length > 0){
            var goalImageBottom = angular.element('.goal-image').offset().top + angular.element('.goal-image').outerHeight() ;
            var mainSliderBottom = angular.element('#main-slider').offset().top + angular.element('#main-slider').outerHeight();

            if(goalImageBottom != mainSliderBottom){
                var distance = goalImageBottom - mainSliderBottom;
                angular.element('#main-slider').css("height",angular.element('#main-slider').innerHeight()+distance)
            }
        }

        $('body').on('keydown', '#fos_comment_comment_body', function(ev) {
            if(ev.which === 13) {
                ev.preventDefault();
                ev.stopPropagation();
            }
        });

        var imageResize = function () {
            imageHeight = angular.element('#main-slider img').height();
            if( (window.innerWidth < 768 && imageHeight < 190) ||
              (window.innerWidth > 767 && window.innerWidth < 992 && imageHeight < 414) ||
              (window.innerWidth > 991 && imageHeight < 435)){
                angular.element('#main-slider img').addClass("full-height");
            } else {
                angular.element('#main-slider img').removeClass("full-height")
            }
        };

        imageResize();

        $(window).resize(function(){
            // if(window.innerWidth > 991 && window.innerWidth < 1200){
            //     angular.element('#main-slider img').addClass("full-height");
            // }else{
            //     angular.element('#main-slider img').removeClass("full-height")
            // }
            imageResize();

            if(angular.element('.goal-image').length > 0 && angular.element('#main-slider').length > 0) {
                goalImageBottom = angular.element('.goal-image').offset().top + angular.element('.goal-image').outerHeight();
                mainSliderBottom = angular.element('#main-slider').offset().top + angular.element('#main-slider').outerHeight();

                if (goalImageBottom != mainSliderBottom) {
                    var distance = goalImageBottom - mainSliderBottom;
                    angular.element('#main-slider').css("height", angular.element('#main-slider').innerHeight() + distance)
                }
            }
        });

        $scope.popoverByMobile = function(){
            $timeout(function(){
                angular.element('.navbar-toggle').click();
            }, 500);
        };

        $scope.openSignInPopup = function(){
            AuthenticatorLoginService.openLoginPopup();
        };

        $scope.showMoreSuccessStory = function(storiesLength){
            if($scope.successStoryActiveIndex === 0){
                return;
            }

            var startIndex = storiesLength - 2;

            if($scope.successStoryActiveIndex === null){
                $scope.successStoryActiveIndex = storiesLength - 2;
            }

            startIndex = $scope.successStoryActiveIndex;
            
            if($scope.successStoryActiveIndex > 4){
                $scope.successStoryActiveIndex -= 5;
                $scope.storyLength -= 5;
            }
            else {
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
                    return angular.element('#random_goals').offset().top - angular.element('.goal-information').outerHeight(true) - 15;
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
                }
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
    .controller('ActivityController', ['$scope', 'lsInfiniteItems', '$interval', '$timeout', function($scope, lsInfiniteItems, $interval, $timeout){
        $scope.newActivity = false;
        
        function newActivity() {
            $scope.Activities.newActivity($scope.Activities.items[0].datetime, function(data){
                if(data && data.length != 0){
                    $scope.newData = data;
                    $scope.newActivity = true;
                    $interval.cancel(interval);
                }
            });
        }

        var interval = $interval(newActivity,120000);

        $scope.addNew = function () {
            $scope.newActivity = false;
            $("html, body").animate({ scrollTop: 0 }, "slow");
            $timeout(function(){
                $scope.Activities.addNewActivity($scope.newData, slideInsert);
            }, 1000);
            interval = $interval(newActivity,120000);
        };
        function slideInsert(){
            $timeout(function(){
                var activity_swiper = new Swiper('.activity-slider', {
                    pagination: '.swiper-pagination',
                    observer: true,
                    autoHeight: true,
                    loop: true,
                    nextButton: '.swiper-button-next',
                    prevButton: '.swiper-button-prev',
                    spaceBetween: 30
                })
            }, 1000);
        }

        $scope.Activities = new lsInfiniteItems(10);
        $scope.showNoActivities = false;

        $scope.$watch('Activities.items', function(d) {
            if(!d.length){
                if($scope.Activities.noItem ){
                    $scope.showNoActivities = true;
                    angular.element('#non-activity').css('display', 'block');
                }
            }else {
                    slideInsert();
            }
        });

    }])
    .controller('goalFooter', ['$scope', '$http', 'refreshCacheService', '$timeout',
        function($scope, $http, refreshCacheService, $timeout){
        $scope.completed = true;

        $scope.popoverByMobile = function(){
            $timeout(function(){
                angular.element('.navbar-toggle').click();
            }, 500);
        };
    }])
    .controller('goalMyBucketList', ['$scope', '$http', '$compile', '$analytics', 'refreshingDate',
        function($scope, $http, $compile, $analytics, refreshingDate){
        $scope.isMobile =false;
        $scope.isMobile = window.innerWidth < 767? true : false;
        var mapModalTemplateUrl = '/bundles/app/htmls/mapModal.html';

        $scope.$on('doneGoal', function(){
            //changing date
            $scope['change' + refreshingDate.goalId] = 2;
            angular.element('.goal' + refreshingDate.goalId).removeClass("active-idea");
            $scope['doDate' + refreshingDate.goalId] = new Date();

            $scope['success'+refreshingDate.goalId] = true;
        });

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
                };

                scope.isVideoLink = function(url){
                    if(!url || url.indexOf("https:/") == -1) return false;
                    return true;
                };
                scope.trustedUrl = function(url){
                    return $sce.trustAsResourceUrl(url);
                };
            }
        }
    }])
    .directive('videoLink', ['$sce', function($sce){
      return {
          restrict: 'EA',
          scope: {
              array: '=',
              key: '=',
              link: '=',
              limit: '='
          },
          templateUrl: '/bundles/app/htmls/videoLink.html',
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
              }, true);

              scope.removeItem = function(){
                  if(scope.array[scope.array.length - 1].link){
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
              };

              scope.isVideoLink = function(url){
                  return !(!angular.isString(url) || url.indexOf("https:/") == -1);
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
                                if(scope.array.length > 1) {
                                    scope.array.splice(scope.key, 1);
                                }
                            }
                            else {
                                scope.array.splice(scope.key, 1);
                            }
                        }
                        else {
                            if(!scope.array[scope.key + 1]) {
                                scope.array[scope.key + 1] = {};
                            }
                        }
                    },true);
                }
            }
        }
    }]);

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
        'Components'
    ])
    .factory('lsInfiniteItems', ['$http', function($http) {
        var lsInfiniteItems = function(loadCount) {
            this.items = [];
            this.busy = false;
            this.request = 0;
            this.start = 0;
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
            this.items = [];
            this.busy = false;
            this.request = 0;
            this.start = 0;
        };

        lsInfiniteItems.prototype.nextPage = function(url, search, category) {
            if (this.busy) {
                return;
            }

            if (!category) {
                category = "";
            }

            this.busy = true;

            url = url.replace('{first}', this.start).replace('{count}', this.count);
            url += '?search=' + search+ '&category=' + category;
            $http.get(url).success(function(data) {
                this.items = this.items.concat(data);
                this.start += this.count;
                this.request++;
                this.busy = data.length ? false : true;

                if(!this.items.length){
                    this.loadRandomItems(this.count);
                }

                setTimeout(function(){
                    this.loadAddthis();
                }.bind(this), 500);
            }.bind(this));
        };

        return lsInfiniteItems;
    }])
    .controller('goalAdd', ['$scope', '$sce', '$timeout', 'loginPopoverService', function($scope, $sce, $timeout, loginPopoverService){

        $scope.files = [];
        $scope.disablePreview = false;

        $scope.openSignInPopover = function(){
            var middleScope = angular.element(".sign-in-popover").scope();
            var popoverScope = middleScope.$$childHead;

            if(!popoverScope.$isShown){
                popoverScope.$show();
                middleScope.joinToggle2 = !middleScope.joinToggle2;
            }
        }

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
            $scope.goalSubmitTemplate = '';
            $scope.$apply();
        })

    }])
    .controller('goalEnd', ['$scope', '$timeout', function($scope, $timeout){

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
        }


        $timeout(function(){
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
    .controller('goalInner', ['$scope', '$filter', '$timeout', function($scope, $filter, $timeout){

        $scope.successStoryShow = [];
        $scope.successStoryActiveIndex = null;

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

        if(angular.element('.goal-information') && screen.width >= 992) {
            angular.element('.goal-information').scrollToFixed({
                marginTop: 85,
                limit: function () {
                    var limit = angular.element('footer').offset().top - angular.element('.goal-information').outerHeight(true) - 30;
                    return limit;
                }
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
    .controller('goalList', ['$scope', 'lsInfiniteItems', '$timeout', function($scope, lsInfiniteItems, $timeout){

        $scope.Ideas = new lsInfiniteItems();
        $scope.locations = [];
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
            $scope.noIdeas = false;
            $scope.locations = [];
            locationsIds = [];
            if(ev.which == 13){
                ev.preventDefault();
                ev.stopPropagation();

                var ptName = window.location.pathname;
                window.history.pushState("", "", ptName + "?search=" + $scope.search);
                $scope.Ideas.reset();
                $scope.Ideas.nextPage("/api/v1.0/goals/{first}/{count}", $scope.search);
            }
        };

        $scope.$watch('Ideas.items', function(d) {
            if(!d.length){
                $timeout(function(){
                    if(!$scope.Ideas.items.length){
                        $scope.noIdeas = true;
                        $scope.Ideas.reset();
                        $scope.Ideas.nextPage("/api/v1.0/goals/{first}/{count}", '');
                    };
                }, 1500);
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
    .controller('activities', ['$scope', 'lsInfiniteItems', function($scope, lsInfiniteItems){

        $scope.Activities = new lsInfiniteItems(3);

    }])
    .controller('goalFooter', ['$scope', function($scope){}])
    .controller('goalMyBucketList', ['$scope', '$http', '$compile', function($scope, $http, $compile){

        var mapModalTemplateUrl = '/bundles/app/htmls/mapModal.html';

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

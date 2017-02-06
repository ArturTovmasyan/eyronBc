"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var project_service_1 = require('../project.service');
var InnerComponent = (function () {
    function InnerComponent(metadataService, router, _projectService, _cacheService, broadcaster, route) {
        this.metadataService = metadataService;
        this.router = router;
        this._projectService = _projectService;
        this._cacheService = _cacheService;
        this.broadcaster = broadcaster;
        this.route = route;
        this.slideHeight = 435;
        this.goal = null;
        this.serverPath = '';
        this.type = 'inner';
        this.imgPath = '';
        this.aphorismIndex = 0;
        this.delay = 8000;
        this.isDesktop = (screen.width >= 992 && window.innerWidth >= 992);
        this.shareTitle = "Sharing is caring";
        this.fbInner = "<img src='../../assets/images/facebook-share.svg'>";
        this.twitterInner = "<img src='../../assets/images/twitter-share.svg'>";
        this.pintInner = "<img src='../../assets/images/pinterest-share.svg'>";
        this.inInner = "<img src='../../assets/images/linkedin-share.svg'>";
        this.googleInner = "<img src='../../assets/images/google-plus-share.svg'>";
        this.config = {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            autoHeight: true,
            // loop: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            spaceBetween: 30,
            autoplay: 3000
        };
        this.videoConfig = {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            spaceBetween: 30,
            autoplay: 3000
        };
    }
    InnerComponent.prototype.onResize = function (event) {
        // event.target.innerWidth;
        this.imageResize();
    };
    InnerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.angularPath = this._projectService.getAngularPath();
        if (localStorage.getItem('apiKey')) {
            this.appUser = this._projectService.getMyUser();
            if (!this.appUser) {
                this.appUser = this._cacheService.get('user_');
                if (!this.appUser) {
                    this._projectService.getUser()
                        .subscribe(function (user) {
                        _this.appUser = user;
                        _this._cacheService.set('user_', user, { maxAge: 3 * 24 * 60 * 60 });
                    });
                }
            }
        }
        this.serverPath = this._projectService.getPath();
        this.imgPath = this.serverPath + '/bundles/app/images/cover2.jpg';
        this.route.params.forEach(function (params) {
            _this.goal = null;
            var goalSlug = params['slug'];
            _this.seeAlsoShow = false;
            if (params['page']) {
                _this.type = params['page'];
            }
            // load data
            _this.getProject(goalSlug);
        });
    };
    /**
     *
     * @param slug
     */
    InnerComponent.prototype.getProject = function (slug) {
        var _this = this;
        this._projectService.getGoal(slug)
            .subscribe(function (data) {
            _this.seeAlsoShow = true;
            _this.goal = data.goal;
            _this.config.loop = (_this.goal && _this.goal.images && _this.goal.images.length > 1);
            _this.aphorisms = data.aphorisms;
            _this.listedByUsers = Object.keys(data.listedByUsers).map(function (key) {
                return data.listedByUsers[key];
            });
            _this.doneByUsers = Object.keys(data.doneByUsers).map(function (key) {
                return data.doneByUsers[key];
            });
            if (_this.goal) {
                _this.metadataService.setTitle(_this.goal.title);
                _this.metadataService.setTag('og:image', _this.goal.cached_image);
                _this.metadataService.setTag('description', _this.goal.description);
                _this.metadataService.setTag('og:description', _this.goal.description);
                _this.metadataService.setTag('og:title', _this.goal.title);
                // var allMetaElements = document.getElementsByTagName('meta');
                // for (var i=0; i<allMetaElements.length; i++) {
                //   if (allMetaElements[i].getAttribute("name") == "og:title" || allMetaElements[i].getAttribute("name") == "title") {
                //     allMetaElements[i].setAttribute('content', this.goal.title);
                //   }
                //   if (allMetaElements[i].getAttribute("name") == "og:description" || allMetaElements[i].getAttribute("name") == "description") {
                //     allMetaElements[i].setAttribute('content', this.goal.description);
                //   }
                //   if (allMetaElements[i].getAttribute("name") == "og:image") {
                //     allMetaElements[i].setAttribute('content', this.goal.cached_image);
                //   }
                // }
                _this.linkToShare = _this.angularPath + '/goal/' + _this.goal.slug;
                setTimeout(function () {
                    //twitter
                    var js, fjs = document.getElementsByTagName('script')[0], p = (location.protocol.indexOf('https') == -1 ? 'http' : 'https');
                    if (!document.getElementById('twitter-wjs')) {
                        js = document.createElement('script');
                        js.id = 'twitter-wjs';
                        js.src = p + '://platform.twitter.com/widgets.js';
                        fjs.parentNode.insertBefore(js, fjs);
                    }
                    //facebbok
                    (function (d, s, id) {
                        var js, fjs = d.getElementsByTagName(s)[0];
                        if (d.getElementById(id)) {
                            return;
                        }
                        js = d.createElement(s);
                        js.id = id;
                        js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&appId=571257946411819&version=v2.0";
                        fjs.parentNode.insertBefore(js, fjs);
                    }(document, 'script', 'facebook-jssdk'));
                }, 2000);
                _this.stories = _this.goal.success_stories;
                if (_this.goal.is_my_goal == 1 || _this.goal.is_my_goal == 2) {
                    _this._projectService.getUserGoal(_this.goal.id)
                        .subscribe(function (data) {
                        _this.userGoal = data;
                    });
                }
            }
            if (_this.aphorisms.length > 1) {
                setInterval(function () {
                    if (_this.aphorismIndex === _this.aphorisms.length - 1) {
                        _this.aphorismIndex = 0;
                    }
                    else {
                        _this.aphorismIndex++;
                    }
                }, _this.delay);
            }
            _this.imageResize();
        }, function (error) { return _this.errorMessage = error; });
    };
    InnerComponent.prototype.imageResize = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.tickerView) {
                _this.quoteHeight = _this.tickerView.nativeElement.children[0].offsetHeight + 35;
            }
            if (_this.sliderImage) {
                var imageHeight = _this.sliderImage.nativeElement.offsetHeight;
                _this.fullHeight = ((window.innerWidth < 768 && imageHeight < 190) ||
                    (window.innerWidth > 767 && window.innerWidth < 992 && imageHeight < 414) ||
                    (window.innerWidth > 991 && imageHeight < 435));
            }
            if (_this.goalImage && _this.mainSlider) {
                var slider = _this.mainSlider.elementRef ? _this.mainSlider.elementRef : _this.mainSlider;
                // let goalImageBottom = this.goalImage.nativeElement.offsetTop + this.goalImage.nativeElement.offsetHeight ;
                // let mainSliderBottom = slider.nativeElement.offsetTop + slider.nativeElement.offsetHeight;
                _this.goalImageHeight = (_this.quoteHeight ? _this.quoteHeight : _this.container.nativeElement.children[0].offsetHeight)
                    + _this.container.nativeElement.children[1].offsetHeight + slider.nativeElement.offsetHeight;
            }
        }, 1000);
    };
    ;
    InnerComponent.prototype.isLate = function (date) {
        if (!date) {
            return false;
        }
        var d1 = new Date(date);
        var d2 = new Date();
        return (d1 < d2);
    };
    InnerComponent.prototype.manageGoal = function () {
        var _this = this;
        if (this.userGoal) {
            var oldStatus_1 = this.goal.is_my_goal;
            this.broadcaster.broadcast('addModal', {
                'userGoal': this.userGoal,
                'newAdded': false,
                'newCreated': false
            });
            this.broadcaster.on('saveUserGoal_' + this.userGoal.id)
                .subscribe(function (data) {
                _this.userGoal = data;
                _this.goal.is_my_goal = data.status;
                switch (oldStatus_1) {
                    case 1:
                        if (data.status == 2) {
                            _this.goal.stats.listedBy--;
                            _this.goal.stats.doneBy++;
                        }
                        break;
                    case 2:
                        if (data.status == 1) {
                            _this.goal.stats.listedBy++;
                            _this.goal.stats.doneBy--;
                        }
                        break;
                }
            });
            this.broadcaster.on('removeUserGoal_' + this.userGoal.id)
                .subscribe(function (data) {
                switch (oldStatus_1) {
                    case 1:
                        _this.goal.stats.listedBy--;
                        break;
                    case 2:
                        _this.goal.stats.doneBy--;
                        break;
                }
                _this.userGoal = null;
                _this.goal.is_my_goal = 0;
            });
        }
    };
    InnerComponent.prototype.add = function (id) {
        var _this = this;
        var key = localStorage.getItem('apiKey');
        if (!key) {
            this.broadcaster.broadcast('openLogin', 'some message');
        }
        else {
            this._projectService.addUserGoal(id, {}).subscribe(function (data) {
                _this.broadcaster.broadcast('addModal', {
                    'userGoal': data,
                    'newAdded': true,
                    'newCreated': false
                });
                _this.broadcaster.on('addGoal' + _this.goal.id)
                    .subscribe(function () {
                    _this.userGoal = data;
                    _this.goal.is_my_goal = 1;
                    _this.goal.stats.listedBy++;
                });
                _this.broadcaster.on('saveUserGoal_' + data.id)
                    .subscribe(function (data) {
                    _this.userGoal = data;
                    _this.goal.is_my_goal = data.status;
                    if (data.status == 2) {
                        _this.goal.stats.doneBy++;
                    }
                    else {
                        _this.goal.stats.listedBy++;
                    }
                });
            });
        }
        this.goal.is_my_goal = 1;
    };
    InnerComponent.prototype.completeGoal = function (id, isManage) {
        var _this = this;
        var oldStatus = this.goal.is_my_goal;
        this.goal.is_my_goal = 2;
        if (isManage) {
            this._projectService.getStory(id).subscribe(function (data) {
                _this.broadcaster.broadcast('doneModal', {
                    'userGoal': data,
                    'newAdded': false
                });
                if (!_this.userGoal) {
                    _this._projectService.getUserGoal(_this.goal.id)
                        .subscribe(function (data) {
                        _this.userGoal = data;
                    });
                }
            });
        }
        else {
            switch (oldStatus) {
                case 1:
                    this.goal.stats.doneBy++;
                    this.goal.stats.listedBy--;
                    break;
                case 0:
                    this.goal.stats.doneBy++;
                    break;
            }
            this._projectService.setDoneUserGoal(id).subscribe(function () {
                _this._projectService.getStory(id).subscribe(function (data) {
                    _this.broadcaster.broadcast('doneModal', {
                        'userGoal': data,
                        'newAdded': true
                    });
                    _this.broadcaster.on('doneGoal' + _this.goal.id)
                        .subscribe(function () {
                        _this._projectService.getUserGoal(_this.goal.id)
                            .subscribe(function (data) {
                            _this.userGoal = data;
                        });
                    });
                });
            });
        }
    };
    InnerComponent.prototype.save = function (id) {
        var _this = this;
        this._projectService.addUserGoal(id, {}).subscribe(function (data) {
            _this.broadcaster.broadcast('addModal', {
                'userGoal': data,
                'newAdded': true,
                'newCreated': true
            });
            _this.broadcaster.on('saveUserGoal_' + data.id)
                .subscribe(function (data) {
                var messages = _this._cacheService.get('flash_massage');
                messages = messages ? messages : [];
                messages.push((!_this.goal.status) ? 'goal.was_created.private' : 'goal.was_created.public');
                _this._cacheService.set('flash_massage', messages, { maxAge: 3 * 24 * 60 * 60 });
                _this.router.navigate(['/profile/my/all']);
            });
            _this.broadcaster.on('addGoal' + id)
                .subscribe(function (data) {
                var messages = _this._cacheService.get('flash_massage');
                messages = messages ? messages : [];
                messages.push((!_this.goal.status) ? 'goal.was_created.private' : 'goal.was_created.public');
                _this._cacheService.set('flash_massage', messages, { maxAge: 3 * 24 * 60 * 60 });
                _this.router.navigate(['/profile/my/all']);
            });
        });
    };
    InnerComponent.prototype.openUsersModal = function (id, count, category) {
        if (!localStorage.getItem('apiKey') || !this.appUser) {
            this.broadcaster.broadcast('openLogin', 'some message');
        }
        else {
            if (!count)
                return;
            this.broadcaster.broadcast('usersModal', { itemId: id, count: count, category: category });
        }
    };
    __decorate([
        core_1.ViewChild('ticker')
    ], InnerComponent.prototype, "tickerView", void 0);
    __decorate([
        core_1.ViewChild('goalImage')
    ], InnerComponent.prototype, "goalImage", void 0);
    __decorate([
        core_1.ViewChild('container')
    ], InnerComponent.prototype, "container", void 0);
    __decorate([
        core_1.ViewChild('mainSlider')
    ], InnerComponent.prototype, "mainSlider", void 0);
    __decorate([
        core_1.ViewChild('sliderImage')
    ], InnerComponent.prototype, "sliderImage", void 0);
    __decorate([
        core_1.HostListener('window:resize', ['$event'])
    ], InnerComponent.prototype, "onResize", null);
    InnerComponent = __decorate([
        core_1.Component({
            selector: 'app-inner',
            templateUrl: './inner.component.html',
            styleUrls: ['./inner.component.less', '../goal-create/goal-create.component.less'],
            providers: [project_service_1.ProjectService],
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], InnerComponent);
    return InnerComponent;
}());
exports.InnerComponent = InnerComponent;

angular.module('Google', [])
    .directive('simpleMapMarker',['$timeout', '$window', '$rootScope', function($timeout, $window, $rootScope){

        function Initialize(el, zoom){
            var m, data = {};
            data.center = new google.maps.LatLng(40.177037, 44.514841);
            data.zoom = zoom ? zoom : 10;
            data.scrollwheel = false;
            data.mapTypeId = google.maps.MapTypeId.ROADMAP;
            m = new google.maps.Map(el,data);

            return m;
        }

        return {
            restrict: 'EA',
            scope: {
                zoom: '=',
                markers: '=',
                refresh: '=',
                isBounded: '=',
                onMarkerClick: '&',
                passiveMarkerIcon: '@',
                activeGoalMarkerIcon1: '@',
                activeGoalMarkerIcon2: '@',
                itemPageUrl: '@',
                activeMarkerIcon: '@'
            },
            compile: function compile(){

                function addMarker(obj, icon, map){
                    if(!angular.isNumber(obj.latitude) || !angular.isNumber(obj.longitude)){
                        return;
                    }

                    var m = new google.maps.Marker({
                        position: new google.maps.LatLng(obj.latitude, obj.longitude),
                        map: map
                    });

                    if(icon){
                        var ic = {
                            url: icon,
                            scaledSize:new google.maps.Size(25, 40)
                        };
                        m.setIcon(ic);
                    }

                    map.setCenter(m.getPosition());

                    return m;
                }

                return function(scope, el){
                    scope.map = Initialize(el[0], scope.zoom);
                    scope.mapMarkers = {};

                    scope.$watch('refresh', function(){
                        $timeout(function(){
                            google.maps.event.trigger(scope.map, 'resize');
                            if(scope.isBounded) {
                                scope.map.fitBounds(scope.bounds);
                            }
                        },500);
                    }, true);

                    scope.$on('addGoal', function(ev, data){
                        if(scope.mapMarkers[data] && scope.mapMarkers[data].map){
                            var icon = {
                                url: scope.activeGoalMarkerIcon1,
                                scaledSize:new google.maps.Size(35, 50)
                            };
                            scope.mapMarkers[data].setIcon(icon);
                        }
                    });

                    $rootScope.$on('lsJqueryModalClosedSaveGoal', function (ev, userGoal) {
                        if(!userGoal || !userGoal.status || !scope.mapMarkers[userGoal.goal.id] || !scope.mapMarkers[userGoal.goal.id].map)
                            return;

                        var icon = {
                            url: scope['activeGoalMarkerIcon'+userGoal.status],
                            scaledSize:new google.maps.Size(35, 50)
                        };
                        scope.mapMarkers[userGoal.goal.id].setIcon(icon);
                    });

                    scope.$on('doneGoal', function(ev, data){
                        if(scope.mapMarkers[data] && scope.mapMarkers[data].map){
                            var icon = {
                                url: scope.activeGoalMarkerIcon2,
                                scaledSize:new google.maps.Size(35, 50)
                            };
                            scope.mapMarkers[data].setIcon(icon);
                        }
                    });

                    scope.$watch('markers',function(d){
                        if(!d){
                            return;
                        }

                        if(scope.isBounded) {
                            scope.bounds = new google.maps.LatLngBounds(null);
                        }

                        angular.forEach(scope.mapMarkers, function(v, k){
                            v.setMap(null);
                        });
                        angular.forEach(d, function(v, k){
                            if(v.latitude && v.longitude) {
                                v.id = v.id ? v.id : k;
                                if(!scope.mapMarkers[v.id] || !scope.mapMarkers[v.id].map ) {
                                    var m = addMarker(v, scope.passiveMarkerIcon, scope.map);

                                    scope.mapMarkers[v.id] = m;

                                    if(v.status == 1 || v.status == 2){
                                        var icon = {
                                            url: scope['activeGoalMarkerIcon' + v.status],
                                            scaledSize:new google.maps.Size(35, 50)
                                        };
                                        scope.mapMarkers[v.id].setIcon(icon);
                                    }

                                    var infowindow = new google.maps.InfoWindow({
                                        content: v.title
                                    });

                                    m.addListener('mouseover', function() {
                                        infowindow.open(scope.map, m);
                                    });

                                    m.addListener('mouseout', function() {
                                        infowindow.close();
                                    });

                                    m.addListener('click', function () {
                                        if(scope.itemPageUrl && v.slug){
                                            $window.location.href = scope.itemPageUrl+ v.slug;
                                        }

                                    });

                                    //m.addListener('click', function () {
                                    //    scope.setMarkerActive(m);
                                    //    scope.onMarkerClick({goal: v});
                                    //    scope.$apply();
                                    //});

                                }

                                if(scope.isBounded) {
                                    scope.bounds.extend(scope.mapMarkers[v.id].getPosition());
                                }
                            }
                        });

                        if(scope.isBounded) {
                            scope.map.fitBounds(scope.bounds);
                        }
                    },true);

                    scope.setMarkerActive = function(m){

                        angular.forEach(scope.mapMarkers, function(v){
                            if(scope.passiveMarkerIcon){
                                var pasive = {
                                    url: scope.passiveMarkerIcon,
                                    scaledSize:new google.maps.Size(25, 40)
                                };
                                v.setIcon(pasive);
                            }
                            else {
                                v.setIcon(null);
                            }
                        });

                        if(scope.activeMarkerIcon){
                            var active = {
                                url:scope.passiveMarkerIcon,
                                scaledSize:new google.maps.Size(25, 40)
                            };

                            m.setIcon(active);
                        }
                    }
                };
            }
        };
    }])
    .directive('googlePlacesAutocomplete',[function(){
        return {
            restrict: 'EA',
            scope: {
                types: '=',
                hiddenStorage: '@'
            },
            compile: function(){
                return function(scope, el){

                    el.on('keydown', function(ev){
                        if(ev.which == 13){
                            ev.stopPropagation();
                            ev.preventDefault();
                            return false;
                        }
                    });

                    var options = {};

                    if(scope.types){
                        options.types =  scope.types;
                    }

                    var autocomplete = new google.maps.places.Autocomplete(el[0], options);
                    google.maps.event.addListener(autocomplete, 'place_changed', function(){
                        var result = autocomplete.getPlace();

                        if(!result.geometry ||
                            !result.geometry.location ||
                            !result.formatted_address){
                            return;
                        }

                        var place = {};
                        place.location = {
                            latitude: result.geometry.location.lat(),
                            longitude: result.geometry.location.lng()
                        };

                        place.address = result.formatted_address;

                        angular.element(scope.hiddenStorage).val(JSON.stringify(place));
                        angular.element(scope.hiddenStorage).attr('value',JSON.stringify(place));
                    })
                }
            }
        }
    }]);
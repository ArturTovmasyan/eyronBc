angular.module('Google', [])
    .directive('simpleMapMarker',[function(){

        function Initialize(el){
            var m, data = {};
            data.center = new google.maps.LatLng(40.177037, 44.514841);
            data.zoom = 16;
            data.mapTypeId = google.maps.MapTypeId.ROADMAP;
            m = new google.maps.Map(el,data);

            return m;
        }

        return {
            restrict: 'EA',
            scope: {
                markers: '=',
                openPopup: '&'
            },
            compile: function compile(){

                function addMarker(obj, map){
                    if(!angular.isNumber(obj.latitude) || !angular.isNumber(obj.longitude)){
                        return;
                    }

                    return new google.maps.Marker({
                        position: new google.maps.LatLng(obj.latitude, obj.longitude),
                        map: map
                    });
                }

                return function(scope, el){
                    scope.markers = {};
                    scope.map = Initialize(el[0]);

                    scope.$watch('markers',function(d){
                        if(!d){
                            return;
                        }

                    },true);
                };
            }
        };
    }])
    .directive('googlePlacesAutocomplete',[function(){
        return {
            restrict: 'EA',
            scope: {
                hiddenStorage: '@'
            },
            compile: function(){
                return function(scope, el){

                    var autocomplete = new google.maps.places.Autocomplete(el[0],{types: ['address']});
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
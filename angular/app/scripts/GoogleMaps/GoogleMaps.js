angular.module('GoogleMaps', [])
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
            markers: '='
        },
        compile: function compile(){

            function addMarker(obj, map){

                if(!angular.isObject(obj)){
                    return $log.error("'addMarker`s argument isn`t object");
                }

                if(!angular.isNumber(obj.latitude) || !angular.isNumber(obj.longitude)){
                    return;
                }

                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(obj.latitude, obj.longitude),
                    map: map
                });

                return marker;
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
}]);
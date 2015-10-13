//version 1.0.0
//this directive attributes(arguments) are
//ng-marker="marker"    type="object" MUST BE DEFINED.like marker.Lat=''
//ng-marker-drag="true" type="bool"     default | true
//ng-marker-limit="2"   type="nubmer"   default | 1
//ng-marker-icon="i.png"type="string"   default | google icon
//ng-zoom="12"          type="number"   default | 10
//ng-center-lat="44"    type="number"   default | 40.177037117759895
//ng-center-lng="45"    type="number"   default | 44.51488494873047
angular.module('GoogleMaps', [])
    .directive('simpleMarker',[function(){

    function Initialize(el){
        var m,data = {};
        data.center = new google.maps.LatLng(40.177037117759895,44.51488494873047);
        data.mapTypeId = google.maps.MapTypeId.ROADMAP;
        m = new google.maps.Map(el,data);
        return m;
    }

    return {
        restrict: 'A',
        scope: {
            markers: '='
        },
        compile: function compile(){

            function addMarker(obj, map){

                if(!angular.isObject(obj))
                    return $log.error("'addMarker`s argument isn`t object");

                if(!angular.isNumber(obj.latitude) || !angular.isNumber(obj.longitude))
                    return;

                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(obj.latitude,obj.longitude),
                    map: map
                });

                return marker;
            }


            return function(scope, el){
                scope.map = Initialize(el[0]);
            };
        }
    };
}]);
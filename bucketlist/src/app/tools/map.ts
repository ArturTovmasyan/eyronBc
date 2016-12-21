import { Component, OnInit , NgZone, ViewChild, ViewEncapsulation, ElementRef} from '@angular/core';

import { FormControl } from "@angular/forms";
import { MapsAPILoader } from 'angular2-google-maps/core';
import { Marker } from '../interface/marker';
import { Broadcaster } from '../tools/broadcaster';
import {CacheService, CacheStoragesEnum} from 'ng2-cache/ng2-cache';

@Component({
    selector: 'map-autocomplate',
    templateUrl: './autocomplate-map.component.html',
    styles: [`
    .sebm-google-map-container {
      height: 300px;
    }
  `],
    encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit {
    public latitude: number;
    public longitude: number;
    public activeGoalMarkerIcon1: string = "assets/images/Active-icon.png";
    public activeGoalMarkerIcon2: string = "assets/images/Completed-icon.png";
    public passiveMarkerIcon: string = "assets/images/map-marker-purple.png";
    public activeMarkerIcon: string = "assets/images/map-marker-purple.png";
    public searchControl: FormControl;
    public zoom: number;
    public notAllowed: boolean = false;
    public autocomplete: any;
    public markers: Marker[];

    @ViewChild("search")
    public searchElementRef: ElementRef;

    constructor(
        private _cacheService: CacheService,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone,
        private broadcaster: Broadcaster
    ) {}

    ngOnInit() {
        //set google maps defaults
        this.zoom = 4;
        this.latitude = 39.8282;
        this.longitude = -98.5795;

        //create search FormControl
        this.searchControl = new FormControl();

        //set current position
        this.setCurrentPosition();

        //load Places Autocomplete
        this.mapsAPILoader.load().then(() => {
            this.autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: []
            });
            this.autocomplete.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    //get the place result
                    let place: google.maps.places.PlaceResult = this.autocomplete.getPlace();

                    let marker:Marker = {
                        latitude: place.geometry.location.lat(),
                        longitude: place.geometry.location.lng(),
                        iconUrl: this.passiveMarkerIcon,
                        title: this.searchElementRef.nativeElement.value
                    };

                    this.broadcaster.broadcast('location_changed', marker);

                    this.markers = [marker];
                    this.latitude = place.geometry.location.lat();
                    this.longitude = place.geometry.location.lng();
                    this.zoom = 10;
                });
            });
        });

        this.broadcaster.on<string>('addGoal')
            .subscribe(data => {
                // if(scope.mapMarkers[data] && scope.mapMarkers[data].map){
                //     var icon = {
                //         url: this.activeGoalMarkerIcon1,
                //         scaledSize:new google.maps.Size(35, 50)
                //     };
                //     scope.mapMarkers[data].setIcon(icon);
                // }
            });

        this.broadcaster.on<string>('lsJqueryModalClosedSaveGoal')
            .subscribe(userGoal => {
                // if(!userGoal || !userGoal.status || !scope.mapMarkers[userGoal.goal.id] || !scope.mapMarkers[userGoal.goal.id].map)
                //         return;
                //
                //     var icon = {
                //         url: scope['activeGoalMarkerIcon'+userGoal.status],
                //         scaledSize:new google.maps.Size(35, 50)
                //     };
                //     scope.mapMarkers[userGoal.goal.id].setIcon(icon);
            });

        this.broadcaster.on<string>('lsJqueryModalClosedSaveGoal')
            .subscribe(userGoal => {
                // if(!userGoal || !userGoal.status || !scope.mapMarkers[userGoal.goal.id] || !scope.mapMarkers[userGoal.goal.id].map)
                //         return;
                //
                //     var icon = {
                //         url: scope['activeGoalMarkerIcon'+userGoal.status],
                //         scaledSize:new google.maps.Size(35, 50)
                //     };
                //     scope.mapMarkers[userGoal.goal.id].setIcon(icon);
            });

    }

    setType(types){
        this.autocomplete.setTypes(types)
    }

    setPosition(position){
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        let marker:Marker = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            iconUrl: this.passiveMarkerIcon,
            title: "Your Position"
        };

        this.broadcaster.broadcast('location_changed', marker);
        this.markers = [marker];
        this.zoom = 10;
    }

    private setCurrentPosition() {
        let position = this._cacheService.get('location');
        if(position && position.coords){
            this.setPosition(position);
        }else {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition((position) => {
                    this.notAllowed = false;
                    this.setPosition(position);
                    this._cacheService.set('location', position, {maxAge: 3 * 24 * 60 * 60});
                });
                this.notAllowed = true;
            }
        }
    }
}
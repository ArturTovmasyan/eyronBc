import { Component, OnInit , NgZone, ViewChild, ViewEncapsulation, ElementRef, Input} from '@angular/core';
import { Router } from '@angular/router';

import { FormControl } from "@angular/forms";
import { MapsAPILoader } from 'angular2-google-maps/core';
import { Marker } from '../../interface/marker';
import { Location } from '../../interface/location';
import { Broadcaster } from '../broadcaster';
import {CacheService, CacheStoragesEnum} from 'ng2-cache/ng2-cache';

@Component({
  selector: 'map-autocomplate',
  templateUrl: './autocomplate-map.component.html',
  styleUrls: ['./map.component.less']
})
export class AutocomplateMapComponent implements OnInit {
  @Input() locations: Location[];
  public latitude: number;
  public longitude: number;
  public activeGoalMarkerIcon1: string = "assets/images/Active-icon.png";
  public activeGoalMarkerIcon2: string = "assets/images/Completed-icon.png";
  public passiveMarkerIcon: string = "assets/images/map-marker-purple.png";
  public activeMarkerIcon: string = "assets/images/map-marker-purple.png";
  public searchControl: FormControl;
  public zoom: number;
  public notAllowed: boolean = true;
  public autocomplete: any;
  public bounds: any;
  public markers: Marker[];

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
      private _cacheService: CacheService,
      private mapsAPILoader: MapsAPILoader,
      private ngZone: NgZone,
      private router:Router,
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
      this.bounds = new google.maps.LatLngBounds(null);
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
          this.bounds.extend({
            lat: this.latitude,
            lng: this.longitude
          });
          this.zoom = 10;
        });
      });
    });

    this.broadcaster.on<Location[]>('getLocation')
        .subscribe(locations => {
          this.bounds = new google.maps.LatLngBounds(null);
          for (let location of locations){
            this.bounds.extend(location);
          }
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

    this.broadcaster.on<string>('doneGoal')
        .subscribe(data => {console.log(data);
          // if(scope.mapMarkers[data] && scope.mapMarkers[data].map){
          //     var icon = {
          //         url: scope.activeGoalMarkerIcon2,
          //         scaledSize:new google.maps.Size(35, 50)
          //     };
          //     scope.mapMarkers[data].setIcon(icon);
          // }
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

    this.bounds.extend({
      'latitude':this.latitude,
      'longitude': this.longitude
    });

    this.broadcaster.broadcast('location_changed', marker);
    this.markers = [marker];
    this.notAllowed = false;
    this.zoom = 10;
  }

  clickMarker(marker){
    this.router.navigate(['/goal/'+marker.slug]);
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
      }
    }
  }
}

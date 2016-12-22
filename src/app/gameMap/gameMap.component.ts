import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { AgmCoreModule, LatLngLiteral, LatLngBounds, SebmGoogleMap } from 'angular2-google-maps/core';
import { GameData, Point } from '../../data/game_data';
import { MapsAPILoader, NoOpMapsAPILoader, MouseEvent } from 'angular2-google-maps/core';
import * as mapTypes from 'angular2-google-maps/services/google-maps-types';

interface marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
    iconUrl?: string;
}

interface Route {
    points: Point[];
}

@Component({
    selector: 'gameMap',
    styleUrls: ['gameMap.css'],
    templateUrl: 'gameMap.html',
    encapsulation: ViewEncapsulation.None
})

export class GameMapComponent implements OnInit {
    @Input() gameData: GameData;
    icon: string = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
    point: Point;
    source: Point;
    destination: Point;
    index: number;
    loc: GLfloat = 0;
    driving: Route[] = [];
    markers: marker[] = [{
        lat: 32.115620,
        lng: 33.8402730000,
        label: "ME",
        draggable: false
    },
    {
        lat: 0,
        lng: 0,
        label: "TRY",
        draggable: false
    },
    {
        lat: 0,
        lng: 0,
        label: "TRY",
        draggable: false
    },
    {
        lat: 0,
        lng: 0,
        label: "TRY",
        draggable: false
    }];

    constructor() {
        var a = 5;
        this.point = { lat: 32.115620, lng: 33.8402730000 }; //This line is temp
        /*this.markers[0] = {
                lat: this.point.lat,
                lng: this.point.lng,
                label:"ME",
                iconUrl:'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
                draggable: false
                }*/
    }

    ngOnInit() {
    }

    renderMarkers() {
        //TODO: add markers from the code
        for (this.index = 0; this.index < this.gameData.numPlayers; this.index++) {
            this.markers[this.index].lat = this.point.lat;
            this.markers[this.index].lng = this.point.lng + this.loc;
            this.markers[this.index].label = "player" + this.index;
            //this.markers[this.index].iconUrl = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
            this.loc += 0.0003;
        }
    }

    getMap() {
        let geocoder3 = new google.maps.Geocoder();
        geocoder3.geocode({ 'address': this.gameData.route.source }, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
                let latitude = results[0].geometry.location.lat();
                let longitude = results[0].geometry.location.lng();
                this.point = this.source = { lat: latitude, lng: longitude };
                this.renderMarkers();
            }
            else {
                console.log("source: Address not found")
            }
        });
        geocoder3.geocode({ 'address': this.gameData.route.destination }, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
                let latitude = results[0].geometry.location.lat();
                let longitude = results[0].geometry.location.lng();
                this.destination = { lat: latitude, lng: longitude };
                this.renderMarkers();
            }
            else {
                console.log("source: Address not found")
            }
        });
    }

    createRouteForOther(index: number) {
        let types = ['WALKING', 'DRIVING', 'WALKING']
        let directionsDisplay;
        let directionsService = new google.maps.DirectionsService();
        let start = new google.maps.LatLng(this.source.lat, this.source.lng);
        let end = new google.maps.LatLng(this.destination.lat, this.destination.lng);
        let request = {
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode[types[index]]
        };
        directionsService.route(request, (response, status) => {
            if (status == google.maps.DirectionsStatus.OK) {
                let pointsArray = response.routes[0].overview_path;
                let tempDriving = {points: []};
                for (let i = 0; i < pointsArray.length; i++) {
                    tempDriving.points.push({ lat: pointsArray[i].lat(), lng: pointsArray[i].lng() })
                }
                this.driving.push(tempDriving);
            }
        });
    }
    addPlayersToMap() {
        for (this.index = 0; this.index <= this.gameData.numPlayers; this.index++) {
            this.markers.push(
                {
                    lat: this.point.lat + this.index / 1000,
                    lng: this.point.lng,
                    draggable: false
                }
            )
            this.createRouteForOther(this.index);
        }
        let i = 0;
        console.log('this.markers', this.markers)
        let moveOtherPoints = setInterval(() => {
            for (let j = 0; j <= this.gameData.numPlayers; j++) {
                if (this.driving[j]) {
                    this.markers[j] = { lat: this.driving[j].points[i].lat, lng: this.driving[j].points[i].lng, draggable: false };
               console.log('this.markers[j]', j, this.markers[j])
             }
                if (this.markers[0].lat.toFixed(3) == this.destination.lat.toFixed(3) && this.markers[0].lng.toFixed(3) == this.destination.lng.toFixed(3)) {
                    clearInterval(moveOtherPoints);
                }
                 i++;
            }
        }, 5000)
    }
}

// <reference path="../../../typings/googlemaps/google.maps.d.ts" />
/*  instance:SebmGoogleMap =new SebmGoogleMap(document.getElementById("www"));
          console.log("type map: "+instance.constructor.name);
          var marker = new google.maps.Marker({
              position: latlng, 
              map: map, 
              title: "Your location."
          }); 
      
      }*/
  //point array from other players: 
  /*pointsArray = result.routes[0].overview_path;
        var i = 0;
        var j = 0;
        for (j = 0; j < pointsArray.length; j++)
        {
            arrayToBeReturned [i] = pointsArray[j].lat ();
            i++;
            arrayToBeReturned [i] = pointsArray[j].lng ();
            i++;
            var point1 = new google.maps.Marker ({
                                            position:pointsArray [j],
                                            draggable:false,
                                            map:map,
                                            flat:true
                                            });
        } */
        //types for calculate route:
        /*BUS 
          RAIL 
          SUBWAY 
          TRAIN 
          TRAM 
          WALKING
          DRIVING*/
//street view:
 /* var fenway = {lat: 42.345573, lng: -71.098326};
     var map = new google.maps.Map(document.getElementById('map'), {
       center: fenway,
       zoom: 14
     });
     var panorama = new google.maps.StreetViewPanorama(
         document.getElementById('pano'), {
           position: fenway,
           pov: {
             heading: 34,
             pitch: 10
           }
         });
     map.setStreetView(panorama);*/






import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';
import { AgmCoreModule, LatLngLiteral } from 'angular2-google-maps/core';
import { GameData, Point } from '../../data/game_data';

@Component({
    selector: 'game',
    styleUrls: ['game.css'],
    templateUrl: 'game.html',
    encapsulation: ViewEncapsulation.None
})

export class GameComponent implements OnInit {
    @Output() onchangeKM: EventEmitter<Object> = new EventEmitter<Object>();
    @Input() gameData: GameData;
    currentAddress: string;
    timerStr: string = "";
    // timer:date = new Date();
    distance: string;
    // sourceStr: string = 'הדף היומי 6 תל אביב';
    // destinationStr: string = 'הצנחנים 22 תל אביב';
    destinationPoint: Point = { lat: 40.7127837, lng: -74.00594130000002 };;
    source: Point;
    destination: Point;
    point: Point;
    user: string;
    public address: string;
    distanceFromStartPoint: number = 0
    locations: Point[] = [];

    constructor() {
        this.point = { lat: 40.7127837, lng: -74.00594130000002 }; //This line is temp
        navigator.geolocation.getCurrentPosition(position => {
            this.point = this.source = this.destination = { lat: position.coords.latitude, lng: position.coords.longitude }
            this.locations.push(this.point);
        });
    }

    ngOnInit() {
        // this.getMap();
    }
    getRadius(x) {
        return x * Math.PI / 180;
    }
    calculateDistance(p1: Point, p2: Point) {
        let R = 6378137; // Earth’s mean radius in meter
        let dLat = this.getRadius(p2.lat - p1.lat);
        let dLong = this.getRadius(p2.lng - p1.lng);
        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.getRadius(p1.lat)) * Math.cos(this.getRadius(p2.lat)) *
            Math.sin(dLong / 2) * Math.sin(dLong / 2)
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c / 1000; //distance in km
        this.distanceFromStartPoint += d;
        this.distanceFormat();
    }

    getViewStreetPanorama() {
        var s = 5;
        var fenway = { lat: this.point.lat, lng: this.point.lng };
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 16,
        });
        var panorama = new google.maps.StreetViewPanorama(
            document.getElementById('pano'), {
                position: fenway,
                pov: {
                    heading: 34,
                    pitch: 10
                }
            });
        map.setStreetView(panorama);
    }

    calculateAddress(point: Point) {
        console.log('google.maps', google.maps);
        let geocoder = new google.maps.Geocoder();
        let latlng = new google.maps.LatLng(point.lat, point.lng);
        let request = {
            latLng: latlng
        };

        geocoder.geocode(request, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0] != null) {
                    this.currentAddress = results[0].formatted_address;
                    //   this.shareService.setLocationDetails(city)
                }
            }
        });
    }

    distanceFormat() {
        let km = Math.floor(this.distanceFromStartPoint);
        let meters = Math.round((this.distanceFromStartPoint * 1000) % 1000);
        this.distance = (km > 0 ? km + ' KM, ' : '') + meters + (meters == 1 ? ' meter' : ' meters');
        this.onchangeKM.emit({ distance: this.distance, currentAddress: this.currentAddress });
    }

    movePointer() {
        setInterval(() => {
            //this.timer = new Date();
            //this.timerStr = this.timer.getHours() + ":"+this.timer.getMinutes() + ":"+this.timer.getSeconds();
            // let timer1: Moment = new Moment
            // this.timeStr = timer1.format('HH:MM:SS');
            let prevPoint = this.point;
            this.point = { lat: this.point.lat + 0.0001, lng: this.point.lng };
            this.locations.push(this.point);
            this.calculateDistance(prevPoint, this.point);
            //draw route
            this.calculateAddress(this.point);
            this.checkIfSuccess();
        }, 250)
    }

    getMap() {
        //console.log('getMap', this.gameData)   
        let geocoder3 = new google.maps.Geocoder();
        geocoder3.geocode({ 'address': this.gameData.route.source }, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
                let latitude = results[0].geometry.location.lat();
                let longitude = results[0].geometry.location.lng();
                this.point = this.source = { lat: latitude, lng: longitude };
            }
            else {
                console.log("source: Address not found")
            }
        });
        geocoder3.geocode({ 'address': this.gameData.route.destination }, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
                let latitude = results[0].geometry.location.lat();
                let longitude = results[0].geometry.location.lng();
                this.destinationPoint.lat = latitude;
                this.destinationPoint.lng = longitude;
                this.destination = { lat: latitude, lng: longitude };
            }
            else {
                console.log("destination: Address not found")
            }
        });
        this.getViewStreetPanorama();
    }

    checkIfSuccess() {
        if (this.point.lat.toFixed(3) == this.destinationPoint.lat.toFixed(3) && this.point.lng.toFixed(3) == this.destinationPoint.lng.toFixed(3)) {
            console.log("success");
        }
    }
}

// <reference path="../../../typings/googlemaps/google.maps.d.ts" />






import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';
import { AgmCoreModule, LatLngLiteral } from 'angular2-google-maps/core';
import { GameData, Point } from '../../data/game_data';
import { MapsAPILoader } from 'angular2-google-maps/core/services/maps-api-loader/maps-api-loader';
import { GameAPI } from '../../utils/gamesApi';
import moment = require("moment");


@Component({
    selector: 'game',
    styleUrls: ['game.css'],
    templateUrl: 'game.html',
    encapsulation: ViewEncapsulation.None
})

export class GameComponent implements OnInit {
    @Output() onchangeKM: EventEmitter<Object> = new EventEmitter<Object>();
    @Output() onSuccess: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() gameData: GameData;
    success: boolean = false;
    locations: Point[] = [];
    currentAddress: string;
    distance: string;
    source: Point;
    destination: Point;
    point: Point;
    address: string;
    distanceFromStartPoint: number = 0;
    dateStart: string;
    //bgImage: string = '\images\race.png';

    constructor(private _loader: MapsAPILoader) {
    }

    ngOnInit() {
        return this._loader.load().then(() => {
            this.getViewStreetPanorama();
            this.dateStart = moment().format('DD/MM/YYYY - HH:mm:ss');
            console.log('this.dateSta', this.dateStart)
            return;
        });
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
        this.point = this.gameData.route.sourcePoint;
        let fenway = { lat: this.point.lat, lng: this.point.lng };
        let map = new google.maps.Map(document.getElementById('map'), {
            zoom: 16,
        });

        let panorama = new google.maps.StreetViewPanorama(
            document.getElementById('pano'), {
                position: fenway,
                pov: {
                    heading: 34,
                    pitch: 10
                },
                visible: true
            });

        panorama.addListener('pano_changed', () => {
            this.movePointer(panorama.getLocation().latLng.lat(), panorama.getLocation().latLng.lng());
            this.currentAddress = panorama.getLocation().description;   //calculate current address from view street
        });

        let cafe = new google.maps.LatLng(this.gameData.route.destPoint.lat, this.gameData.route.destPoint.lng);
        let cafeMarker = new google.maps.Marker({
            position: cafe,
            map: panorama,
            icon: '../../images/flag.png'
        });
        map.setStreetView(panorama);
    }

    distanceFormat() {
        let km = Math.floor(this.distanceFromStartPoint);
        let meters = Math.round((this.distanceFromStartPoint * 1000) % 1000);
        this.distance = (km > 0 ? km + ' KM, ' : '') + meters + (meters == 1 ? ' meter' : ' meters');
        this.onchangeKM.emit({ distance: this.distance, currentAddress: this.currentAddress, currentPoint: this.point });
    }

    movePointer(lat: number, lng: number) {
        let prevPoint = this.point;
        this.point = { lat: lat, lng: lng };
        this.locations.push(this.point);
        this.calculateDistance(prevPoint, this.point);
        this.checkIfSuccess();
    }

    getPointByAddress(address: string, varName: string, callback: any) {
        //not used
        const myCallback = callback.bind(this);
        let geocoder = new google.maps.Geocoder();
        let point;
        geocoder.geocode({ 'address': address }, (results, status) => {
            let flag = status == google.maps.GeocoderStatus.OK;
            let response = results[0].geometry.location;
            var p3 = new Promise((results, status) => {
                if (flag) {
                    this[varName] = {
                        lat: response.lat(),
                        lng: response.lng()
                    }
                    myCallback();
                }
            });
        });
    }

    getMap() {
        this.getViewStreetPanorama();
    }

    checkIfSuccess() {
        if (!this.success) {
            if (this.point.lat.toFixed(3) == this.gameData.route.destPoint.lat.toFixed(3)
                && this.point.lng.toFixed(3) == this.gameData.route.destPoint.lng.toFixed(3)) {
                console.log('success')
                this.onSuccess.emit(true);
                $(".imgWin").css("z-index", "1000");
                this.success = true;
                GameAPI.saveGame({
                    playerName: this.gameData.player,
                    dateStart: this.dateStart,
                    route: this.gameData.route,
                    numPlayers: this.gameData.numPlayers,
                    routePoints: this.locations
                })
            }
        }

    }
}
import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { AgmCoreModule, LatLngLiteral, LatLngBounds, SebmGoogleMap } from 'angular2-google-maps/core';
import { GameData, Point, Locations, marker, markerLocation, gameData } from '../../data/game_data';
import { MapsAPILoader, NoOpMapsAPILoader, MouseEvent } from 'angular2-google-maps/core';
import * as mapTypes from 'angular2-google-maps/services/google-maps-types';

interface RouteDriving {
    points: Point[];
}

@Component({
    selector: 'gameMap',
    styleUrls: ['gameMap.css'],
    templateUrl: 'gameMap.html',
    encapsulation: ViewEncapsulation.None
})

export class GameMapComponent implements OnInit {
    @Input() gameData: GameData = gameData;
    @Input() currentPoint: Point;
    @Input() locations: Locations;
    @Output() onChangeMarkersLocation: EventEmitter<Object> = new EventEmitter<Object>();
    playersLocation: markerLocation
    point: Point = gameData.route.sourcePoint;
    source: Point;
    destination: Point;
    driving: RouteDriving[] = [];
    markers: marker[] = [];
    success: boolean = false;
    icons: string[] = ['', 'green', 'blue', 'purple', 'orange']

    constructor() {  
        this.icons[0] = this.gameData.carColor;
    }

     ngOnInit() {
        this.markers.push({
            lat: this.currentPoint.lat,
            lng: this.currentPoint.lng,
            label: "ME",
            draggable: false,
            iconUrl: 'http://labs.google.com/ridefinder/images/mm_20_' + this.gameData.carColor + '.png'
        })

        for (let i = 0; i < this.gameData.numPlayers; i++) {
            this.onChangeMarkersLocation.emit(
                {
                    currentLocation: this.gameData.route.sourcePoint,
                    marker: 'http://labs.google.com/ridefinder/images/mm_20_' + this.icons[i] + '.png',
                    index: i
                });
        }
    }

    renderMarkers() {
        console.log('render markers', this.markers, this.gameData.numPlayers)
        //TODO: add markers from the code
        this.markers[0].lat = this.gameData.route.sourcePoint.lat;
        this.markers[0].lng = this.gameData.route.sourcePoint.lng;
        let loc = 0
        for (let index = 1; index < this.gameData.numPlayers; index++) {
            if (this.markers.length <= this.gameData.numPlayers) {
                this.markers.push({
                    lat: this.gameData.route.sourcePoint.lat,
                    lng: this.gameData.route.sourcePoint.lng + loc,
                    label: "player" + index,
                    draggable: false,
                    iconUrl: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                })
                loc += 0.0003;
            }
        }
        console.log('numPlayers', this.markers, this.gameData.numPlayers)
    }

    
    moveSinglePoint(index: number, delay: number) {
        //change delay every time....
        let i = 0;
        let moveOtherPoints = setInterval(() => {
            if (this.driving[index - 1] && this.driving[index - 1].points[i]) {
                this.markers[index].lat = this.driving[index - 1].points[i].lat;
                this.markers[index].lng = this.driving[index - 1].points[i].lng;
            }
            if (this.success || this.markers[index].lat.toFixed(3) == this.gameData.route.destPoint.lat.toFixed(3)
                && this.markers[index].lng.toFixed(3) == this.gameData.route.destPoint.lng.toFixed(3)) {
                    clearInterval(moveOtherPoints);
            }
            i++;
            this.onChangeMarkersLocation.emit(
                {
                    currentLocation: { lat: this.markers[index].lat, lng: this.markers[index].lng },
                    marker: 'http://labs.google.com/ridefinder/images/mm_20_' + this.icons[index] + '.png',
                    index: index
                });
        }, delay);
    }

    movePlayerPoint() {
        this.markers[0].lat = this.gameData.route.sourcePoint.lat;
        this.markers[0].lng = this.gameData.route.sourcePoint.lng;
        this.markers[0].label = "ME";
        let movePlayer = setInterval(() => {
            //console.log('this.locations', this.locations);
            this.point.lat = this.markers[0].lat = this.currentPoint.lat;
            this.point.lng = this.markers[0].lng = this.currentPoint.lng;
            this.onChangeMarkersLocation.emit(
                {
                    currentLocation: this.currentPoint,
                    marker: 'http://labs.google.com/ridefinder/images/mm_20_' + this.icons[0] + '.png',
                    index: 0
                });
            if (this.markers[0].lat.toFixed(3) == this.gameData.route.destPoint.lat.toFixed(3)
                && this.markers[0].lng.toFixed(3) == this.gameData.route.destPoint.lng.toFixed(3)) {
                this.success = true;
                clearInterval(movePlayer);
                this.onChangeMarkersLocation.emit(
                    {
                        currentLocation: this.gameData.route.destPoint,
                        marker: 'http://labs.google.com/ridefinder/images/mm_20_' + this.icons[0] + '.png',
                        index: 0
                    });
            }
        }, 1000)

    }
    getRightPoint(movePoint: Point, num: number) {
    //TODO: async function, need callback
    let geocoder3 = new google.maps.Geocoder();
    let newMovePoint:Point = {lat:num/100 + movePoint.lat , lng:num/120+movePoint.lng}
    geocoder3.geocode({ 'location': newMovePoint }, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
            console.log("*********vvv******", results[0], num);
            return results[0].formatted_address;
        }
        else {
                console.log("*****xxx*******")
            }
        });
            return this.gameData.route.source;
    }

    createRouteForOther(index, callback) {

        //create diffrebt routes to type DRIVING
        let _callback = callback.bind(this);
        let directionsDisplay;
        let wayPoint: string;
        let directionsService = new google.maps.DirectionsService();
        let start = new google.maps.LatLng(this.gameData.route.sourcePoint.lat, this.gameData.route.sourcePoint.lng);
        let end = new google.maps.LatLng(this.gameData.route.destPoint.lat, this.gameData.route.destPoint.lng);
        wayPoint = this.getRightPoint(this.gameData.route.sourcePoint, index);
        let request = {
            origin: start,
            destination: end,
            provideRouteAlternatives: true,
            travelMode: google.maps.TravelMode['DRIVING'],
            waypoints: [
                {
                    location: wayPoint,//new google.maps.LatLng(wayPoint.lat,wayPoint.lng),
                    stopover: false
                }],
        };
        let me = this;
        //decide what to do there is no route - status != ok
        directionsService.route(request, (response, status) => {
            if (status == google.maps.DirectionsStatus.OK) {
                let pointsArray = response.routes[0].overview_path;
                let tempDriving = { points: [] };
                for (let i = 0; i < pointsArray.length; i++) {
                    tempDriving.points.push({ lat: pointsArray[i].lat(), lng: pointsArray[i].lng() })
                }
                me.driving.push(tempDriving);
                console.log('set driving', this.driving);
                _callback();
            }
        });
        console.log("create route sucess", index, this.driving);
    }
    waitForSetRoutes() {
        console.log('this.waitForSetRoutes  ')
        let flag = 1;
        for (let i = 1; i < this.gameData.numPlayers; i++) {
            flag += this.driving[i - 1] ? 1 : 0;
        }
        if (flag == this.gameData.numPlayers) {
            console.log('this.waitForSetRoutes  finish')
            this.moveAllPoints();
        }

    }
    addPlayersToMap() {
        for (let index = 1; index < this.gameData.numPlayers; index++) {
            console.log("markers.length ", this.markers.length, "this.gameData.numPlayers", this.gameData.numPlayers);
            if (this.markers.length < this.gameData.numPlayers) {
                this.markers.push({
                    lat: this.gameData.route.sourcePoint.lat,
                    lng: this.gameData.route.sourcePoint.lng,
                    label: "player" + index,
                    draggable: false,
                    iconUrl: 'http://labs.google.com/ridefinder/images/mm_20_' + this.icons[index] + '.png'
                })
                this.createRouteForOther(index, this.waitForSetRoutes);
                console.log('new marker', index, this.markers[index])
            }
        }
    }

    moveAllPoints() {
        let i = 0;
        this.markers[0].lat = this.currentPoint.lat;
        this.markers[0].lng = this.currentPoint.lng;
        for (let i = 1; i < this.gameData.numPlayers; i++) {
            if (this.driving[i - 1] && this.driving[i - 1].points.length != 0) {
                this.moveSinglePoint(i, i * 6000/this.gameData.level);
            }
        }
        this.movePlayerPoint();
    }
}







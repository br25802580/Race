import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { AgmCoreModule, LatLngLiteral } from 'angular2-google-maps/core';
import { GameData, Point, markerLocation, markersLocation, gameData } from '../../data/game_data';

@Component({
    selector: 'playersStatus',
    styleUrls: ['playersStatus.css'],
    templateUrl: 'playersStatus.html',
    encapsulation: ViewEncapsulation.None
})

export class PlayersStatusComponent implements OnInit {
    @Input() allMarkersLocation: { [id: string]: markerLocation; } = {};
    @Input() gameData: GameData;
    distanceFromEndPoint: number = 0
    distance: string;
    winners: number = 0;


    keys(): Array<string> {
        return Object.keys(this.allMarkersLocation);
    }

    getRadius(x) {
        return x * Math.PI / 180;
    }


    distanceFromDestination(p1: Point) {
        let R = 6378137; // Earth’s mean radius in meter
        let dLat = this.getRadius(this.gameData.route.destPoint.lat - p1.lat);
        let dLong = this.getRadius(this.gameData.route.destPoint.lng - p1.lng);
        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.getRadius(p1.lat)) * Math.cos(this.getRadius(this.gameData.route.destPoint.lat)) *
            Math.sin(dLong / 2) * Math.sin(dLong / 2)
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        this.distanceFromEndPoint = d;
        return this.distanceFormat();

    }

    distanceFormat() {
        let km = Math.floor(this.distanceFromEndPoint / 1000);
        let meters = Math.floor(this.distanceFromEndPoint % 1000);
        if (km == 0 && meters == 0){
            //this.winners = this.winners+1;
            return 'Winner ' ;//+ this.winners ;            
        }
        return this.distance = (km > 0 ? km + ' KM, ' : '') +
            (meters > 0 ? meters + (meters == 1 ? ' meter' : ' meters') : '')
    }

    constructor() {
    }

    ngOnInit() {
    }

}










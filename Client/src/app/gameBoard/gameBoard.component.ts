import { Component, OnInit, ViewEncapsulation, Input, EventEmitter } from '@angular/core';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { GameData, gameData, Locations, locations, markerLocation, markersLocation } from '../../data/game_data';

class Point {
    lat: number;
    lng: number;
}

@Component({
    selector: 'gameBoard',
    styleUrls: ['gameBoard.css'],
    templateUrl: 'gameBoard.html',
    encapsulation: ViewEncapsulation.None
})

export class GameBoardComponent implements OnInit {
    distance: string;
    currentAddress: string;
    success: boolean;
    timePast: string;
    gameData: GameData = gameData;
    playersLocation: { [id: string]: markerLocation; } = {};
    locations: Locations = locations;
    currentPoint: Point;

    constructor() {
    }

    ngOnInit() {
        this.currentPoint = { lat: 10, lng: 10 };
        for (let i = 0; i < this.gameData.numPlayers; i++)
            this.playersLocation[i] = {
                currentLocation: this.currentPoint,
                marker: i.toString()
            }
    }

    distanceFormat(event: any) {
        this.distance = event.distance;
        this.currentAddress = event.currentAddress;
        this.currentPoint = event.currentPoint;
        this.locations.addPoint(this.currentPoint.lat, this.currentPoint.lng);
    }

    isSuccess(event: boolean) {
        this.success = event;
        if (this.success == true)
        {
            $(".winImg").css("z-index", "1000");
        }
    }

    changeMarkersLocation(event: any) {
        this.playersLocation[event.index] = {
            currentLocation: event.currentLocation,
            marker: event.marker
        }
    }
}








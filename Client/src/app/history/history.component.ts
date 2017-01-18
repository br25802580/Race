import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GameAPI } from '../../utils/gamesApi';
import { GameData, Point, Locations, marker, markerLocation, gameData } from '../../data/game_data';
import { AgmCoreModule, LatLngLiteral, LatLngBounds, SebmGoogleMap } from 'angular2-google-maps/core';

class SavedGame {
    id: string;
    numPlayers: number;
    date: Date;
    playerName: string;
}

@Component({
    selector: 'history',
    styleUrls: ['history.scss'],
    templateUrl: 'history.html',
    encapsulation: ViewEncapsulation.None
})

export class HistoryComponent implements OnInit {
    history: SavedGame[] = GameAPI.getAll();
    pointMap:Point={lat:32.115633 , lng:34.84027600000002}
    constructor() {

    }

    ngOnInit() {
    }

    viewMap() {
        $("#map").css("visibility", "visible");
    }
}






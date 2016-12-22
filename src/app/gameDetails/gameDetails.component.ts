/// <reference path="../../../typings/googlemaps/google.maps.d.ts" />
import {Component, OnInit, ViewEncapsulation, Input} from '@angular/core';
import { AgmCoreModule , LatLngLiteral } from 'angular2-google-maps/core';
import {GameData} from '../../data/game_data';

@Component({
    selector: 'gameDetails',
    styleUrls: ['gameDetails.css'],
    templateUrl: 'gameDetails.html',
    encapsulation: ViewEncapsulation.None
})

export class GameDetailsComponent implements OnInit {
    @Input() distance1: string;
    @Input() currentAddress: string;
    @Input() gameData: GameData;
    @Input() test: string;
    data: GameData;

    constructor() {
       console.log('game details', this.gameData);
       console.log('game details test', this.test);
    }

    ngOnInit() {
        this.data = this.gameData;
       console.log('onInit game details', this.gameData);
       console.log('onInit game details test', this.test);
        
    }

}


 




 


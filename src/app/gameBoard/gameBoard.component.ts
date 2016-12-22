import {Component, OnInit, ViewEncapsulation,Input,EventEmitter} from '@angular/core';
import { AgmCoreModule } from 'angular2-google-maps/core';
import {GameData, gameData} from '../../data/game_data';

@Component({
    selector: 'gameBoard',
    styleUrls: ['gameBoard.css'],
    templateUrl: 'gameBoard.html',
    encapsulation: ViewEncapsulation.None
})

export class GameBoardComponent implements OnInit {
    distance: string;
    currentAddress: string;
    timePast: string;
    gameData: GameData = gameData;
    test: string = 'test data';
    constructor() {      
       
    }

    ngOnInit() {
    }
    distanceFormat(event:Object) {
        this.distance = event.distance;
        this.currentAddress = event.currentAddress;
    }
       
}





 


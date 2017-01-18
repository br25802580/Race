import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { AgmCoreModule, LatLngLiteral } from 'angular2-google-maps/core';
import { GameData } from '../../data/game_data';
import moment = require("moment");

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
    @Input() success:boolean = false;
    data: GameData;
    stopWatch: any;
    time: any = moment().startOf('day');

    constructor() {
    }

    ngOnInit() {
        //start after get map
        //stop after win
        setInterval(() => {
            this.data = this.gameData;
        }, 500)
        this.stopWatch = setInterval(() => {
            this.time.add(1, 'second');
            if (this.success)
                clearInterval(this.stopWatch)
        }, 1000)
    }
}










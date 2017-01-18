// modules import
import {NgModule} from "@angular/core";
import { AgmCoreModule } from 'angular2-google-maps/core';
import {FormsModule} from '@angular/forms';

// components import
import {GameBoardComponent} from './gameBoard.component';
import {GameModule} from '../game/game.module';
import {GameDetailsModule} from '../gameDetails/gameDetails.module';
import {PlayersStatusModule} from '../playersStatus/playersStatus.module';
import {GameMapModule} from '../gameMap/gameMap.module';
import { RouterModule } from '@angular/router';

@NgModule({
	imports: [AgmCoreModule, FormsModule, GameModule, GameDetailsModule,PlayersStatusModule, GameMapModule,RouterModule],       // module dependencies
    exports: [GameBoardComponent],
	declarations: [GameBoardComponent],   // components and directives
})
export class GameBoardModule {
	constructor() {		
	}
}


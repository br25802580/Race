// modules import
import {NgModule} from "@angular/core";
import { AgmCoreModule } from 'angular2-google-maps/core';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

// components import
import {PlayersStatusComponent} from './playersStatus.component';

@NgModule({
	imports: [AgmCoreModule, FormsModule , CommonModule],       // module dependencies
    exports: [PlayersStatusComponent],
	declarations: [PlayersStatusComponent],   // components and directives
})
export class PlayersStatusModule {
	constructor() {		
	}
}


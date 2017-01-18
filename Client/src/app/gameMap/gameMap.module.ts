// modules import
import { NgModule } from "@angular/core";
import { AgmCoreModule } from 'angular2-google-maps/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// components import
import { GameMapComponent } from './gameMap.component';

@NgModule({
	imports: [AgmCoreModule, FormsModule, CommonModule],       // module dependencies
	exports: [GameMapComponent],
	declarations: [GameMapComponent],   // components and directives
})
export class GameMapModule {
	constructor() {
	}
}


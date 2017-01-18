// modules import
import {NgModule} from "@angular/core";
import { AgmCoreModule } from 'angular2-google-maps/core';
import {FormsModule} from '@angular/forms';

// components import
import {GameDetailsComponent} from './gameDetails.component';

@NgModule({
	imports: [AgmCoreModule, FormsModule],       // module dependencies
    exports: [GameDetailsComponent],
	declarations: [GameDetailsComponent],   // components and directives
})
export class GameDetailsModule {
	constructor() {		
	}
}


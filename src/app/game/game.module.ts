// modules import
import {NgModule} from "@angular/core";
import { AgmCoreModule } from 'angular2-google-maps/core';
import {FormsModule} from '@angular/forms';

// components import
import {GameComponent} from './game.component';

@NgModule({
	imports: [AgmCoreModule, FormsModule],       // module dependencies
    exports: [GameComponent],
	declarations: [GameComponent],   // components and directives
})
export class GameModule {
	constructor() {		
	}
}


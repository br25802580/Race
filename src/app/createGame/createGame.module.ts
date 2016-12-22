// modules import
import {NgModule} from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';
import { TooltipModule } from 'ng2-bootstrap/ng2-bootstrap';
import { AccordionModule } from 'ng2-bootstrap/ng2-bootstrap';
import {FormsModule} from '@angular/forms'; //NgModel
import { RouterModule } from '@angular/router';
// components import
import {CreateGameComponent} from './createGame.component';

@NgModule({
	imports: [BrowserModule,AgmCoreModule,AlertModule,TooltipModule,
	 AccordionModule, FormsModule, RouterModule],       // module dependencies
    exports: [CreateGameComponent],
	declarations: [CreateGameComponent],   // components and directives
})
export class CreateGameModule {
	constructor() {		
	}
}


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { NgaModule } from '../theme/nga.module';
import { Map } from './map.component';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from 'angular2-google-maps/core';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    NgaModule,
    CKEditorModule,
    AgmCoreModule
  ],
  declarations: [
    Map
  ]
})
export class MapModule {
}

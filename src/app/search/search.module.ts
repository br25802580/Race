import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { NgaModule } from '../theme/nga.module';
import { Search } from './search.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    CKEditorModule
  ],
  declarations: [
    Search
  ]
})
export  class SearchModule {
}

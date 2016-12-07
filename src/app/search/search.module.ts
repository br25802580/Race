import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { NgaModule } from '../theme/nga.module';
import { Search } from './search.component';
import { StoreListComponent } from './store-list/store-list.component';
import { StoreListService } from './store-list/store-list.service';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    CKEditorModule,
    RouterModule
  ],
  declarations: [
    Search,
    StoreListComponent
  ],
  providers: [
    StoreListService
  ]
})
export  class SearchModule {
}

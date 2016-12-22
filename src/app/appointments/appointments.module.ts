import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { NgaModule } from '../theme/nga.module';
import { Appointments } from './appointments.component';
import { AgentListComponent } from './agent-list/agent-list.component';
import { AgentListService } from './agent-list/agent-list.service';
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
    Appointments,
    AgentListComponent
  ],
  providers: [
    AgentListService
  ]
})
export  class AppointmentsModule {
}

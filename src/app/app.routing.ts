import { Routes, RouterModule } from '@angular/router';
import { Home } from './home/home.component';
import { Appointments } from './appointments/appointments.component';
import {AgentListComponent } from './appointments/agent-list/agent-list.component';
import { Map } from './map/map.component';

export const routes: Routes = [
    { path: 'appointments', component: Appointments,children: [
      { path: 'agent-list', component: AgentListComponent }
    ] },
  //{ path: 'search', component:Appointments },
  { path: 'home', component: Home },
  { path: 'map', component: Map },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });

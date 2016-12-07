import { Routes, RouterModule } from '@angular/router';
import { Home } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
  { path: 'home', component: Home }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });

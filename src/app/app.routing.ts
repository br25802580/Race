import { Routes, RouterModule } from '@angular/router';
import { Home } from './home/home.component';
import { Search } from './search/search.component';

export const routes: Routes = [
  { path: 'search', component:Search },
  { path: 'home', component: Home },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });

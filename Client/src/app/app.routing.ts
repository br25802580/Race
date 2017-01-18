import { Routes, RouterModule } from '@angular/router';
import { Home } from './home/home.component';
//import { Appointments } from './appointments/appointments.component';
//import {AgentListComponent } from './appointments/agent-list/agent-list.component';
//import { Map } from './map/map.component';

//import { HomeComponent } from './home';
//import { AboutComponent } from './about';
import { GameComponent } from './game/game.component';
import {GameDetailsComponent} from './gameDetails/gameDetails.component';
import {PlayersStatusComponent} from './playersStatus/playersStatus.component';
import { GameBoardComponent } from './gameBoard/gameBoard.component';
import { CreateGameComponent } from './createGame/createGame.component';
import { RaceHomeComponent } from './raceHome/raceHome.component';
import { HistoryComponent } from './history/history.component';

export const routes: Routes = [
    { path: '',      component: RaceHomeComponent },
 // { path: 'home',  component: Home },
 // { path: 'about', component: AboutComponent },
  {path: 'createGame',  component: CreateGameComponent},
  {path: 'raceHome', component: RaceHomeComponent},
  { path: 'history', component: HistoryComponent},
  {path: 'gameBoard', component: GameBoardComponent},
  //   { path: 'appointments', component: Appointments,children: [
  //     { path: 'agent-list', component: AgentListComponent }
  //   ] },
  // { path: 'home', component: Home },
  // { path: 'map', component: Map },
  { path: '', redirectTo: 'raceHome', pathMatch: 'full' },
  { path: '**', redirectTo: 'raceHome' }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });

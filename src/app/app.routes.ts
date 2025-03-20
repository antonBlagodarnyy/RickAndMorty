import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DisplayCharacterComponent } from './dashboard/display-character/display-character.component';
import { DisplayEpisodeComponent } from './dashboard/display-episode/display-episode.component';
import { DisplayLocationComponent } from './dashboard/display-location/display-location.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'characters', component: DisplayCharacterComponent },
  { path: 'episodes', component: DisplayEpisodeComponent },
  { path: 'locations', component: DisplayLocationComponent },
];

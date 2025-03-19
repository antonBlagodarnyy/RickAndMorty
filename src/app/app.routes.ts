import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CharacterComponent } from './cards/character/character.component';
import { EpisodeComponent } from './cards/episode/episode.component';
import { LocationComponent } from './cards/location/location.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'characters', component: CharacterComponent },
  { path: 'episodes', component: EpisodeComponent },
  { path: 'locations', component: LocationComponent },
];

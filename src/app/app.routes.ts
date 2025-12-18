import { Routes } from '@angular/router';
import { CharactersComponent } from './sections/characters/characters.component';
import { LocationsComponent } from './sections/locations/locations.component';
import { EpisodesComponent } from './sections/episodes/episodes.component';

export const routes: Routes = [
  {path: '', redirectTo: '/characters', pathMatch: 'full'},
  { path: 'characters', component: CharactersComponent },
  { path: 'locations', component: LocationsComponent },
  { path: 'episodes', component: EpisodesComponent },
];

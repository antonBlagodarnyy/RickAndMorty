import { Component } from '@angular/core';
import { CharacterComponent } from "../cards/character/character.component";
import { LocationComponent } from "../cards/location/location.component";
import { EpisodeComponent } from "../cards/episode/episode.component";

@Component({
  selector: 'app-dashboard',
  imports: [CharacterComponent, LocationComponent, EpisodeComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}

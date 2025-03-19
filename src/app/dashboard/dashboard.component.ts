import { Component } from '@angular/core';
import { CharacterComponent } from "../cards/character/character.component";
import { LocationComponent } from "../cards/location/location.component";
import { EpisodeComponent } from "../cards/episode/episode.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}

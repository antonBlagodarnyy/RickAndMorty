import { Component, input, OnInit } from '@angular/core';
import { EpisodeService } from '../../../services/episode.service';
import { LocationService } from '../../../services/location.service';
@Component({
  selector: 'app-info-character',
  imports: [],
  templateUrl: './info-character.component.html',
  styleUrl: './info-character.component.css',
})
export class InfoCharacterComponent {
  status = input();
  species = input();
  type = input();
  gender = input();
  origin = input<{ name: string; url: string; id: number }>({
    name: 'undefined',
    url: 'undefined',
    id: 0,
  });
  location = input<{ name: string; url: string; id: number }>({
    name: 'undefined',
    url: 'undefined',
    id: 0,
  });
  episodes = input<{ url: string; id: number }[]>();
  url = input();
  created = input();

  constructor(
    private episodeService: EpisodeService,
    private locationService: LocationService
  ) {}

  refreshEpisode(id: number) {
    this.episodeService.setId(id);
  }
  refreshLocation(id: number) {
    this.locationService.setId(id);
  }
}

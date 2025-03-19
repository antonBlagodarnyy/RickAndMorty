import { Component } from '@angular/core';
import { Episode } from '../../cards/models/episode-model';
import { EpisodeService } from '../../services/episode.service';

@Component({
  selector: 'app-display-episode',
  imports: [],
  templateUrl: './display-episode.component.html',
  styleUrl: './display-episode.component.css'
})
export class DisplayEpisodeComponent {
  episodes : Episode[] = [];
  currentPage = 1;
  page : string = '?page=' + this.currentPage;

  constructor(private episodeService: EpisodeService){}
}

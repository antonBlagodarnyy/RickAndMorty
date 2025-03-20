import { Component, input, OnInit } from '@angular/core';
import { Episode } from '../models/episode-model';
import { EpisodeService } from '../../services/episode.service';
import { CardHeaderComponent } from '../card-header/card-header.component';
import { InfoEpisodeComponent } from './info-episode/info-episode.component';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-episode',
  imports: [CardHeaderComponent, InfoEpisodeComponent],
  templateUrl: './episode.component.html',
  styleUrl: './episode.component.css',
})
export class EpisodeComponent implements OnInit {
  type = 'Episode';
  episode = input<Episode>();


  constructor(
    private episodeService: EpisodeService,
    private characterService: CharacterService
  ) {}

  ngOnInit(): void {
   /*  this.episodeService.getId.subscribe((id) => {
      this.episodeService.fetchEpisode(id).subscribe((episodeData) => {
        this.episode = {
          id: episodeData.id,
          name: episodeData.name,
          air_date: episodeData.air_date,
          episode: episodeData.episode,
          url: episodeData.url,
          created: episodeData.created,
        };
        this.characters = [];
        episodeData.characters.forEach((characterUrl) => {
          let id = parseInt(this.characterService.getIdFromUrl(characterUrl));
          this.characterService
            .fetchCharacterName(id)
            .subscribe((residentName) => {
              this.characters.push({ name: residentName, id: id });
            });
        });
      });
    }); */
  }
}

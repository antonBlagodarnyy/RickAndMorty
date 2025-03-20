import { Component, OnInit } from '@angular/core';
import { Episode } from '../../cards/models/episode-model';
import { EpisodeService } from '../../services/episode.service';
import { EpisodeComponent } from '../../cards/episode/episode.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FunctionalitiesService } from '../../services/functionalities.service';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-display-episode',
  imports: [EpisodeComponent, NgxPaginationModule],
  templateUrl: './display-episode.component.html',
  styleUrl: './display-episode.component.css',
})
export class DisplayEpisodeComponent implements OnInit {
  episodes: Episode[] = [];
  currentPage = 1;
  page: string = '?page=' + this.currentPage;

  constructor(
    private episodeService: EpisodeService,
    private functionalitiesService: FunctionalitiesService,
    private characterService: CharacterService
  ) {}

  ngOnInit() {
    this.getEpisodes(this.page);
  }

  getEpisodes(page: string) {
    this.episodeService.fetchEpisodes(page).subscribe((Episodes) => {

      Episodes.results.forEach((episode) => {
        let characters: { id: number; name: string }[] = [];

        episode.characters.map((characterUrl) => {
          let characterId = parseInt(
            this.functionalitiesService.getIdFromUrl(characterUrl)
          );
          this.characterService
            .fetchCharacterName(characterId)
            .subscribe((characterName) => {
              characters.push({ id: characterId, name: characterName });
            });
        });

        this.episodes.push({
          id: episode.id,
          name: episode.name,
          air_date: episode.air_date,
          episode: episode.episode,
          characters: characters,
          url: episode.url,
          created: episode.created,
        });
      });
    });
  }

  //TODO implement the routing through the url
  changePage(event: number) {
    this.episodes = [];
    this.currentPage = event;
    this.page = '?page=' + this.currentPage;
 
    this.getEpisodes(this.page);
  }
}

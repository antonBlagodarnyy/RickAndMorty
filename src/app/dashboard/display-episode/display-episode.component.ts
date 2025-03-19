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

  //TODO Cast the characters in to the episodes. change the type of value that is returned by the fetch
  ngOnInit() {
    this.episodeService.fetchEpisodes(this.page).subscribe((Episodes) => {
      Episodes.results.forEach((episode) => {
        let characters = [];

        episode.characters.map((characterUrl) => {
          let characterId = parseInt(
            this.functionalitiesService.getIdFromUrl(characterUrl)
          );
          this.characterService
            .fetchCharacterName(characterId)
            .subscribe((characterName) => {
             characters.push({id:characterId, name:characterName})
            });
        });
        episode.characters = characters;
        this.episodes.push(episode);
      });
    });
  }
  changePage(event: number) {
    this.episodes = [];
    this.currentPage = event;
    this.page = '?page=' + this.currentPage;
    console.log(this.page);
    this.episodeService.fetchEpisodes(this.page).subscribe((Episodes) => {
      Episodes.results.forEach((episode) => {
        this.episodes.push(episode);
      });
    });
  }
}

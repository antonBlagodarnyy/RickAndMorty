import { Component, OnInit } from '@angular/core';
import { Episode } from '../../cards/models/episode-model';
import { EpisodeService } from '../../services/episode.service';
import { EpisodeComponent } from '../../cards/episode/episode.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FunctionalitiesService } from '../../services/functionalities.service';
import { CharacterService } from '../../services/character.service';
import { SearchbarComponent } from '../searchbar/searchbar.component';

@Component({
  selector: 'app-display-episode',
  imports: [EpisodeComponent, NgxPaginationModule, SearchbarComponent],
  templateUrl: './display-episode.component.html',
  styleUrl: './display-episode.component.css',
})
export class DisplayEpisodeComponent implements OnInit {
  episodes: Episode[] = [];
  filter = false;
  filterString = '';
  totalItems = 51;
  currentPage = 1;

  constructor(
    private episodeService: EpisodeService,
    private functionalitiesService: FunctionalitiesService,
    private characterService: CharacterService
  ) {}

  ngOnInit() {
    this.getEpisodes(this.currentPage);
  }

  getEpisodes(page: number) {
    this.episodeService.fetchEpisodes(page).subscribe((Episodes) => {
      this.episodes = this.mapCharacters(Episodes.results);
    });
  }

  mapCharacters(
    episodesRaw: {
      id: number;
      name: string;
      air_date: string;
      episode: string;
      characters: string[];
      url: string;
      created: string;
    }[]
  ): Episode[] {
    let episodes: Episode[] = [];

    episodesRaw.forEach((episode) => {
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

      episodes.push({
        id: episode.id,
        name: episode.name,
        air_date: episode.air_date,
        episode: episode.episode,
        characters: characters,
        url: episode.url,
        created: episode.created,
      });
    });
    return episodes;
  }

  changePage(event: number) {
    this.episodes = [];
    this.currentPage = event;
    this.getEpisodes(this.currentPage);
  }

  filterEpisodes(name: string) {
    if (name == '') this.filter = false;
    else this.filter = true;
    this.filterString = name;
  }
}

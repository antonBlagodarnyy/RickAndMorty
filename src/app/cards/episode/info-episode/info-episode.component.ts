import { Component, input } from '@angular/core';
import { CharacterService } from '../../../services/character.service';

@Component({
  selector: 'app-info-episode',
  imports: [],
  templateUrl: './info-episode.component.html',
  styleUrl: './info-episode.component.css',
})
export class InfoEpisodeComponent {
  air_date = input();
  episode = input();
  characters = input<{ name: string; id: number }[]>();
  url = input();
  created = input();

  constructor(private characterService: CharacterService) {}

  refreshCharacter(id: number) {
    this.characterService.setId(id);
  }
}

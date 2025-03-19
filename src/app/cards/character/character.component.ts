import { CommonModule } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';

import { CharacterService } from '../../services/character.service';
import { Character } from '../models/character-model';
import { CardHeaderComponent } from '../card-header/card-header.component';
import { InfoCharacterComponent } from './info-character/info-character.component';

@Component({
  selector: 'app-character',
  imports: [CommonModule, InfoCharacterComponent, CardHeaderComponent],
  templateUrl: './character.component.html',
  styleUrl: './character.component.css',
})
export class CharacterComponent implements OnInit {
  type = 'Character';
  character= input<Character>();

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    /* this.characterService.getId.subscribe((id) => {
      this.characterService.fetchCharacter(id).subscribe((characterData) => {
        let origin = {
          name: characterData.origin.name,
          url: characterData.origin.url,
          id: parseInt(
            this.characterService.getIdFromUrl(characterData.origin.url)
          ),
        };
        let location = {
          name: characterData.location.name,
          url: characterData.location.url,
          id: parseInt(
            this.characterService.getIdFromUrl(characterData.location.url)
          ),
        };
        this.character = {
          id: characterData.id,
          name: characterData.name,
          status: characterData.status,
          species: characterData.species,
          type: characterData.type,
          gender: characterData.gender,
          origin: origin,
          location: location,
          image: characterData.image,
          episodes: characterData.episode.map((episode) => {
            return {
              url: episode,
              id: parseInt(this.characterService.getIdFromUrl(episode)),
            };
          }),
          url: characterData.url,
          created: characterData.created,
        };
      });
    }); */
  }
}

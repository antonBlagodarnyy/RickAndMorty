import { Component, input } from '@angular/core';
import { CharacterService } from '../../../services/character.service';


@Component({
  selector: 'app-info-location',
  imports: [],
  templateUrl: './info-location.component.html',
  styleUrl: './info-location.component.css',
})
export class InfoLocationComponent {
  type = input();
  dimension = input();
  residents = input<{ name: string; id: number }[]>();
  url = input();
  created = input();

  constructor(private characterService : CharacterService){}
  refreshCharacter(id:number){
    this.characterService.setId(id);
  }
}

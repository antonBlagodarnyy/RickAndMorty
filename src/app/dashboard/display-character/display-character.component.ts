import { Component, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CharacterComponent } from '../../cards/character/character.component';
import { CharacterService } from '../../services/character.service';
import { Character } from '../../cards/models/character-model';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module

@Component({
  selector: 'app-display-character',
  imports: [CharacterComponent, NgxPaginationModule],
  templateUrl: './display-character.component.html',
  styleUrl: './display-character.component.css',
})
export class DisplayCharacterComponent implements OnInit {
  characters: Character[] = [];
  currentPage = 1;
  page: string = '?page=' + this.currentPage;
  constructor(private characterService: CharacterService) {}


  ngOnInit(): void {
    this.characterService.fetchCharacters(this.page).subscribe((Characters) => {
      Characters.results.forEach((character) => {
        this.characters.push(character);
      });
    });
    
  }
  changePage(event: number){
    this.characters=[];
    this.currentPage= event;
    this.page = '?page=' + this.currentPage;
    console.log(this.page);
    this.characterService.fetchCharacters(this.page).subscribe((Characters) => {
      Characters.results.forEach((character) => {
        this.characters.push(character);
      });
    });
  }
}

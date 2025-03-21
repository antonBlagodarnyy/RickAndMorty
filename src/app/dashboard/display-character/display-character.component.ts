import {
  Component,
  input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CharacterComponent } from '../../cards/character/character.component';
import { CharacterService } from '../../services/character.service';
import { Character } from '../../cards/models/character-model';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchbarComponent } from '../searchbar/searchbar.component'; 

@Component({
  selector: 'app-display-character',
  imports: [CharacterComponent, NgxPaginationModule, SearchbarComponent],
  templateUrl: './display-character.component.html',
  styleUrl: './display-character.component.css',
})
export class DisplayCharacterComponent implements OnInit {

  characters: Character[] = [];
  filter = false;
  filterString = '';
  totalItems = 826;
  currentPage = 1;

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    this.getCharacters(this.currentPage);
  }
  getCharacters(page: number) {
    this.characterService.fetchCharacters(page).subscribe((Characters) => {
      Characters.results.forEach((character) => {
        this.characters.push(character);
      });
    });
  }
  changePage(event: number) {
    this.currentPage = event;
    this.characters = [];

    if (!this.filter) {
      this.getCharacters(this.currentPage);
    } else {
      this.characterService
        .fetchCharactersFiltered(this.currentPage, this.filterString)
        .subscribe((Characters) => {
          this.totalItems = Characters.info.count;
          Characters.results.forEach((character) => {
            this.characters.push(character);
          });
        });
    }
  }
  filterCharacters(name: string) {
    if (name == '') this.filter = false;
    else this.filter = true;
    this.filterString = name;

    this.characters = [];
    this.characterService
      .fetchCharactersFiltered(this.currentPage, this.filterString)
      .subscribe((Characters) => {
        this.totalItems = Characters.info.count;
        Characters.results.forEach((character) => {
          this.characters.push(character);
        });
      });
  }
}

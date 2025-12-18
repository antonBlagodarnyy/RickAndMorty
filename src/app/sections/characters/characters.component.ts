import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { CharacterService } from '../../services/character.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CharacterComponent } from '../../components/character/character.component';
import { PageNavComponent } from '../../components/page-nav/page-nav.component';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SearchService } from '../../services/search.service';
@Component({
  selector: 'app-characters',
  imports: [
    FormsModule,
    MatInputModule,
    MatGridListModule,
    CharacterComponent,
    PageNavComponent,
    MatDialogModule,
  ],
  template: `<div class="container">
    <mat-form-field class="searchbar" appearance="outline">
      <mat-label>Search for a character!</mat-label>
      <input matInput [(ngModel)]="searchedTerm" (keyup)="onInput()" />
    </mat-form-field>

    <app-page-nav
      [pageIndex]="characterService.pageIndex()"
      [pages]="pages()"
      [totalCharacters]="characterService.totalCharacters()"
      (pageChangeEvent)="onPageChange($event)"
    />

    <div class="container-cards">
      @for(character of characters(); track character.id){
      <app-character
        class="cards"
        [character]="character"
        (searchLocationEvent)="onSearchLocation($event)"
        (openEpisodesEvent)="onOpenEpisodes($event)"
      />
      } @empty {
      <h3>Nothing was found!</h3>
      }
    </div>

    <app-page-nav
      [pageIndex]="characterService.pageIndex()"
      [pages]="pages()"
      [totalCharacters]="characterService.totalCharacters()"
      (pageChangeEvent)="onPageChange($event)"
    />
  </div> `,
  styleUrl: '../../styles/characters.style.scss',
})
export class CharactersComponent implements OnInit {
  protected characterService = inject(CharacterService);
  private searchService = inject(SearchService);

  characters = toSignal(this.characterService.characters$, {
    initialValue: [],
  });
  pages: Signal<number[]> = computed(() => {
    const pageSize = 20;
    const pages = Math.ceil(this.characterService.totalCharacters() / pageSize);
    return Array.from({ length: pages }, (_, i) => i);
  });
  searchedTerm: string | null = null;

  ngOnInit(): void {
    const characterUrl = sessionStorage.getItem('character');
    if (characterUrl) {
      this.characterService.getSingleCharacter$(characterUrl).subscribe();
      sessionStorage.removeItem('character');
    } else this.characterService.initCharacters$().subscribe();
  }
  onPageChange(pageIndex: number) {
    this.characterService.pageIndex.set(pageIndex);
    this.characterService.updateCharacters$(this.searchedTerm).subscribe();
  }
  onInput() {
    this.characterService.pageIndex.set(0);
    this.characterService.updateCharacters$(this.searchedTerm).subscribe();
  }
  onSearchLocation($event: string) {
    this.searchService.searchLocation($event);
  }
  onOpenEpisodes($event: { urls: string[]; title: string }) {
    this.searchService.openEpisodes($event);
  }
}

import { Component, inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { CharacterService } from '../../services/character.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { DialogData } from '../../models/dialog.data-model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-dialog-character',
  imports: [MatDialogModule, MatCardModule, MatIconModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>
      <div class="container-cards">
        @for(character of characters(); track character.id){
        <mat-card class="cards">
          <mat-card-header>
            <mat-card-title>{{ character.name }}</mat-card-title
            ><button
              class="btn-search"
              mat-icon-button
              (click)="searchCharacter(character.url)"
            >
              <mat-icon>search</mat-icon>
            </button>
          </mat-card-header>
          <mat-card-content>
            <div class="card-content-info">
              <span class="card-content-info-label">Last known location:</span>
              <div class="card-content-info-search">
                <span class="card-content-info-value">{{
                  character.origin.name
                }}</span>
                @if(character.origin.name != 'unknown'){
                <button
                  class="btn-search"
                  mat-icon-button
                  (click)="searchLocation(character.origin.url)"
                >
                  <mat-icon>search</mat-icon>
                </button>
                }
              </div>

              <span class="card-content-info-label">First seen in:</span>
              <div class="card-content-info-search">
                <span class="card-content-info-value">{{
                  character.location.name
                }}</span>
                @if(character.location.name != 'unknown'){
                <button
                  class="btn-search"
                  mat-icon-button
                  (click)="searchLocation(character.location.url)"
                >
                  <mat-icon>search</mat-icon>
                </button>
                }
              </div>
            </div>
            <button
              mat-stroked-button
              (click)="
                onOpenEpisodes({
                  urls: character.episode,
                  title: character.name
                })
              "
            >
              See episodes
            </button>
          </mat-card-content>
        </mat-card>
        }@empty{
        <h3>There is no one here!</h3>
        }
      </div>
    </mat-dialog-content>
  `,
  styles: `.cards{
   
    width: 90%;
    margin:1rem;
    background-color: var(--mat-sys-surface-container)
  }
  mat-card-header{
    align-items:center;
  }
  mat-card-content{
    height: 100%;
    display: flex;
  flex-direction: column;
  justify-content: space-between;
  }
  .container-cards {
  display: flex;
  flex-direction: column;
  align-items: center;
}
  .btn-search{
    margin-left: 1rem;
  }
  .card-content-info{
  display: flex;
  flex-direction: column;
  }
 `,
})
export class DialogCharacterComponent implements OnInit {
  protected data = inject<DialogData>(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef);
  private characterService = inject(CharacterService);
  private searchService = inject(SearchService);
  characters = toSignal(this.characterService.characters$, {
    initialValue: [],
  });

  ngOnInit(): void {
    this.characterService.getCharactersFromUrls$(this.data.urls).subscribe();
  }

  searchLocation($event: string) {
    this.dialogRef.close();
    this.searchService.searchLocation($event);
  }
  searchCharacter($event: string) {
    this.dialogRef.close();
    this.searchService.searchCharacter($event);
  }
  onOpenEpisodes($event: { urls: string[]; title: string }) {
    this.dialogRef.close();
    this.searchService.openEpisodes($event);
  }
}

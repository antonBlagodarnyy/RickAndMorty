import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Character } from '../../models/character-model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-character',
  imports: [MatButtonModule, MatCardModule, MatIconModule],
  template: ` <mat-card>
    <mat-card-header>
      <mat-card-title>
        {{ character().name }}
      </mat-card-title>
      <mat-card-subtitle
        >{{ character().status }} - {{ character().species }} - ID:
        {{ character().id }}</mat-card-subtitle
      >
    </mat-card-header>

    <mat-card-content>
      <img
        mat-card-image
        src="{{ character().image }}"
        alt="{{ character().id }}"
      />
      <div class="card-content-bio">
        <div class="card-content-bio-info">
          <span class="card-content-info-label">Last known location:</span>
          <div class="card-content-info-search">
            <span class="card-content-info-value">{{
              character().origin.name
            }}</span>
            @if(character().origin.name != 'unknown'){
            <button
              mat-icon-button
              (click)="searchLocation(character().origin.url)"
            >
              <mat-icon>search</mat-icon>
            </button>
            }
          </div>

          <span class="card-content-info-label">First seen in:</span>
          <div class="card-content-info-search">
            <span class="card-content-info-value">{{
              character().location.name
            }}</span>
            @if(character().location.name != 'unknown'){
            <button
              mat-icon-button
              (click)="searchLocation(character().location.url)"
            >
              <mat-icon>search</mat-icon>
            </button>
            }
          </div>

          <span class="card-content-info-label">Type:</span>
          <span class="card-content-info-value">{{
            character().type.length > 0 ? character().type : 'unknown'
          }}</span>
          <span class="card-content-info-label">Gender:</span>
          <span class="card-content-info-value">{{ character().gender }}</span>
        </div>
        <button mat-stroked-button (click)="openEpisodes(character().episode)">
          See episodes
        </button>
      </div>
    </mat-card-content>
  </mat-card>`,
  styleUrl: '../../styles/characters.style.scss',
})
export class CharacterComponent {
  character = input.required<Character>();
  searchLocationEvent = output<string>();
  openEpisodesEvent = output<{ urls: string[]; title: string }>();

  searchLocation(location: string) {
    this.searchLocationEvent.emit(location);
  }
  openEpisodes(episodes: string[]) {
    console.log(this.character())
    this.openEpisodesEvent.emit({
      urls: episodes,
      title: this.character().name,
    });
  }
}

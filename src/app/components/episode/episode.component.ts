import { Component, input, output } from '@angular/core';
import { Episode } from '../../models/episode-model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-episode',
  imports: [MatButtonModule, MatCardModule, MatIconModule, DatePipe],
  template: `<mat-card>
    <mat-card-header>
      <mat-card-title>
        {{ episode().name }}
      </mat-card-title>
      <mat-card-subtitle
        >{{ episode().air_date | date }} - {{ episode().episode }} - ID:
        {{ episode().id }}</mat-card-subtitle
      >
    </mat-card-header>

    <mat-card-footer>
      <mat-card-actions>
        <button
          mat-stroked-button
          (click)="openCharacters(episode().characters)"
        >
          See characters
        </button>
      </mat-card-actions>
    </mat-card-footer>
  </mat-card>`,
})
export class EpisodeComponent {
  episode = input.required<Episode>();
  openCharactersEvent = output<{ urls: string[]; title: string }>();

  openCharacters(characters: string[]) {
    this.openCharactersEvent.emit({
      urls: characters,
      title: this.episode().name,
    });
  }
}

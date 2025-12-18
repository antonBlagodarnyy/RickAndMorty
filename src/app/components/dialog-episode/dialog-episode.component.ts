import { Component, inject } from '@angular/core';
import { DialogData } from '../../models/dialog.data-model';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { SearchService } from '../../services/search.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { EpisodeService } from '../../services/episode.service';
import { EpisodeComponent } from '../episode/episode.component';

@Component({
  selector: 'app-dialog-episode',
  imports: [EpisodeComponent, MatDialogTitle, MatDialogContent],
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>
      <div class="container-cards">
        @for(episode of episodes(); track episode.id){
        <app-episode
          class="cards"
          [episode]="episode"
          (openCharactersEvent)="onOpenCharacters($event)"
        />
        } @empty {
        <h3>Nothing was found!</h3>
        }
      </div>
    </mat-dialog-content>
  `,
  styles: ` .container-cards {
  display: flex;
  flex-direction: column;
  align-items: center;
}
  .cards{
    margin: 1rem;
    width: 90%;
}`,
})
export class DialogEpisodeComponent {
  protected data = inject<DialogData>(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef);
  private episodeService = inject(EpisodeService);
  private searchService = inject(SearchService);
  episodes = toSignal(this.episodeService.episodes$, {
    initialValue: [],
  });

  ngOnInit(): void {
    this.episodeService.getEpisodesFromUrls$(this.data.urls).subscribe();
  }

  onOpenCharacters($event: { urls: string[]; title: string }) {
    this.dialogRef.close();
    this.searchService.openCharacters($event);
  }
}

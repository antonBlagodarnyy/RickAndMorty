import { Component, computed, inject, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { PageNavComponent } from '../../components/page-nav/page-nav.component';
import { EpisodeService } from '../../services/episode.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { EpisodeComponent } from '../../components/episode/episode.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogCharacterComponent } from '../../components/dialog-character/dialog-character.component';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-episodes',
  imports: [
    FormsModule,
    MatInputModule,
    MatGridListModule,
    PageNavComponent,
    EpisodeComponent,
  ],
  template: `<div class="container">
    <mat-form-field class="searchbar" appearance="outline">
      <mat-label>Search for an episode!</mat-label>
      <input matInput [(ngModel)]="searchedTerm" (keyup)="onInput()" />
    </mat-form-field>

    <app-page-nav
      [pageIndex]="episodeService.pageIndex()"
      [pages]="pages()"
      [totalCharacters]="episodeService.totalEpisodes()"
      (pageChangeEvent)="onPageChange($event)"
    />

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

    <app-page-nav
      [pageIndex]="episodeService.pageIndex()"
      [pages]="pages()"
      [totalCharacters]="episodeService.totalEpisodes()"
      (pageChangeEvent)="onPageChange($event)"
    />
  </div>`,
  styles: `
  .container-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
  .cards{
    margin: 1rem;
    width: 28rem;
}`,
})
export class EpisodesComponent {
  protected episodeService = inject(EpisodeService);
  private searchService = inject(SearchService);

  episodes = toSignal(this.episodeService.episodes$, {
    initialValue: [],
  });
  pages: Signal<number[]> = computed(() => {
    const pageSize = 20;
    const pages = Math.ceil(this.episodeService.totalEpisodes() / pageSize);
    return Array.from({ length: pages }, (_, i) => i);
  });
  searchedTerm: string | null = null;

  ngOnInit(): void {
    this.episodeService.initEpisodes$().subscribe();
  }
  onPageChange(pageIndex: number) {
    this.episodeService.pageIndex.set(pageIndex);
    this.episodeService.updateEpisodes$(this.searchedTerm).subscribe();
  }
  onInput() {
    this.episodeService.pageIndex.set(0);
    this.episodeService.updateEpisodes$(this.searchedTerm).subscribe();
  }
  onOpenCharacters($event: { urls: string[]; title: string }) {
    this.searchService.openCharacters($event);
  }
}

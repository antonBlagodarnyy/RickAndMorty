import { Component, computed, inject, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { LocationComponent } from '../../components/location/location.component';
import { PageNavComponent } from '../../components/page-nav/page-nav.component';
import { LocationService } from '../../services/location.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-locations',
  imports: [
    FormsModule,
    MatInputModule,
    MatGridListModule,
    LocationComponent,
    PageNavComponent,
  ],
  template: `<div class="container">
    <mat-form-field class="searchbar" appearance="outline">
      <mat-label>Search for a location!</mat-label>
      <input matInput [(ngModel)]="searchedTerm" (keyup)="onInput()" />
    </mat-form-field>

    <app-page-nav
      [pageIndex]="locationService.pageIndex()"
      [pages]="pages()"
      [totalCharacters]="locationService.totalLocations()"
      (pageChangeEvent)="onPageChange($event)"
    />

    <div class="container-cards">
      @for(location of locations(); track location.id){
      <app-location
        class="cards"
        [location]="location"
        (openResidentsEvent)="openResidents($event)"
      />
      } @empty {
      <h3>Nothing was found!</h3>
      }
    </div>

    <app-page-nav
      [pageIndex]="locationService.pageIndex()"
      [pages]="pages()"
      [totalCharacters]="locationService.totalLocations()"
      (pageChangeEvent)="onPageChange($event)"
    />
  </div> `,
  styles: `
  .container-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
  .cards{
    margin: 1rem;
    width: 25rem;
}`,
})
export class LocationsComponent {
  protected locationService = inject(LocationService);
  private searchService = inject(SearchService);
  locations = toSignal(this.locationService.locations$, {
    initialValue: [],
  });
  pages: Signal<number[]> = computed(() => {
    const pageSize = 20;
    const pages = Math.ceil(this.locationService.totalLocations() / pageSize);
    return Array.from({ length: pages }, (_, i) => i);
  });
  searchedTerm: string | null = null;

  ngOnInit(): void {
    const locationUrl = sessionStorage.getItem('location');
    if (locationUrl) {
      this.locationService.getSingleLocation$(locationUrl).subscribe();
      sessionStorage.removeItem('location');
    } else this.locationService.initLocations$().subscribe();
  }
  onPageChange(pageIndex: number) {
    this.locationService.pageIndex.set(pageIndex);
    this.locationService.updateLocations$(this.searchedTerm).subscribe();
  }
  onInput() {
    this.locationService.pageIndex.set(0);
    this.locationService.updateLocations$(this.searchedTerm).subscribe();
  }

  openResidents($event: { urls: string[]; title: string }) {
    this.searchService.openCharacters($event);
  }
}

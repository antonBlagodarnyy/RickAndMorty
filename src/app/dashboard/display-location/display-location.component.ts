import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { Location } from '../../cards/models/location-model';
import { FunctionalitiesService } from '../../services/functionalities.service';
import { CharacterService } from '../../services/character.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { LocationComponent } from '../../cards/location/location.component';

@Component({
  selector: 'app-display-location',
  imports: [LocationComponent, NgxPaginationModule],
  templateUrl: './display-location.component.html',
  styleUrl: './display-location.component.css',
})
export class DisplayLocationComponent implements OnInit {
  locations: Location[] = [];
  currentPage = 1;
  page: string = '?page=' + this.currentPage;

  constructor(
    private locationService: LocationService,
    private functionalitiesService: FunctionalitiesService,
    private characterService: CharacterService
  ) {}

  ngOnInit(): void {
    this.getLocations(this.page);
  }

  getLocations(page: string) {
    this.locationService.fetchLocations(page).subscribe((Locations) => {
      Locations.results.forEach((location) => {
        let residents: { id: number; name: string }[] = [];

        location.residents.map((residentUrl) => {
          let residentId = parseInt(
            this.functionalitiesService.getIdFromUrl(residentUrl)
          );
          this.characterService
            .fetchCharacterName(residentId)
            .subscribe((residentName) => {
              residents.push({ id: residentId, name: residentName });
            });
        });
        this.locations.push({
          id: location.id,
          name: location.name,
          type: location.type,
          dimension: location.dimension,
          residents: residents,
          url: location.url,
          created: location.created,
        });
      });
    });
  }

  //TODO implement the routing through the url
  changePage(event: number) {
    this.locations = [];
    this.currentPage = event;
    this.page = '?page=' + this.currentPage;

    this.getLocations(this.page);
  }
}

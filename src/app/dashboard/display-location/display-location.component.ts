import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { Location } from '../../cards/models/location-model';
import { FunctionalitiesService } from '../../services/functionalities.service';
import { CharacterService } from '../../services/character.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { LocationComponent } from '../../cards/location/location.component';
import { SearchbarComponent } from '../searchbar/searchbar.component';

@Component({
  selector: 'app-display-location',
  imports: [LocationComponent, NgxPaginationModule, SearchbarComponent],
  templateUrl: './display-location.component.html',
  styleUrl: './display-location.component.css',
})
export class DisplayLocationComponent implements OnInit {
  locations: Location[] = [];
  filter = false;
  filterString = '';
  totalItems = 126;
  currentPage = 1;

  constructor(
    private locationService: LocationService,
    private functionalitiesService: FunctionalitiesService,
    private characterService: CharacterService
  ) {}

  ngOnInit(): void {
    this.getLocations(this.currentPage);
  }

  getLocations(page: number) {
    this.locationService.fetchLocations(page).subscribe((Locations) => {
      this.locations = this.mapResidents(Locations.results);
    });
  }
  mapResidents(
    locationsRaw: {
      id: number;
      name: string;
      type: string;
      dimension: string;
      residents: string[];
      url: string;
      created: string;
    }[]
  ): Location[] {
    let locations: Location[] = [];
    locationsRaw.forEach((location) => {
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
      locations.push({
        id: location.id,
        name: location.name,
        type: location.type,
        dimension: location.dimension,
        residents: residents,
        url: location.url,
        created: location.created,
      });
    });
    return locations;
  }

  changePage(event: number) {
    this.locations = [];
    this.currentPage = event;

    if (!this.filter) {
      this.getLocations(this.currentPage);
    } else {
      this.locationService
        .fetchLocationsFiltered(this.currentPage, this.filterString)
        .subscribe((Location) => {
          this.totalItems = Location.info.count;
          this.locations = this.mapResidents(Location.results);
        });
    }
  }

  filterLocation(name: string) {
    if (name == '') this.filter = false;
    else this.filter = true;
    this.filterString = name;

    this.locations = [];
    this.locationService
      .fetchLocationsFiltered(this.currentPage, this.filterString)
      .subscribe((Locations) => {
        this.totalItems = Locations.info.count;
        this.locations = this.mapResidents(Locations.results);
      });
  }
}

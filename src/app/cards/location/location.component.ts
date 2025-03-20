import { Component, input, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { Location } from '../models/location-model';
import { CardHeaderComponent } from '../card-header/card-header.component';
import { InfoLocationComponent } from './info-location/info-location.component';
import { CharacterService } from '../../services/character.service';
import { FunctionalitiesService } from '../../services/functionalities.service';
@Component({
  selector: 'app-location',
  imports: [CardHeaderComponent, InfoLocationComponent],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css',
})
export class LocationComponent implements OnInit {
  type = 'Location';
  location = input<Location>();


  constructor(
    private locationService: LocationService,
    private characterService: CharacterService,
    private functionalitiesService: FunctionalitiesService
  ) {}

  ngOnInit(): void {
   /*  this.locationService.getId.subscribe((id) => {
      this.locationService.getLocation(id).subscribe((locationData) => {
        this.location = {
          id: locationData.id,
          name: locationData.name,
          type: locationData.type,
          dimension: locationData.dimension,
          url: locationData.url,
          created: locationData.created,
        };

        this.residents = [];
        locationData.residents.forEach((residenteUrl) => {
          let id = parseInt(this.functionalitiesService.getIdFromUrl(residenteUrl));
          this.characterService
            .fetchCharacterName(id)
            .subscribe((residentName) => {
              this.residents.push({ name: residentName, id: id });
            });
        });
      });
    }); */
  }
}

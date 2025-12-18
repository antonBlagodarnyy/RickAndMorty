import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogCharacterComponent } from '../components/dialog-character/dialog-character.component';
import { LocationService } from './location.service';
import { CharacterService } from './character.service';
import { DialogEpisodeComponent } from '../components/dialog-episode/dialog-episode.component';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private router: Router) {}
  private locationService = inject(LocationService);
  private characterService = inject(CharacterService);

  private dialogRef = inject(MatDialog);
  searchLocation(location: string) {
    if (this.router.url == '/locations')
      this.locationService.getSingleLocation$(location).subscribe();
    else {
      sessionStorage.setItem('location', location);
      this.router.navigate(['/locations']);
    }
  }
  searchCharacter(character: string) {
    if (this.router.url == '/characters')
      this.characterService.getSingleCharacter$(character).subscribe();
    else {
      sessionStorage.setItem('character', character);
      this.router.navigate(['/characters']);
    }
  }
  openCharacters($event: { urls: string[]; title: string }) {
    this.dialogRef.open(DialogCharacterComponent, {
      data: $event,
    });
  }
  openEpisodes($event: { urls: string[]; title: string }) {
    this.dialogRef.open(DialogEpisodeComponent, {
      data: $event,
    });
  }
}

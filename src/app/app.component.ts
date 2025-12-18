import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [MatTabsModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <h1 class="banner">Rick and Morty data!</h1>

    <nav mat-tab-nav-bar [tabPanel]="tabPanel">
      <a
        mat-tab-link
        [routerLink]="['/characters']"
        routerLinkActive
        #rlaCharacter="routerLinkActive"
        [active]="rlaCharacter.isActive"
        >Characters</a
      >
      <a
        mat-tab-link
        [routerLink]="['/locations']"
        routerLinkActive
        #rlaLocations="routerLinkActive"
        [active]="rlaLocations.isActive"
        >Locations</a
      >
      <a
        mat-tab-link
        [routerLink]="['/episodes']"
        routerLinkActive
        #rlaEpisodes="routerLinkActive"
        [active]="rlaEpisodes.isActive"
        >Episodes</a
      >
    </nav>
    <mat-tab-nav-panel #tabPanel><router-outlet /></mat-tab-nav-panel>
  `,
})
export class AppComponent {
  title = 'RICK AND MORTY DATA';
}

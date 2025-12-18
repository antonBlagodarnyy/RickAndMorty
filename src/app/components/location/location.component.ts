import { Location } from '../../models/location-model';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-location',
  imports: [MatButtonModule, MatCardModule, MatIconModule],
  template: `<mat-card>
    <mat-card-header>
      <mat-card-title>
        {{ location().name }}
      </mat-card-title>
      <mat-card-subtitle
        >{{ location().type }} - {{ location().dimension }} - ID:
        {{ location().id }}</mat-card-subtitle
      >
    </mat-card-header>

    <mat-card-footer>
      <mat-card-actions>
        <button
          mat-stroked-button
          (click)="openResidents(location().residents)"
        >
          See residents
        </button>
      </mat-card-actions>
    </mat-card-footer>
  </mat-card>`,
})
export class LocationComponent {
  location = input.required<Location>();
  openResidentsEvent = output<{ urls: string[]; title: string }>();

  openResidents(residents: string[]) {
    this.openResidentsEvent.emit({
      urls: residents,
      title: this.location().name,
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocationService {
  private id = new BehaviorSubject(Math.floor(Math.random() * 126));
  getId = this.id.asObservable();

  constructor(private http: HttpClient) {}

  fetchLocations(page: string) {
    return this.http.get<{
      results: {
        id: number;
        name: string;
        type: string;
        dimension: string;
        residents: string[];
        url: string;
        created: string;
      }[];
    }>('https://rickandmortyapi.com/api/location/' + page);
  }

  getLocation(id: number) {
    return this.http.get<{
      id: number;
      name: string;
      type: string;
      dimension: string;
      residents: Array<string>;
      url: string;
      created: string;
    }>('https://rickandmortyapi.com/api/location/' + id);
  }
  setId(id: number) {
    this.id.next(id);
  }
}

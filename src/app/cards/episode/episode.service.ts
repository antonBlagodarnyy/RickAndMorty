import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EpisodeService {
  private id = new BehaviorSubject(Math.floor(Math.random() * 51));
  getId = this.id.asObservable();

  constructor(private http: HttpClient) {}

  fetchEpisode(id: number) {
    return this.http.get<{
      id: number;
      name: string;
      air_date: string;
      episode: string;
      characters: Array<string>;
      url: string;
      created: string;
    }>('https://rickandmortyapi.com/api/episode/' + id);
  }
  setId(id: number) {
    this.id.next(id);
  }
}

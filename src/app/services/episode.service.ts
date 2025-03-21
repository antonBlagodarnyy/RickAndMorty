import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Episode } from '../cards/models/episode-model';

@Injectable({ providedIn: 'root' })
export class EpisodeService {
  private id = new BehaviorSubject(Math.floor(Math.random() * 51));
  getId = this.id.asObservable();

  constructor(private http: HttpClient) {}

  fetchEpisodes(page: number) {
    return this.http.get<{
      results: {
        id: number;
        name: string;
        air_date: string;
        episode: string;
        characters: string[];
        url: string;
        created: string;
      }[];
    }>('https://rickandmortyapi.com/api/episode/?page=' + page);
  }

  fetchEpisodesFiltered(page: number, name: string) {
    return this.http.get<{
      results: {
        id: number;
        name: string;
        air_date: string;
        episode: string;
        characters: string[];
        url: string;
        created: string;
      }[];
      info: { count: number };
    }>(
      'https://rickandmortyapi.com/api/episode/?page=' +
        page +
        '&name=' +
        name
    );
  }

  fetchEpisode(id: number) {
    return this.http.get<{
      id: number;
      name: string;
      air_date: string;
      episode: string;
      characters: string[];
      url: string;
      created: string;
    }>('https://rickandmortyapi.com/api/episode/' + id);
  }
  setId(id: number) {
    this.id.next(id);
  }
}

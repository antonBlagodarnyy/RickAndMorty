import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, map } from 'rxjs';
import { Character } from '../cards/models/character-model';

@Injectable({ providedIn: 'root' })
export class CharacterService {
  private id = new BehaviorSubject(Math.floor(Math.random() * 826));
  getId = this.id.asObservable();

  constructor(private http: HttpClient) {}
  fetchCharacters(page: string) {
    return this.http.get<{ results: Character[] }>(
      'https://rickandmortyapi.com/api/character/' + page
    );
  }

  fetchCharactersFiltered( name: string) {
    console.log("fetching")
    return this.http.get<{ results: Character[] }>(
      'https://rickandmortyapi.com/api/character/' +name
    );
  }

  fetchCharacter(id: number) {
    return this.http.get<{
      id: number;
      name: string;
      status: string;
      species: string;
      type: string;
      gender: string;
      origin: { name: string; url: string };
      location: { name: string; url: string };
      image: string;
      episode: Array<string>;
      url: string;
      created: string;
    }>('https://rickandmortyapi.com/api/character/' + id);
  }
  fetchCharacterName(id: number) {
    return this.http
      .get<{ name: string }>(`https://rickandmortyapi.com/api/character/${id}`)
      .pipe(map((response) => response.name));
  }

  setId(id: number) {
    this.id.next(id);
  }
}

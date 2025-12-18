import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  EMPTY,
  from,
  mergeMap,
  tap,
  throwError,
  toArray,
} from 'rxjs';
import { Character } from '../models/character-model';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class CharacterService {
  private router = inject(Router);
  private charactersSubject = new BehaviorSubject<Character[]>([]);
  characters$ = this.charactersSubject.asObservable();

  totalCharacters = signal<number>(0);
  pageIndex = signal<number>(0);
  constructor(private http: HttpClient) {}

  initCharacters$() {
    return this.http
      .get<{ info: { count: number }; results: Character[] }>(
        environment.apiUrl + 'character/'
      )
      .pipe(
        tap((res) => {
          this.charactersSubject.next(res.results);
          this.totalCharacters.set(res.info.count);
        })
      );
  }

  updateCharacters$(name: string | null) {
    return this.http
      .get<{ results: Character[]; info: { count: number } }>(
        environment.apiUrl +
          'character/?page=' +
          (this.pageIndex() + 1) +
          (name ? '&name=' + name : '')
      )
      .pipe(
        tap((res) => {
          this.charactersSubject.next(res.results);
          this.totalCharacters.set(res.info.count);
        }),
        catchError((err: HttpErrorResponse) => {
          if (err.status == 404) {
            this.charactersSubject.next([]);
            return EMPTY;
          }
          return throwError(() => new Error('Error in source: ' + err));
        })
      );
  }

  getCharactersFromUrls$(urls: string[]) {
    return from(urls).pipe(
      mergeMap((url) => this.http.get<Character>(url)),
      toArray(),
      tap((characters) => this.charactersSubject.next(characters))
    );
  }
  getSingleCharacter$(url: string) {
    return this.http.get<Character>(url).pipe(
      tap((c) => {
        this.charactersSubject.next([c]);
      })
    );
  }
}

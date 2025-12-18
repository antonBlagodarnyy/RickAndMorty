import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, EMPTY, from, mergeMap, tap, throwError, toArray } from 'rxjs';
import { Episode } from '../models/episode-model';
import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class EpisodeService {
  private episodesSubject = new BehaviorSubject<Episode[]>([]);
  episodes$ = this.episodesSubject.asObservable();

  totalEpisodes = signal<number>(0);
  pageIndex = signal<number>(0);
  constructor(private http: HttpClient) {}

  initEpisodes$() {
    return this.http
      .get<{ info: { count: number }; results: Episode[] }>(
        environment.apiUrl + 'episode/'
      )
      .pipe(
        tap((res) => {
          this.episodesSubject.next(res.results);
          this.totalEpisodes.set(res.info.count);
        })
      );
  }

  updateEpisodes$(name: string | null) {
    return this.http
      .get<{
        results: Episode[];
        info: { count: number };
      }>(
        environment.apiUrl +
          'episode/?page=' +
          (this.pageIndex() + 1) +
          (name ? '&name=' + name : '')
      )
      .pipe(
        tap((res) => {
          this.episodesSubject.next(res.results);
          this.totalEpisodes.set(res.info.count);
        }),
        catchError((err: HttpErrorResponse) => {
          if (err.status == 404) {
            this.episodesSubject.next([]);
            return EMPTY;
          }
          return throwError(() => new Error('Error in source: ' + err));
        })
      );
  }
  getEpisodesFromUrls$(urls: string[]) {
    console.log(urls)
      return from(urls).pipe(
        mergeMap((url) => this.http.get<Episode>(url)),
        toArray(),
        tap((e) => this.episodesSubject.next(e))
      );
    }
}

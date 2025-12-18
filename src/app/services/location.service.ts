import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Location } from '../models/location-model';
@Injectable({ providedIn: 'root' })
export class LocationService {
  private locationsSubject = new BehaviorSubject<Location[]>([]);
  locations$ = this.locationsSubject.asObservable();

  totalLocations = signal<number>(0);
  pageIndex = signal<number>(0);
  constructor(private http: HttpClient) {}

  initLocations$() {
    return this.http
      .get<{ info: { count: number }; results: Location[] }>(
        environment.apiUrl + 'location/'
      )
      .pipe(
        tap((res) => {
          this.locationsSubject.next(res.results);
          this.totalLocations.set(res.info.count);
        })
      );
  }

  updateLocations$(name: string | null) {
    return this.http
      .get<{
        results: Location[];
        info: { count: number };
      }>(
        environment.apiUrl +
          'location/?page=' +
          (this.pageIndex() + 1) +
          (name ? '&name=' + name : '')
      )
      .pipe(
        tap((res) => {
          this.locationsSubject.next(res.results);
          this.totalLocations.set(res.info.count);
        }),
        catchError((err: HttpErrorResponse) => {
          if (err.status == 404) {
            this.locationsSubject.next([]);
            return EMPTY;
          }
          return throwError(() => new Error('Error in source: ' + err));
        })
      );
  }
  getSingleLocation$(url: string) {
    return this.http.get<Location>(url).pipe(
      tap((loc) => {
        this.locationsSubject.next([loc]);
      })
    );
  }
}

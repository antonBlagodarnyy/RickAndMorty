import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FunctionalitiesService {

  getIdFromUrl(url: string): string {
    return url.split('/').pop() || '';
  }
}

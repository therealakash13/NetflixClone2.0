import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { MovieContent } from '../models/movie-content';

@Injectable({
  providedIn: 'root',
})
export class ShareDataService {
  private dataSubject: ReplaySubject<MovieContent> =
    new ReplaySubject<MovieContent>(1);
  constructor() {}

  setData(data: MovieContent): void {
    this.dataSubject.next(data);
  }

  getData$(): Observable<MovieContent> {
    return this.dataSubject.asObservable();
  }
}

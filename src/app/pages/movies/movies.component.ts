import { Component, NgZone } from '@angular/core';
import { FetchDataService } from '../../services/fetch-data.service';
import { MovieContent } from '../../models/movie-content';
import { CommonModule, NgStyle } from '@angular/common';
import { Router } from '@angular/router';
import { GridComponent } from '../../components/grid/grid.component';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, GridComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent {
  movieData: MovieContent[] = [];
  page: number = 1;

  constructor(private fetch: FetchDataService, private ngZone: NgZone) {}

  nextPage() {
    this.ngZone.run(() => {
      this.page++;
    });
    this.fetchData(this.page);
  }

  previousPage() {
    this.ngZone.run(() => {
      this.page--;
    });
    this.fetchData(this.page);
  }

  fetchData(page: number) {
    this.fetch.getMovies(page).subscribe((data: any) => {
      this.movieData = data.results;
      // console.log(this.movieData);
    });
  }
  ngOnInit() {
    this.fetchData(this.page);
  }
}

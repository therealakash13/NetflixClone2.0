import { Component, NgZone } from '@angular/core';
import { MovieContent } from '../../models/movie-content';
import { FetchDataService } from '../../services/fetch-data.service';
import { CommonModule } from '@angular/common';
import { GridComponent } from '../../components/grid/grid.component';

@Component({
  selector: 'app-popular',
  standalone: true,
  imports: [CommonModule, GridComponent],
  templateUrl: './popular.component.html',
  styleUrl: './popular.component.css',
})
export class PopularComponent {
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
    this.fetch.getPopularMovies(page).subscribe((data: any) => {
      this.movieData = data.results;
      // console.log(this.movieData);
    });
  }
  ngOnInit() {
    this.fetchData(this.page);
  }
}

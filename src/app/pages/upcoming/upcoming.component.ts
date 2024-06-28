import { CommonModule } from '@angular/common';
import { Component, NgZone } from '@angular/core';
import { GridComponent } from '../../components/grid/grid.component';
import { FetchDataService } from '../../services/fetch-data.service';
import { MovieContent } from '../../models/movie-content';

@Component({
  selector: 'app-upcoming',
  standalone: true,
  imports: [CommonModule, GridComponent],
  templateUrl: './upcoming.component.html',
  styleUrl: './upcoming.component.css',
})
export class UpcomingComponent {
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
    this.fetch.getUpcomingMovies(page).subscribe((data: any) => {
      this.movieData = data.results;
      // console.log(this.movieData);
    });
  }
  ngOnInit() {
    this.fetchData(this.page);
  }
}

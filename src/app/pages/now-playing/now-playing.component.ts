import { Component, NgZone } from '@angular/core';
import { FetchDataService } from '../../services/fetch-data.service';
import { MovieContent } from '../../models/movie-content';
import { CommonModule } from '@angular/common';
import { GridComponent } from '../../components/grid/grid.component';

@Component({
  selector: 'app-now-playing',
  standalone: true,
  imports: [CommonModule, GridComponent],
  templateUrl: './now-playing.component.html',
  styleUrl: './now-playing.component.css',
})
export class NowPlayingComponent {
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
    this.fetch.getNowPlaying(page).subscribe((data: any) => {
      this.movieData = data.results;
      // console.log(this.movieData);
    });
  }
  ngOnInit() {
    this.fetchData(this.page);
  }
}

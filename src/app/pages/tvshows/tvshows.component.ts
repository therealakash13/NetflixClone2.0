import { Component, NgZone } from '@angular/core';
import { FetchDataService } from '../../services/fetch-data.service';
import { TvContent } from '../../models/tv-content';
import { GridComponent } from '../../components/grid/grid.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tvshows',
  standalone: true,
  imports: [GridComponent, CommonModule],
  templateUrl: './tvshows.component.html',
  styleUrl: './tvshows.component.css',
})
export class TvshowsComponent {
  tvData: TvContent[] = [];
  page: number = 1;

  constructor(
    private fetch: FetchDataService,
    private ngZone: NgZone,
    private router: Router
  ) {}

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

  navigateToWatch(id: number) {
    this.router.navigate(['/watch', id]);
  }

  fetchData(page: number) {
    this.fetch.getTvShows(page).subscribe((data: any) => {
      this.tvData = data.results;
    });
  }

  ngOnInit() {
    this.fetchData(this.page);
  }
}

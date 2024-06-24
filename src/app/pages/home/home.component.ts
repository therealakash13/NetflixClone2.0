import { Component } from '@angular/core';

import { NavbarComponent } from '../../components/navbar/navbar.component';
import { BannerComponent } from '../../components/banner/banner.component';

import { SwiperComponent } from '../../components/swiper/swiper.component';
import { MovieContent } from '../../models/movie-content';
import { FetchDataService } from '../../services/fetch-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, BannerComponent, SwiperComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  topPicks: MovieContent[] = [];
  constructor(private fetch: FetchDataService) {}
  fetchData() {
    this.fetch.getTopPicks().subscribe((data: any) => {
      this.topPicks = data.results;
      // console.log(this.topPicks);
    });
  }
  ngOnInit(): void {
    this.fetchData();
  }
}

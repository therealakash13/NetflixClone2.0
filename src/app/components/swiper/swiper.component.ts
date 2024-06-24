import { Component, Input, SimpleChanges } from '@angular/core';
import { MovieContent } from '../../models/movie-content';
import { CommonModule } from '@angular/common';
import { DescriptionPipe } from '../../pipes/description.pipe';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ShareDataService } from '../../services/share-data.service';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-swiper',
  standalone: true,
  imports: [
    CommonModule,
    DescriptionPipe,
    CarouselModule,
    ButtonModule,
    TagModule,
    TooltipModule,
  ],
  templateUrl: './swiper.component.html',
  styleUrl: './swiper.component.css',
})
export class SwiperComponent {
  @Input({ required: true }) bannerData: MovieContent[] = [];

  ngOnChanges(changes: SimpleChanges) {}

  responsiveOptions: any[] | undefined;

  constructor(private shareData: ShareDataService) {}

  ngOnInit(): void {
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 8,
        numScroll: 8,
      },
      {
        breakpoint: '991px',
        numVisible: 4,
        numScroll: 4,
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1,
      },
    ];
  }

  clickedCard(movie: MovieContent) {
    this.shareData.setData(movie);
  }
}

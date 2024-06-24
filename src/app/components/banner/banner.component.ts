import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';

import { Subject, takeUntil } from 'rxjs';
import { ShareDataService } from '../../services/share-data.service';
import { DescriptionPipe } from '../../pipes/description.pipe';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [DescriptionPipe],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css',
})
export class BannerComponent implements OnChanges, OnInit, OnDestroy {
  receivedData: any = {
    adult: false,
    backdrop_path: '/zfbjgQE1uSd9wiPTX4VzsLi0rGG.jpg',
    genre_ids: [18, 80],
    id: 278,
    original_language: 'en',
    original_title: 'The Shawshank Redemption',
    overview:
      'Imprisoned in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.',
    popularity: 176.351,
    poster_path: '/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg',
    release_date: '1994-10-14',
    title: 'The Shawshank Redemption',
    video: false,
    vote_average: 8.705,
    vote_count: 26355,
  };

  private unsubscribe = new Subject<void>();
  constructor(private shareData: ShareDataService) {}

  ngOnChanges(changes: SimpleChanges) {}

  ngOnInit(): void {
    this.shareData
      .getData$()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((data) => {
        this.receivedData = data;
        console.log(this.receivedData);
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}

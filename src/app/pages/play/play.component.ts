import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchDataService } from '../../services/fetch-data.service';

import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { VideoDetail } from '../../models/video-detail';
import { TooltipModule } from 'primeng/tooltip';
import { DurationPipe } from '../../pipes/duration.pipe';
import { from } from 'rxjs';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [CommonModule, TooltipModule, DurationPipe],
  templateUrl: './play.component.html',
  styleUrl: './play.component.css',
})
export class PlayComponent implements OnInit {
  private sanitizer = inject(DomSanitizer);
  fetch = inject(FetchDataService);

  videoDetails: any;
  videoData: any;
  tvData: any;
  videoKey: string = '';
  videoUrl: any;
  resultLength: number = 0;
  mappedVideoData: any;
  selectedTag: string = 'Trailer';
  selectedData: any;
  from: string | null = '';

  constructor(
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    fetch: FetchDataService
  ) {}

  clicked(event: any): void {
    this.selectedTag = event.target.id;
    this.selectedData = this.mappedVideoData[this.selectedTag];
  }

  setKey(key: string) {
    this.cdr.detectChanges();
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${key}?autoplay=0&mute=0&loop=0&controls=1&rel=0`
    );
  }

  fetchMovieDetails(id: any) {
    this.fetch.getVideo(id!).subscribe((data) => {
      this.videoData = data;
      // console.log(this.videoData);

      this.sorter(this.videoData.results);
    });
    this.fetch.getMovieDetail(id!).subscribe((data) => {
      this.videoDetails = data;
      // console.log(this.videoDetails);
    });
  }

  fetchTvDetails(id: any) {
    this.fetch.getTvDetail(id!).subscribe((data) => {
      this.tvData = data;
      console.log(this.tvData);

      this.fetch.getTvVideos(this.tvData.id!).subscribe((data) => {
        // console.log(data);
        this.sorter(data.results);
      });
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.from = params.get('from');

      if (this.from === 'tv') {
        this.fetchTvDetails(id);
      } else if (this.from === 'movie') {
        this.fetchMovieDetails(id);
      }
    });
  }

  sorter(video: any) {
    const videos = ([] = video);

    // Sort the array based on the type field
    videos.sort((a: any, b: any) => {
      if (a.type < b.type) return -1;
      if (a.type > b.type) return 1;
      return 0;
    });

    // Map the sorted array to another object with types as keys
    const mappedVideos = videos.reduce((acc: any, video: any) => {
      if (!acc[video.type]) {
        acc[video.type] = [];
      }
      acc[video.type].push(video);
      return acc;
    }, {});
    this.mappedVideoData = mappedVideos;
    // console.log(this.mappedVideoData);
  }
}

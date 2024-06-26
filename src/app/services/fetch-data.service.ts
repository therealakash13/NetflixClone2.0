import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

const options = {
  params: {
    include_adults: 'false',
    includE_videos: 'true',
    language: 'en-US',
    sort_by: 'popularity.desc',

    region: 'IN',
  },
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOTgzYWNlOTUzYTE3ZTE0MDEyYjJmMzk3ZTk5OTk0OSIsInN1YiI6IjY2NmFiNmQxNDgzN2NlYmFhZWE3NTAyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DoTLW9x91irvjY7GU1PmNItAe723uxyr4fhKO1mt-Ck',
  },
};

@Injectable({
  providedIn: 'root',
})
export class FetchDataService {
  http = inject(HttpClient);
  constructor() {}

  getTopPicks() {
    return this.http.get<any>(
      'https://api.themoviedb.org/3/movie/top_rated',
      options
    );
  }

  getBannerImage() {
    return this.http.get<any>(
      'https://api.themoviedb.org/3/movie/575264/images',
      options
    );
  }

  getMovieDetail(id: string) {
    return this.http.get<any>(
      `https://api.themoviedb.org/3/movie/${id}`,
      options
    );
  }

  getTvDetail(id: string) {
    return this.http.get<any>(`https://api.themoviedb.org/3/tv/${id}`, options);
  }

  getUpcomingMovies() {
    return this.http.get<any>(
      'https://api.themoviedb.org/3/movie/upcoming',
      options
    );
  }

  getPopularMovies() {
    return this.http.get<any>(
      'https://api.themoviedb.org/3/movie/popular',
      options
    );
  }

  getVideo(id: string) {
    return this.http.get<any>(
      `https://api.themoviedb.org/3/movie/${id}/videos`,
      options
    );
  }

  getMovies(page?: number) {
    return this.http.get<any>(
      `https://api.themoviedb.org/3/discover/movie?page=${page}`,
      options
    );
  }

  getTvShows(page?: number) {
    return this.http.get<any>(
      `https://api.themoviedb.org/3/discover/tv?page=${page}`,
      options
    );
  }

  getNowPlaying() {
    return this.http.get<any>(
      'https://api.themoviedb.org/3/movie/now_playing',
      options
    );
  }
}

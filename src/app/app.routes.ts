import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { TvshowsComponent } from './pages/tvshows/tvshows.component';
import { NowPlayingComponent } from './pages/now-playing/now-playing.component';
import { PopularComponent } from './pages/popular/popular.component';
import { UpcomingComponent } from './pages/upcoming/upcoming.component';
import { PlayComponent } from './pages/play/play.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'tvshows', component: TvshowsComponent },
  { path: 'nowplaying', component: NowPlayingComponent },
  { path: 'popular', component: PopularComponent },
  { path: 'upcoming', component: UpcomingComponent },
  { path: 'watch/:id', component: PlayComponent },
];

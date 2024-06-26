import { Component, Input, input } from '@angular/core';
import { MovieContent } from '../../models/movie-content';
import { Router } from '@angular/router';
import { TvContent } from '../../models/tv-content';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css',
})
export class GridComponent {
  @Input() movies: MovieContent[] = [];
  @Input() tv: TvContent[] = [];

  constructor(private router: Router) {}

  navigateToWatch(id: number) {
    this.router.navigate(['/watch', id]);
  }
}

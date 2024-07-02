import { Component, Input, input } from '@angular/core';
import { MovieContent } from '../../models/movie-content';
import { Router } from '@angular/router';
import { TvContent } from '../../models/tv-content';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css',
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class GridComponent {
  @Input() movies: MovieContent[] = [];
  @Input() tv: TvContent[] = [];

  constructor(private router: Router) {}

  navigateToWatch(id: number, from: string) {
    this.router.navigate(['/watch', from, id]);
  }
}

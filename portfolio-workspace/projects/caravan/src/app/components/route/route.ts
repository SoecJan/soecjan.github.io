import { ChangeDetectionStrategy, Component, OnInit, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { RouteElement } from '../../types/route.types';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { filter, interval, map, Observable, of, take, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-route',
  imports: [CommonModule, FormsModule, MatCardModule, MatDividerModule, MatButtonModule, MatProgressBarModule],
  templateUrl: './route.html',
  styleUrl: './route.scss',
})
export class Route implements OnInit {

  routeChosen = output<RouteElement | undefined>();
  routes: RouteElement[] = []
  routeHistory: RouteElement[] = []
  value: Observable<number> = of(100);
  currentLocation: RouteElement | undefined;

  ngOnInit(): void {
    const routeA: RouteElement = {
      name: 'Route A',
      type: 'Straße',
      distance: 13.5,
      terrain: 'Ebene',
      travelTime: 1.3
    };
    const routeB: RouteElement = {
      name: 'Route B',
      type: 'See',
      distance: 5,
      terrain: 'Meer',
      travelTime: 5.7
    };
    const routeC: RouteElement = {
      name: 'Route C',
      type: 'Wald',
      distance: 8.3,
      terrain: 'Hügel',
      travelTime: 3.5
    };

    this.routes.push(routeA);
    this.routes.push(routeB);
    this.routes.push(routeC);
  }

  chooseRoute(route: RouteElement) {
    this.routeChosen.emit(undefined);
    this.value = interval(100).pipe(
      take(101),
      tap((travelValue) => {
        if (travelValue === 100) {
          this.routeChosen.emit(route);
          if (this.currentLocation) this.routeHistory.push(this.currentLocation);
          this.currentLocation = route;
        }
      })
    );
  }
}

import { ChangeDetectionStrategy, Component, OnInit, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { RouteElement } from '../../types/route.types';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-route',
  imports: [MatCardModule, MatDividerModule, MatButtonModule],
  templateUrl: './route.html',
  styleUrl: './route.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Route implements OnInit {

  routeChosen = output<RouteElement>();
  routes: RouteElement[] = []
  
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
    this.routeChosen.emit(route);
  }
}

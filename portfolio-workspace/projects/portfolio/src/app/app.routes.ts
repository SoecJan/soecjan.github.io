import { Routes } from '@angular/router';
import { PortfolioOverviewComponent } from './components/portfolio-overview/portfolio-overview.component';

export const routes: Routes = [{
    path: '',
    component: PortfolioOverviewComponent
  },
  {
    path: 'caravan',
    loadChildren: () => import('./../../../caravan/src/app/app.routes').then(m => m.routes)
  },
  {
    path: 'baloneybooth',
    loadChildren: () => import('./../../../balooneybooth/src/app/app.routes').then(m => m.routes)
  },
  {
    path: 'horserace',
    loadChildren: () => import('./../../../horserace/src/app/app.routes').then(m => m.routes)
  },
  {
    path: 'soja',
    loadChildren: () => import('./../../../soja/src/app/app.routes').then(m => m.routes)
  },
  { path: 'magic-clam', loadChildren: () => import('./../../../magicclam/src/app/app.routes').then(m => m.routes) },
  { path: 'guesser', loadChildren: () => import('./../../../guesser/src/app/app.routes').then(m => m.routes) }];

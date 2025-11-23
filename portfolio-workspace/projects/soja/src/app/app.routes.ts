import { Routes } from '@angular/router';
import { SojaComponent } from './components/soja.component';
import { SojaPlayerComponent } from './components/player/soja-player.component';

export const routes: Routes = [
    { path: '', component: SojaPlayerComponent },
    { path: 'questions', component: SojaComponent },
];

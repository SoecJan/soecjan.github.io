import { Component } from '@angular/core';
import { BoothComponent } from './components/booth/booth.component';
import { CustomerComponent } from './components/customer/customer.component';
import { ScoreComponent } from './components/score/score.component';

@Component({
  selector: 'app-balooneybooth',
  imports: [BoothComponent, CustomerComponent, ScoreComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'balooneybooth';
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterOutlet } from '@angular/router';
import { DarkmodeToggleComponent } from './components/darkmode-toggle/darkmode-toggle.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, MatButtonModule, MatSidenavModule, MatToolbarModule, RouterOutlet, MatIconModule, DarkmodeToggleComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  opened: boolean = false;

  nativeGames = [
    {
      name: 'Polytycoon (C# Unity)',
      route: 'soja'
    },
    {
      name: 'Svillage (Java libGdx)',
      route: 'horserace'
    },
    {
      name: 'Ameisenhaufen (JavaFX)',
      route: 'baloneybooth'
    },
  ];

  webGames = [
    {
      name: 'Soja',
      route: 'soja'
    },
    {
      name: 'Pferderennen',
      route: 'horserace'
    },
    {
      name: 'Baloney Booth',
      route: 'baloneybooth'
    },
    {
      name: 'Caravan',
      route: 'caravan'
    },
    {
      name: 'Miesmuschel',
      route: 'magic-clam'
    },
    {
      name: 'Ratung',
      route: 'guesser'
    },
  ];

  constructor(public router: Router) {}

  navigate(route: string) {
    this.router.navigateByUrl(route);
    this.opened = false;
  }
}

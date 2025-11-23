import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-magicclam',
  imports: [MatButtonModule, MatCardModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  state = 'hold';
  saying = '';
  sayingArray = [
    'Ja.',
    'Nein.',
    'Eines Tages vielleicht.',
    'Möglich.',
    'Auf jeden Fall!',
    'Nicht heute.',
    'Tatsächlich ja.',
    'Tatsächlich nein.',
    'Mit etwas Glück.',
    'Niemals.',
    'Frag doch einfach etwas höflicher.',
    'Das verrate ich nicht.',
    'Stelle eine andere Frage.',
    'Sicherlich.',
    'Warum denn nicht?',
    'Natürlich.',
    'Selbstverständlich',
  ];

  constructor() { }

  next(): void {
    this.state = 'pull';
    setTimeout(() => {
      this.state = 'hold';
      this.saying = this.sayingArray[Math.floor(Math.random() * this.sayingArray.length)];
    }, 4000)
  }
}

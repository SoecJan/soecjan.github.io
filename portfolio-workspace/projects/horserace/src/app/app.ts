import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { EMPTY, filter, interval, map, Observable, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-horserace',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatCardModule, MatSliderModule, MatIconModule, MatButtonModule, MatInputModule, MatExpansionModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title: string = 'Setze auf das schnellste Pferd!';
  options = {
    speed: 1,
    distance: 200,
    horseCount: 4,
  }
  racing: boolean = false;
  private horses: number[] = [];
  horseRace$: Observable<number[]> = EMPTY;

  reset() {
    this.racing = false;
    this.horses = Array.from(Array(this.options.horseCount).keys());
    this.title = 'Setze auf das schnellste Pferd!';
  }

  startRace() {
    this.reset();
    this.racing = true;
    this.title = 'Pferderennen!';

    const source = interval(100);
    const until = source.pipe(filter(val => !this.racing));

    this.horseRace$ = source.pipe(
      map(val => {
        this.horses = this.horses.map(horse => horse + Math.random() * this.options.speed);
        const winnerIndex = this.horses.findIndex(horse => horse >= this.options.distance);
        if (winnerIndex !== -1) {
          this.racing = false;
          this.title = `Pferd ${winnerIndex + 1} hat gewonnen!`;
        }
        return this.horses;
      }),
      takeUntil(until)
    );
  }
}

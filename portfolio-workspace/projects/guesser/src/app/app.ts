import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-guesser',
  imports: [FormsModule, ReactiveFormsModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatExpansionModule, MatCardModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  done = false;
  options = {
    totalGuessCount: 10,
    maxNumTries: 3,
  }
  currentGuessCount = 0;
  secretNumber: number = 0;
  numbers: { guessed: boolean, value: number }[] = [];

  ngOnInit(): void {
    this.reset();
  }

  guessNumber(value: number): void {
    if (this.done) return;
    this.currentGuessCount++;
    const matchingElement = this.numbers.filter(element => !!element).find((element) => element.value === value);
    if (matchingElement) {
      matchingElement.guessed = true;
    }
    this.done = value === this.secretNumber;
    if (this.currentGuessCount === this.options.maxNumTries) {
      this.done = true;
    };
  }

  reset(): void {
    this.done = false;
    this.currentGuessCount = 0;
    this.fillNumbers();
    this.secretNumber = Math.round(Math.random() * this.options.totalGuessCount);
  }

  private fillNumbers(): void {
    this.numbers = [];
    for (let i = 0; i <= this.options.totalGuessCount; i++) {
      this.numbers.push({ guessed: false, value: i });
    }
  }
}

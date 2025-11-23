import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { Baloney, BaloneyType } from '../../types/balooneybooth';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { BalooneyService } from '../../services/balooney/balooney.service';

@Component({
  selector: 'app-booth',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatListModule
  ],
  templateUrl: './booth.component.html',
  styleUrls: ['./booth.component.scss']
})
export class BoothComponent implements OnInit {
  title = 'Verkäufer';
  isLocked: boolean = false;
  isLockable: boolean = false;
  isCounting: boolean = false;
  baloneyOptionCount = 5;
  baloneyChoiceAmount = 2;
  allBaloneys: Baloney[] = [];
  selectedBaloneys: Baloney[] = [];
  shownBaloneys: Baloney[] = [];
  counter: number = 30;
  sub: Subscription = new Subscription();

  constructor(private balooneyService: BalooneyService) {
    this.balooneyService.getAll().pipe(
      map(balooneyStoreState => balooneyStoreState.baloneys.filter(balooney => BaloneyType.ITEM === balooney.type)),
      take(1)
    ).subscribe(result => {
      this.allBaloneys = result;
      this.selectShownBaloneys();
    });
  }

  private selectShownBaloneys() {
    const baloneyArray = [];
    for (let i = 0; i < this.baloneyOptionCount; i++) {
      baloneyArray.push(this.allBaloneys[Math.floor(Math.random() * this.allBaloneys.length)]);
    }
    this.shownBaloneys = baloneyArray;
  }

  reset() {
    this.counter = 30;
    this.isCounting = false;
    this.selectShownBaloneys();
    this.isLocked = false;
  }

  ngOnInit(): void {
    // this.balooneyService.refresh();
  }

  onSelection(event: any, selectedItems: any[]) {
    const selectedItemsArray: Baloney[] = [];
    selectedItems.forEach(element => {
      selectedItemsArray.push(element.value);
    });
    this.selectedBaloneys = selectedItemsArray;
    this.isLockable = this.selectedBaloneys.length === this.baloneyChoiceAmount;
  }

  lockItems() {
    this.isLocked = true;
    this.shownBaloneys = this.selectedBaloneys;
  }

  startCounter() {
    this.isCounting = true;
    this.sub = interval(1000).pipe(
      tap(() => {
        this.counter--;
      })
    ).subscribe(() => {
      if (this.counter === 0) {
        this.sub.unsubscribe();
      }
    });
  }

  stopCounter() {
    this.sub.unsubscribe();
    this.counter = 30;
    this.isCounting = false;
  }
}

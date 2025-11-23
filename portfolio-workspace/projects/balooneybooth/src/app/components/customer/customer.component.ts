import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Baloney, BaloneyType } from '../../types/balooneybooth';
import { BalooneyStore } from '../../stores/balooneybooth.store';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { BalooneyService } from '../../services/balooney/balooney.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-customer',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
  ],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  title = 'Kunde';
  customer$: Observable<string>;
  allBaloneys$: Observable<Baloney[]>;

  constructor(private balooneyService: BalooneyService) {
    this.allBaloneys$ = this.balooneyService.getAll().pipe(map(balooneyStoreState => balooneyStoreState.baloneys.filter(balooney => BaloneyType.CUSTOMER === balooney.type)));
    this.customer$ = this.selectShownBaloneys();
  }

  ngOnInit(): void {
  }

  private selectShownBaloneys() {
    return this.allBaloneys$.pipe(map(balooneys => balooneys[Math.floor(Math.random() * balooneys.length)].contentDe));
  }

  next() {
    this.customer$ = this.selectShownBaloneys();
  }
}

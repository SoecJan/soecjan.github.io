import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TradePoint } from '../../types/trade.types';
import { ProductStore } from '../../stores/product/product.store';

@Injectable({ providedIn: 'root' })
export class TradePointService {
  private readonly tradePointSubject = new BehaviorSubject<TradePoint | undefined>(undefined);

  constructor(private readonly productStore: ProductStore) {}

  get tradePoint$(): Observable<TradePoint | undefined> {
    return this.tradePointSubject.asObservable();
  }

  next(): void {
    this.tradePointSubject.next({
      name: 'Marktstand',
      buyableProducts: this.productStore
        .getAllProducts()
        .filter(() => Math.random() > 0.5)
        .map((product) => {
          return {
            tradeProduct: {
              product,
              price: Math.floor(product.marketBaseValue * (1 + (Math.random() - 0.5) / 10)),
            },
            availableAmount: 2 * Math.floor(Math.random() * 5) + 1,
          };
        }),
      sellableProducts: this.productStore.getAllProducts().map((product) => {
        return {
          product,
          price: Math.floor(product.marketBaseValue * (1 + (Math.random() - 0.5))),
        };
      }),
    });
  }
}

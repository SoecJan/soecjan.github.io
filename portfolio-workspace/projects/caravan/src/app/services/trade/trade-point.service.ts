import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TradeOfferProduct, TradePoint, TradeProduct } from '../../types/trade.types';
import { ProductStore } from '../../stores/product/product.store';
import { Product } from '../../types/inventory.types';
import { RouteElement } from '../../types/route.types';

@Injectable({ providedIn: 'root' })
export class TradePointService {
  private readonly tradePointSubject = new BehaviorSubject<TradePoint | undefined>(undefined);

  constructor(private readonly productStore: ProductStore) {}

  get tradePoint$(): Observable<TradePoint | undefined> {
    return this.tradePointSubject.asObservable();
  }

  next(nextLocation?: RouteElement): void {
    if (!nextLocation) {
      this.tradePointSubject.next({
        name: 'Reisend',
        buyableProducts: [],
        sellableProducts: []
      });
      return;
    }
    const buyableProducts: TradeOfferProduct[] = this.productStore
        .getAllProducts()
        .filter(() => Math.random() > 0.5)
        .map((product) => {
          return {
            tradeProduct: {
              product,
              price: Math.floor(product.marketBaseValue * (1 - ((Math.random() - 0.5) * 0.2))),
            },
            availableAmount: 2 * Math.floor(Math.random() * 5) + 1,
          };
        });
    const sellableProducts: TradeProduct[] = this.productStore.getAllProducts().map((product) => {
        return {
          product,
          price: this.calculateSellPrice(buyableProducts, product),
        };
      });

    this.tradePointSubject.next({
      name: nextLocation.name,
      buyableProducts: buyableProducts,
      sellableProducts: sellableProducts,
    });
  }

  calculateSellPrice(buyableProducts: TradeOfferProduct[], product: Product): number {
    const buyableProduct: TradeOfferProduct | undefined = buyableProducts.find(element => element.tradeProduct.product.name == product.name);
    if (!buyableProduct) {
      return product.marketBaseValue; // TODO: Ergänzen mit Bedarfskurve / Distanz zur nächsten Produktionsstätte
    } else {
      return buyableProduct.tradeProduct.price * 0.75; // TODO: 0.75 ersetzen durch vorhandene Menge/Bedarf
    }
  }
}

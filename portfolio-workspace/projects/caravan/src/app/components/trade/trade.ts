import { Component } from '@angular/core';
import { combineLatest, filter, map, Observable, of } from 'rxjs';
import { TradeOfferProduct, TradePoint } from '../../types/trade.types';
import { PlayerInventoryStore } from '../../stores/inventory/player-inventory.store';
import { CommonModule } from '@angular/common';
import { TradeActionComponent } from './trade-action/trade-action.component';
import { TradePointService } from '../../services/trade/trade-point.service';

@Component({
  selector: 'app-trade',
  imports: [CommonModule, TradeActionComponent],
  templateUrl: './trade.html',
  styleUrl: './trade.scss',
})
export class Trade {
  title$: Observable<string>;
  buyableProducts$: Observable<TradeOfferProduct[]>;
  sellableProducts$: Observable<TradeOfferProduct[]>;

  constructor(
    private readonly tradePointService: TradePointService,
    private readonly playerInventoryStore: PlayerInventoryStore
  ) {
    this.title$ = this.tradePointService.tradePoint$.pipe(
    map((tradePoint) => tradePoint?.name || 'Kein Handelsplatz')
  );
    this.buyableProducts$ = this.tradePointService.tradePoint$.pipe(
      filter(tradePoint => tradePoint !== undefined),
      map((tradePoint: TradePoint) => {
        return tradePoint.buyableProducts;
      })
    );
    this.sellableProducts$ = combineLatest([
      this.playerInventoryStore.state$,
      this.tradePointService.tradePoint$,
    ]).pipe(
      map(([playerInventoryStoreState, tradePoint]) => {
        if (tradePoint === undefined) {
          return [];
        }
        return playerInventoryStoreState.storageArray
          .map((storageItem) => {
            const tradePointProduct = tradePoint.sellableProducts.find(
              (tp) => tp.product.name === storageItem.product.name
            );
            if (!tradePointProduct) {
              return undefined;
            }
            return {
              tradeProduct: {
                product: storageItem.product,
                price: tradePointProduct.price,
              },
              availableAmount: storageItem.amount,
            };
          })
          .filter((product) => product !== undefined);
      })
    );
    this.tradePointService.next();
  }
}

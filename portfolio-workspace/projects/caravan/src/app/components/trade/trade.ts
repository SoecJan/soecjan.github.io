import { Component } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { TradeProduct } from '../../types/trade.types';
import { ProductStore } from '../../stores/product/product.store';
import { PlayerInventoryStore } from '../../stores/inventory/player-inventory.store';
import { Product } from '../../types/inventory.types';
import { PlayerInventoryStoreState } from '../../stores/inventory/player-inventory.state';
import { CommonModule } from '@angular/common';
import { TradeActionComponent } from './trade-action/trade-action.component';

@Component({
  selector: 'app-trade',
  imports: [CommonModule, TradeActionComponent],
  templateUrl: './trade.html',
  styleUrl: './trade.scss',
})
export class Trade {
  buyableProducts$: Observable<TradeProduct[]>;
  sellableProducts$: Observable<TradeProduct[]>;

  constructor(
    private readonly productStore: ProductStore,
    private readonly playerInventoryStore: PlayerInventoryStore
  ) {
    this.buyableProducts$ = of(this.productStore.getAllProducts()).pipe(
      map((products: Product[]) => {
        return products.map((product) => {
          return {
            product: product,
            availableAmount: 5,
            price: product.marketBaseValue * 1.2,
          };
        });
      })
    );
    this.sellableProducts$ = this.playerInventoryStore.state$.pipe(
      map((playerInventoryStoreState: PlayerInventoryStoreState) => {
        return playerInventoryStoreState.storageArray.map((storageItem) => {
          return {
            product: storageItem.product,
            availableAmount: storageItem.amount,
            price: storageItem.product.marketBaseValue * 0.8,
          };
        });
      })
    );
  }
}

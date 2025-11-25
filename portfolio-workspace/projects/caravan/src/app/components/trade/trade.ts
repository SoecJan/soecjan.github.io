import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  output,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Product } from '../../types/inventory.types';
import { MatButtonModule } from '@angular/material/button';
import { TradeAction, TradeProduct } from '../../types/trade.types';
import { ProductStore } from '../../stores/product/product.store';
import { TradeService } from '../../services/trade/trade.service';
import { MatTabsModule } from '@angular/material/tabs';
import { PlayerInventoryStoreState } from '../../stores/inventory/player-inventory.state';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PlayerInventoryStore } from '../../stores/inventory/player-inventory.store';
import { ProductOverviewComponent } from './product-overview/product-overview.component';

@Component({
  selector: 'app-trade',
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatTabsModule,
    ProductOverviewComponent
  ],
  templateUrl: './trade.html',
  styleUrl: './trade.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Trade {
  buyableProducts: TradeProduct[] = [];
  sellableProducts: Observable<TradeProduct[]>;

  constructor(
    private readonly productStore: ProductStore,
    private readonly tradeService: TradeService,
    private readonly playerInventoryStore: PlayerInventoryStore
  ) {
    this.buyableProducts = this.productStore
      .getAllProducts()
      .map((product: Product) => {
        return {
          product: product,
          price: product.marketBaseValue,
          availableAmount: 10,
        };
      });
    this.sellableProducts = this.playerInventoryStore.state$.pipe(
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

  onBuy(tradeProduct: TradeProduct) {
    if (tradeProduct.availableAmount === 0) {
      return;
    }
    const boughtProduct: Product = tradeProduct.product;
    tradeProduct.availableAmount -= 1;
    const tradeAction: TradeAction = {
      product: { ...boughtProduct },
      action: 'Buy',
    };
    this.tradeService.add(tradeAction);
  }

  onSell(tradeProduct: TradeProduct) {
    if (tradeProduct.availableAmount === 0) {
      return;
    }
    const soldProduct: Product = tradeProduct.product;
    tradeProduct.availableAmount -= 1;
    const tradeAction: TradeAction = {
      product: { ...soldProduct },
      action: 'Sell',
    };
    this.tradeService.add(tradeAction);
  }
}

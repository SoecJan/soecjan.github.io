import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import {
  TradeTransaction,
  TradeOfferProduct,
  TradeProduct,
} from '../../../types/trade.types';
import { TradeService } from '../../../services/trade/trade.service';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { ProductOverviewComponent } from './product-overview/product-overview.component';

@Component({
  selector: 'app-trade-action',
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatTabsModule,
    ProductOverviewComponent,
  ],
  templateUrl: './trade-action.component.html',
  styleUrl: './trade-action.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TradeActionComponent {
  buyableProducts: InputSignal<TradeOfferProduct[] | null> = input<
    TradeOfferProduct[] | null
  >([]);
  sellableProducts: InputSignal<TradeOfferProduct[] | null> = input<
    TradeOfferProduct[] | null
  >([]);
  boughtProducts: TradeProduct[] = [];
  soldProducts: TradeProduct[] = [];
  bargainFactor: number = 1;

  constructor(private readonly tradeService: TradeService) {}

  get tradeSum(): number {
    const buySum = this.boughtProducts.reduce(
      (sum, tradeProduct) => sum + tradeProduct.price,
      0
    );
    const sellSum = this.soldProducts.reduce(
      (sum, tradeProduct) => sum + tradeProduct.price,
      0
    );
    return Math.floor((sellSum - buySum) * this.bargainFactor);
  }

  onBuy(tradeProduct: TradeOfferProduct) {
    if (tradeProduct.availableAmount === 0) {
      return;
    }
    tradeProduct.availableAmount -= 1;
    const boughtProduct = tradeProduct.tradeProduct;
    this.boughtProducts.push({ ...boughtProduct });
  }

  onSell(tradeProduct: TradeOfferProduct) {
    if (tradeProduct.availableAmount === 0) {
      return;
    }
    tradeProduct.availableAmount -= 1;
    const soldProduct = tradeProduct.tradeProduct;
    this.soldProducts.push({ ...soldProduct });
  }

  executeTrade() {
    const buyTransaction: TradeTransaction = {
      tradeProductArray: this.boughtProducts,
      action: 'Buy',
      bargainFactor: this.bargainFactor,
    };
    this.tradeService.add(buyTransaction);

    const sellTransaction: TradeTransaction = {
      tradeProductArray: this.soldProducts,
      action: 'Sell',
      bargainFactor: this.bargainFactor,
    };
    this.tradeService.add(sellTransaction);

    this.boughtProducts = [];
    this.soldProducts = [];
    this.bargainFactor = 1;
  }

  startBargain() {
    Math.random() > 0.5
      ? (this.bargainFactor -= 0.05)
      : (this.bargainFactor += 0.05);
  }
}

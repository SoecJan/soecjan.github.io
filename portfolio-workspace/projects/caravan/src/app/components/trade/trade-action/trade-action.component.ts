import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Product } from '../../../types/inventory.types';
import { MatButtonModule } from '@angular/material/button';
import { TradeAction, TradeProduct } from '../../../types/trade.types';
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
  buyableProducts: InputSignal<TradeProduct[] | null> = input<TradeProduct[] | null>([]);
  sellableProducts: InputSignal<TradeProduct[] | null> = input<TradeProduct[] | null>([]);
  tradeStatus: TradeAction[] = [];
  tradeSum: number = 0;

  constructor(private readonly tradeService: TradeService) {}

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
    this.tradeStatus.push(tradeAction);
    this.tradeSum -= tradeProduct.price;
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
    this.tradeStatus.push(tradeAction);
    this.tradeSum += tradeProduct.price;
  }

  executeTrade() {
    this.tradeStatus.forEach((tradeAction: TradeAction) => {
      this.tradeService.add(tradeAction);
    });
    this.tradeStatus = [];
    this.tradeSum = 0;
  }

  startBargain() {
    console.log('Feilschen Minispiel');
    Math.random() > 0.5
      ? (this.tradeSum = this.tradeSum * 0.9)
      : (this.tradeSum = this.tradeSum * 1.1);
  }
}

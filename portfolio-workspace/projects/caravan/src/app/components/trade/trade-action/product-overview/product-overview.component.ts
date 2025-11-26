import { Component, input, output } from '@angular/core';
import { TradeProduct } from '../../../../types/trade.types';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrl: './product-overview.component.scss',
  imports: [CommonModule, MatButtonModule],
})
export class ProductOverviewComponent {
  title = input<string>();
  type = input<'Sell' | 'Buy'>();
  products = input<TradeProduct[] | null | undefined>();

  tradeAction = output<TradeProduct>();

  onAction(product: TradeProduct) {
    this.tradeAction.emit(product);
  }
}

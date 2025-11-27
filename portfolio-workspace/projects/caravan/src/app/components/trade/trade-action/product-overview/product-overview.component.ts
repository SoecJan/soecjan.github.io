import { Component, input, output } from '@angular/core';
import { TradeOfferProduct } from '../../../../types/trade.types';
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
  products = input<TradeOfferProduct[] | null | undefined>();

  tradeAction = output<TradeOfferProduct>();

  onAction(product: TradeOfferProduct) {
    this.tradeAction.emit(product);
  }
}

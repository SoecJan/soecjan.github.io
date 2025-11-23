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

@Component({
  selector: 'app-trade',
  imports: [MatCardModule, MatDividerModule, MatButtonModule],
  templateUrl: './trade.html',
  styleUrl: './trade.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Trade implements OnInit {
  buyableProducts: TradeProduct[] = [];

  constructor(private readonly productStore: ProductStore, private readonly tradeService: TradeService) {
    this.buyableProducts = this.productStore
      .getAllProducts()
      .map((product: Product) => {
        return {
          product: product,
          price: product.marketBaseValue,
          availableAmount: 10,
        };
      });
  }

  ngOnInit(): void {
  }

  onBuy(tradeProduct: TradeProduct) {
    if (tradeProduct.availableAmount === 0) {
      return;
    }
    const boughtProduct: Product = tradeProduct.product;
    tradeProduct.availableAmount -= 1;
    const tradeAction: TradeAction = { product: boughtProduct, action: 'Buy' };
    this.tradeService.add(tradeAction);
  }
}

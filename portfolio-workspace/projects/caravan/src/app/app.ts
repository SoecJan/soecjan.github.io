import { Component } from '@angular/core';
import { Inventory } from './components/inventory/inventory';
import { Route } from './components/route/route';
import { Stats } from './components/stats/stats';
import { RouteElement } from './types/route.types';
import { TradeTransaction } from './types/trade.types';
import { Trade } from './components/trade/trade';
import { TradePointService } from './services/trade/trade-point.service';

@Component({
  selector: 'app-caravan',
  imports: [Inventory, Route, Stats, Trade],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'caravan';
  tradeAction: TradeTransaction | undefined;

  constructor(private readonly tradePointService: TradePointService) {}

  onRouteChosen(route: RouteElement) {
    console.log(route);
    this.tradePointService.next();
  }

  onTradeAction(trade: TradeTransaction) {
    this.tradeAction = trade;
  }
}

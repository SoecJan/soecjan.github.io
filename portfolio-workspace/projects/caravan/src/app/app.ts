import { Component } from '@angular/core';
import { Inventory } from './components/inventory/inventory';
import { Route } from './components/route/route';
import { Stats } from './components/stats/stats';
import { Trade } from './components/trade/trade';
import { RouteElement } from './types/route.types';
import { TradeAction } from './types/trade.types';

@Component({
  selector: 'app-caravan',
  imports: [Inventory, Route, Stats, Trade],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'caravan';
  tradeAction: TradeAction | undefined;

  onRouteChosen(route: RouteElement) {
    console.log(route);
  }

  onTradeAction(trade: TradeAction) {
    this.tradeAction = trade;
  }
}

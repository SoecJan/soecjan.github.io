import { Injectable } from '@angular/core';
import { Store } from 'store';
import { TradeStoreState } from './trade.store.state';

@Injectable({ providedIn: 'root' })
export class TradeStore extends Store<TradeStoreState> {
  constructor() {
    super({ tradeAction: undefined, tradeHistory: [] });
  }
}

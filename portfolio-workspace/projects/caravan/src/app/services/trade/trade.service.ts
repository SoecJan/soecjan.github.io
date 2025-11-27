import { Injectable } from '@angular/core';
import { TradeStore } from '../../stores/trade/trade.store';
import { TradeTransaction } from '../../types/trade.types';
import { TradeStoreState } from '../../stores/trade/trade.store.state';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TradeService {
  tradeState$: Observable<TradeStoreState>;

  constructor(private readonly tradeStore: TradeStore) {
    this.tradeState$ = this.tradeStore.state$;
  }

  add(tradeTransaction: TradeTransaction): void {
    const currentState = this.tradeStore.state;

    this.tradeStore.setState({
      lastTradeTransaction: tradeTransaction,
      tradeHistory: [tradeTransaction, ...currentState.tradeHistory],
    });
  }
}

import { Injectable } from '@angular/core';
import { TradeStore } from '../../stores/trade/trade.store';
import { TradeAction } from '../../types/trade.types';
import { TradeStoreState } from '../../stores/trade/trade.store.state';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TradeService {
  trade$: Observable<TradeStoreState>;

  constructor(private readonly tradeStore: TradeStore) {
    this.trade$ = this.tradeStore.state$;
  }

  add(tradeAction: TradeAction): void {
    const currentState = this.tradeStore.state;

    this.tradeStore.setState({
      tradeAction: tradeAction,
      tradeHistory: [tradeAction, ...currentState.tradeHistory],
    });
  }
}

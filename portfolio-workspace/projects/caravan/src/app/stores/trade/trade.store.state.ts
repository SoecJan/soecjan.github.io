import { TradeAction } from '../../types/trade.types';

export interface TradeStoreState {
  tradeAction: TradeAction | undefined;
  tradeHistory: TradeAction[];
}

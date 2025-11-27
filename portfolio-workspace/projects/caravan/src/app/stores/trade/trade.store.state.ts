import { TradeTransaction } from '../../types/trade.types';

export interface TradeStoreState {
  lastTradeTransaction: TradeTransaction | undefined;
  tradeHistory: TradeTransaction[];
}

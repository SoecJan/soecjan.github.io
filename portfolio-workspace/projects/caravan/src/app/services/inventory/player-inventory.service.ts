import { Injectable } from '@angular/core';
import { PlayerInventoryStore } from '../../stores/inventory/player-inventory.store';
import { map, Observable, startWith } from 'rxjs';
import { PlayerInventoryStoreState } from '../../stores/inventory/player-inventory.state';
import { TradeService } from '../trade/trade.service';
import { TradeStoreState } from '../../stores/trade/trade.store.state';

@Injectable({ providedIn: 'root' })
export class PlayerInventoryService {
  playerInventory$: Observable<PlayerInventoryStoreState>;

  constructor(
    private readonly tradeService: TradeService,
    private readonly playerInventoryStore: PlayerInventoryStore
  ) {
    this.playerInventory$ = this.tradeService.tradeState$.pipe(
      map((tradeStoreState: TradeStoreState) => {
        const lastTradeTransaction = tradeStoreState.lastTradeTransaction;
        if (!lastTradeTransaction) {
          return this.playerInventoryStore.state;
        }
        const currentInventoryState = this.playerInventoryStore.state;
        let moneyExchange = 0;
        if (lastTradeTransaction.action === 'Sell') {
          const totalEarnedPrice =
            lastTradeTransaction.tradeProductArray.reduce(
              (sum, tradeProduct) => sum + tradeProduct.price,
              0
            ) * lastTradeTransaction.bargainFactor;
          moneyExchange += totalEarnedPrice;
        } else if (lastTradeTransaction.action === 'Buy') {
          const paidTotalPrice =
            lastTradeTransaction.tradeProductArray.reduce(
              (sum, tradeProduct) => sum + tradeProduct.price,
              0
            ) * lastTradeTransaction.bargainFactor;
          moneyExchange -= paidTotalPrice;
        }
        let newInventoryState: PlayerInventoryStoreState = {
          money: currentInventoryState.money + moneyExchange,
          storageArray: currentInventoryState.storageArray,
        };

        lastTradeTransaction.tradeProductArray.forEach((tradeProduct) => {
          const storageIndex = currentInventoryState.storageArray.findIndex(
            (productStorage) =>
              productStorage.product.name === tradeProduct.product.name
          );
          if (storageIndex < 0) {
            // Storage existiert noch nicht
            if (lastTradeTransaction.action === 'Sell') {
              throw new Error(
                'Trying to sell a product that is not in the inventory'
              );
            } else if (lastTradeTransaction.action === 'Buy') {
              newInventoryState.storageArray.push({
                product: tradeProduct.product,
                amount: 1,
              });
            }
          } else {
            // Storage existiert bereits
            if (lastTradeTransaction.action === 'Buy') {
              newInventoryState.storageArray[storageIndex].amount += 1;
            } else if (lastTradeTransaction.action === 'Sell') {
              newInventoryState.storageArray[storageIndex].amount -= 1;
              if (newInventoryState.storageArray[storageIndex].amount <= 0) {
                newInventoryState.storageArray.splice(storageIndex, 1);
              }
            }
          }
        });
        this.playerInventoryStore.setState(newInventoryState);
        return this.playerInventoryStore.state;
      }),
      startWith(this.playerInventoryStore.state)
    );
  }
}

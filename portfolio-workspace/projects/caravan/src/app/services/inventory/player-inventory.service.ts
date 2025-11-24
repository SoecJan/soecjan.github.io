import { Injectable } from '@angular/core';
import { ProductStore } from '../../stores/product/product.store';
import { PlayerInventoryStore } from '../../stores/inventory/player-inventory.store';
import { distinctUntilChanged, map, Observable, startWith } from 'rxjs';
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
    this.playerInventory$ = this.tradeService.trade$.pipe(
      map((tradeStoreState: TradeStoreState) => {
        const currentAction = tradeStoreState.tradeAction;
        if (!currentAction) {
          return this.playerInventoryStore.state;
        }
        const currentInventoryState = this.playerInventoryStore.state;
        if (currentAction.action === 'Buy') {
          const storageIndex = currentInventoryState.storageArray.findIndex(productStorage => productStorage.product.name === currentAction.product.name);
          let newStorage: PlayerInventoryStoreState = {money: currentInventoryState.money - currentAction.product.marketBaseValue, storageArray: currentInventoryState.storageArray};
          if (storageIndex < 0) {
            // Storage existiert noch nicht
            newStorage.storageArray.push({
              product: currentAction.product,
              amount: 1,
              maxAmount: 10
            })
          } else {
            // Storage existiert bereits
            newStorage.storageArray[storageIndex].amount += 1;
          }
          this.playerInventoryStore.setState(newStorage);
        } else if (currentAction.action === 'Sell') {
          const storageIndex = currentInventoryState.storageArray.findIndex(productStorage => productStorage.product.name === currentAction.product.name);
          let newStorage: PlayerInventoryStoreState = {money: currentInventoryState.money + currentAction.product.marketBaseValue * 0.8, storageArray: currentInventoryState.storageArray};
          if (storageIndex < 0) {
            throw new Error('Trying to sell a product that is not in the inventory');
          } else {
            // Storage existiert bereits
            newStorage.storageArray[storageIndex].amount -= 1;
          }
          this.playerInventoryStore.setState(newStorage);
        }
        return this.playerInventoryStore.state;
      }),
      startWith(this.playerInventoryStore.state)
    );
  }
}

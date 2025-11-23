import { Injectable } from '@angular/core';
import { Store } from 'store';
import { PlayerInventoryStoreState } from './player-inventory.state';

@Injectable({ providedIn: 'root' })
export class PlayerInventoryStore extends Store<PlayerInventoryStoreState> {
  constructor() {
    super({ money: 0, storageArray: [] });
  }
}

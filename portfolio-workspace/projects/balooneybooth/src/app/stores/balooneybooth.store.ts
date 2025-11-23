import { Injectable } from '@angular/core';
import { BaloneyStoreState } from './balooneybooth.store.state';
import { Store } from 'store';

@Injectable({
  providedIn: 'root'
})
export class BalooneyStore extends Store<BaloneyStoreState> {

  constructor() {
    super({ index: 0, baloneys: [] });
  }
}

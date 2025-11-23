import { Injectable } from '@angular/core';
import { Store } from 'store';
import { SojaStoreState } from './soja.store.state';

@Injectable({
  providedIn: 'root'
})
export class SojaStore extends Store<SojaStoreState> {

  constructor() {
    super({index: 0, sojas: []});
  }
}

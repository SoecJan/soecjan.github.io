import { Injectable } from '@angular/core';
import { Product } from '../../types/inventory.types';

@Injectable({ providedIn: 'root' })
export class ProductStore {
  constructor() {}

  getAllProducts(): Product[] {
    return [
      {
        name: 'Getreide',
        marketBaseValue: 5,
      },
      {
        name: 'Mehl',
        marketBaseValue: 10,
      },
      {
        name: 'Wasser',
        marketBaseValue: 10,
      },
      {
        name: 'Brot',
        marketBaseValue: 25,
      },
      {
        name: 'Fleisch',
        marketBaseValue: 32,
      },
      {
        name: 'Gemüse',
        marketBaseValue: 8,
      },
      {
        name: 'Fisch',
        marketBaseValue: 20,
      },
      {
        name: 'Eisenerz',
        marketBaseValue: 15,
      },
      {
        name: 'Kupfererz',
        marketBaseValue: 18,
      },
      {
        name: 'Eisenbarren',
        marketBaseValue: 30,
      },
      {
        name: 'Kupferbarren',
        marketBaseValue: 40,
      },
    ];
  }
}

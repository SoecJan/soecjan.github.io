import { Injectable } from "@angular/core";
import { Product } from "../../types/inventory.types";

@Injectable({providedIn: 'root'})
export class ProductStore {

    constructor() {}

    getAllProducts(): Product[] {
        return [{
            name: 'Getreide',
            marketBaseValue: 5,
        }];
    }
}
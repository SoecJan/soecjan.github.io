import { Product } from "./inventory.types"

export type TradeProduct = {
    product: Product;
    price: number;
    availableAmount: number;
}

export type TradeAction = {
    product: Product
    action: 'Sell' | 'Buy';
}
import { Product } from "./inventory.types"

export type TradeProduct = {
    product: Product;
    price: number;
}

export type TradeOfferProduct = {
    tradeProduct: TradeProduct;
    availableAmount: number;
}

export type TradeTransaction = {
    tradeProductArray: TradeProduct[];
    action: 'Sell' | 'Buy' | undefined;
    bargainFactor: number;
}

export type TradePoint = {
    name: string;
    buyableProducts: TradeOfferProduct[];
    sellableProducts: TradeProduct[];
}
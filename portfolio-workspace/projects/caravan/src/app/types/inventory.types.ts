export type Product = {
    name: string;
    marketBaseValue: number;
}

export type ProductStorage = {
    amount: number;
    maxAmount: number;
    product: Product;
}
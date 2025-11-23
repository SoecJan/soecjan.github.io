import { ProductStorage } from "../../types/inventory.types";

export interface PlayerInventoryStoreState {
    money: number;
    storageArray: ProductStorage[];
}
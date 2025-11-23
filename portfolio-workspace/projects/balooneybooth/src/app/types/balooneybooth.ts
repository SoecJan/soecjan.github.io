export interface Baloney {
  id: number;
  content: string;
  contentDe: string;
  type: BaloneyType;
}

export enum BaloneyType {
  ITEM = 'ITEM',
  CUSTOMER = 'CUSTOMER'
}

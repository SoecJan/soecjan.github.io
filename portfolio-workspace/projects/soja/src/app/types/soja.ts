export interface SojaItem {
  id: number;
  title: string;
  content: string;
  category: Category;
}

export enum Category {
  TASK,
  RULE,
  ACTION
}

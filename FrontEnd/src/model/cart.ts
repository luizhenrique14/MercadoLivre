import { IProduct } from "./product";

export interface ICart {
  id: number;
  quantity: number;
  subtotal: number;
  createdAt: string;
  updatedAt: string;
  ProductId: number;
  Product: IProduct;
}

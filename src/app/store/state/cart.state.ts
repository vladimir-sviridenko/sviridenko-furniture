import { ProductState } from './product.state';

export interface CartState {
  products: ProductState[];
  totalPrice: number;
}

export const initialCartState: CartState = {
  products: [],
  totalPrice: 0
};

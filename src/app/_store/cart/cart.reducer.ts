import * as ActionCart from './cart.actions';
import { Product } from '@models/Product';
import { createReducer, on } from '@ngrx/store';

export interface CartState {
  products: Product[];
  totalPrice: number;
}

const initialState: CartState = {
  products: [],
  totalPrice: 0
};

export const reducer = createReducer(
  initialState,
  on(ActionCart.addProduct, (state: CartState, { product }) => {
    return {
      ...state,
      products: [...state.products, product]
    };
  }),
  on(ActionCart.removeProduct, (state: CartState, { productId }) => {
    return {
      ...state,
      products: state.products.filter((product) => product.id !== productId)
    };
  })
);

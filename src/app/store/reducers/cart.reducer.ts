import * as ActionCart from '@store/actions/cart.actions';
import { createReducer, on } from '@ngrx/store';
import { initialCartState, CartState } from '@store/state/cart.state';

export const reducer = createReducer(
  initialCartState,
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

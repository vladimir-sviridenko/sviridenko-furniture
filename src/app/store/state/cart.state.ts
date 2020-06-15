import { Cart } from '@shop/models/cart';

export interface CartState {
	isCartOpened: boolean;
	cart: Cart;
  totalPrice: number;
}

export const initialCartState: CartState = {
	isCartOpened: false,
	cart: new Cart(),
  totalPrice: 0
};

import { CartProduct } from '@shop/models/cart-product';

export interface CartState {
	isCartOpened: boolean;
	cartProducts: CartProduct[];
  totalPrice: number;
}

export const initialCartState: CartState = {
	isCartOpened: false,
	cartProducts: [],
  totalPrice: 0
};

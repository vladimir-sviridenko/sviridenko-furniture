import { CartProduct } from '@shop/models/CartProduct';

export interface CartState {
	isCartOpened: boolean;
	products: CartProduct[];
  totalPrice: number;
}

export const initialCartState: CartState = {
	isCartOpened: false,
	products: [],
  totalPrice: 0
};

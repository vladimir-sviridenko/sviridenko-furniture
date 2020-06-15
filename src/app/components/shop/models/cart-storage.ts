import { Cart } from './cart';

export interface CartStorage {
	cartStorageKey: string;
	saveCart(cart: Cart): void;
	loadCart(): Cart;
}

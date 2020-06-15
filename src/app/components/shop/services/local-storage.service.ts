import { Injectable } from '@angular/core';
import { Cart } from '@shop/models/cart';
import { CartStorage } from '@shop/models/cart-storage';
import { CartProductsPool } from '@shop/models/cart-products-pool';

@Injectable()
export class LocalStorageService implements CartStorage {

	public cartStorageKey: string = 'cart';

	public saveCart(cart: Cart): void {
		//window.localStorage.setItem(this.cartStorageKey, JSON.stringify(cart));
	}

	public loadCart(): Cart {
		/*let cartPools: CartProductsPool[] = [];
		try {
			const loadedPools: CartProductsPool[] = JSON.parse(window.localStorage.getItem(this.cartStorageKey));
			cartPools = loadedPools ? loadedPools : [];
		} catch (error) {
			if (error instanceof SyntaxError) {
				cartPools = [];
			} else {
				throw error;
			}
		}

		const cart: Cart = new Cart(cartPools);

		return cart;*/
		return new Cart();
	}
}

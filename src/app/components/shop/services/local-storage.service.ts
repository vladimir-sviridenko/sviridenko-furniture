import { Injectable } from '@angular/core';
import { Cart, SerializedCart } from '@shop/models/cart';
import { CartStorage } from '@shop/models/cart-storage';

@Injectable()
export class LocalStorageService implements CartStorage {

	public cartStorageKey: string = 'cart';

	public saveCart(cart: Cart): void {
		localStorage.setItem(this.cartStorageKey, JSON.stringify(cart));
	}

	public loadCart(): Cart {
		let cart: Cart;
		try {
			const storagedData: string = localStorage.getItem(this.cartStorageKey);
			if (Boolean(storagedData)) {
				const serializedCart: SerializedCart = JSON.parse(storagedData);
				cart = Cart.deserialize(serializedCart);
			} else {
				return new Cart();
			}
		} catch (error) {
			localStorage.setItem(this.cartStorageKey, '');
			cart = new Cart();
		}

		return cart;
	}
}

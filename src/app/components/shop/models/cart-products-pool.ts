import { CartProduct } from './cart-product';

export class CartProductsPool {
	private _cartProduct: CartProduct;
	private _quantity: number;

	get cartProduct(): CartProduct {
		return this._cartProduct;
	}

	get quantity(): number {
		return this._quantity;
	}

	get poolPrice(): number {
		return this.cartProduct.product.price * this.quantity;
	}

	constructor(cartProduct: CartProduct, quantity?: number) {
		this._cartProduct = cartProduct;
		this._quantity = (quantity !== undefined) ? quantity : 1;
	}
}

import { CartProduct, SerializedCartProduct } from './cart-product';

export interface SerializedProductPool {
	cartProduct: SerializedCartProduct;
	quantity: number;
}

export class ProductPool {
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

	public static deserialize(serializedProductPool: SerializedProductPool): ProductPool {
		const cartProduct: CartProduct = CartProduct.deserialize(serializedProductPool.cartProduct);
		const productPool: ProductPool = new ProductPool(cartProduct, serializedProductPool.quantity);
		return productPool;
	}
}

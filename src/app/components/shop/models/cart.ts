import { CartProductsPool } from './cart-products-pool';
import { CartProduct } from './cart-product';

export class Cart {
	private _pools: CartProductsPool[];

	get pools(): CartProductsPool[] {
		return this._pools;
	}

	get productsQuantity(): number {
		return this.pools.reduce((totalQuantity: number, pool: CartProductsPool) => {
			return totalQuantity + pool.quantity;
		}, 0);
	}

	get totalPrice(): number {
		return this._pools.reduce((totalCartPrice: number, pool: CartProductsPool) => {
			return totalCartPrice + pool.poolPrice;
		}, 0);
	}

	constructor(pools?: CartProductsPool[]) {
		this._pools = pools ? pools : [];
	}

	public addProduct(cartProduct: CartProduct): void {
		let isNewPool: boolean = true;
		const updatedPools: CartProductsPool[] = this.pools.map((pool: CartProductsPool) => {
			if (pool.cartProduct.equals(cartProduct)) {
				isNewPool = false;
				const updatedPool: CartProductsPool = new CartProductsPool(pool.cartProduct, pool.quantity + 1);
				return updatedPool;
			} else {
				return pool;
			}
		});
		if (isNewPool) {
			updatedPools.push(new CartProductsPool(cartProduct));
		}
		this._pools = updatedPools;
	}

	public removeProduct(cartProduct: CartProduct): void {
		const updatedPools: CartProductsPool[] = [];
		this.pools.forEach((pool: CartProductsPool) => {
			if (pool.cartProduct.equals(cartProduct))  {
				if (pool.quantity > 1) {
					const updatedPool: CartProductsPool = new CartProductsPool(pool.cartProduct, pool.quantity - 1);
					updatedPools.push(updatedPool);	// change products quantity
				} else {
					return;	// don't add pool if there's last item in pool
				}
			} else {
				updatedPools.push(pool);	// add other products
			}
		});
		this._pools = updatedPools;
	}
}

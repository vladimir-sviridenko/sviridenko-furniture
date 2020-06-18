import { ProductPool, SerializedProductPool } from './product-pool';
import { CartProduct, SerializedCartProduct } from './cart-product';

export interface SerializedCart {
	pools: SerializedProductPool[];
}

export class Cart {
	private _pools: ProductPool[];

	get pools(): ProductPool[] {
		return this._pools;
	}

	get productsQuantity(): number {
		return this.pools.reduce((totalQuantity: number, pool: ProductPool) => {
			return totalQuantity + pool.quantity;
		}, 0);
	}

	get totalPrice(): number {
		return this._pools.reduce((totalCartPrice: number, pool: ProductPool) => {
			return totalCartPrice + pool.poolPrice;
		}, 0);
	}

	constructor(pools?: ProductPool[]) {
		this._pools = pools ? pools : [];
	}

	public static deserialize(serializedCart: SerializedCart): Cart {
		const pools: ProductPool[] = serializedCart.pools
			.map((pool: SerializedProductPool) => ProductPool.deserialize(pool));

		const cart: Cart = new Cart(pools);
		return cart;
	}

	public addProduct(cartProduct: CartProduct): void {
		let isNewPool: boolean = true;
		const updatedPools: ProductPool[] = this.pools.map((pool: ProductPool) => {
			if (pool.cartProduct.equals(cartProduct)) {
				isNewPool = false;
				const updatedPool: ProductPool = new ProductPool(pool.cartProduct, pool.quantity + 1);
				return updatedPool;
			} else {
				return pool;
			}
		});
		if (isNewPool) {
			updatedPools.push(new ProductPool(cartProduct));
		}
		this._pools = updatedPools;
	}

	public removeProduct(cartProduct: CartProduct): void {
		const updatedPools: ProductPool[] = [];
		this.pools.forEach((pool: ProductPool) => {
			if (pool.cartProduct.equals(cartProduct))  {
				if (pool.quantity > 1) {
					const updatedPool: ProductPool = new ProductPool(pool.cartProduct, pool.quantity - 1);
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

	public toJSON(): SerializedCart {
		const serializedProductPools: SerializedProductPool[] =
		this.pools.map((pool: ProductPool) => {
			const cartProduct: SerializedCartProduct = pool.cartProduct.toJSON();
			return {
				cartProduct,
				quantity: pool.quantity
			};
		});

		return {
			pools: serializedProductPools
		};
	}
}

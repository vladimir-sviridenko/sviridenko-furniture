import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '..';
import * as ActionCart from '@store/actions/cart.actions';
import * as SelectorCart from '@store/selectors/cart.selectors';
import { CartProduct } from '@shop/models/cart-product';
import { map } from 'rxjs/operators';
import { CartProductsPool } from '@shop/models/cart-products-pool';
import { Cart } from '@shop/models/cart-product-pools';

@Injectable({
	providedIn: 'root'
})
export class CartFacadeService {
	constructor(private store: Store<AppState>) {}

	get cart$(): Observable<Cart> {
		return this.store.select(SelectorCart.selectCart);
	}

	get isCartOpened$(): Observable<boolean> {
		return this.store.select(SelectorCart.selectIsCartOpened);
	}

	get isCartEmpty$(): Observable<boolean> {
		return this.store.select(SelectorCart.selectCart).pipe(
			map((cart: Cart) =>
				cart.productsQuantity === 0
			)
		);
	}

	get cartProductsQuantity$(): Observable<number> {
		return this.store.select(SelectorCart.selectCart).pipe(
			map((cart: Cart) => cart.productsQuantity)
		);
	}

	public addCartProduct(cartProduct: CartProduct): void {
		this.store.dispatch(ActionCart.addProduct({ cartProduct }));
	}

	public removeCartProduct(cartProduct: CartProduct): void {
		this.store.dispatch(ActionCart.removeProduct({ cartProduct }));
	}

	public openCart(): void {
		this.store.dispatch(ActionCart.openCart());
	}

	public closeCart(): void {
		this.store.dispatch(ActionCart.closeCart());
	}
}

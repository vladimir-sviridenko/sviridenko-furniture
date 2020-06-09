import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '..';
import * as ActionCart from '@store/actions/cart.actions';
import * as SelectorCart from '@store/selectors/cart.selectors';
import { CartProduct } from '@shop/models/cart-product';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class CartFacadeService {
	constructor(private store: Store<AppState>) {}

	get isCartOpened$(): Observable<boolean> {
		return this.store.select(SelectorCart.selectIsCartOpened);
	}

	get isCartEmpty$(): Observable<boolean> {
		return this.store.select(SelectorCart.selectCartProducts).pipe(
			map((cartProducts: CartProduct[]) => cartProducts.length === 0)
		);
	}

	get cartProductsQuantity$(): Observable<number> {
		return this.store.select(SelectorCart.selectCartProducts).pipe(
			map((cartProducts: CartProduct[]) => cartProducts.length)
		);
	}

	public addCartProduct(cartProduct: CartProduct): void {
		this.store.dispatch(ActionCart.addCartProduct({ cartProduct }));
	}

	public openCart(): void {
		this.store.dispatch(ActionCart.openCart());
	}

	public closeCart(): void {
		this.store.dispatch(ActionCart.closeCart());
	}
}

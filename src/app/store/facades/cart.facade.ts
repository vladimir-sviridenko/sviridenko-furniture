import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '..';
import * as ActionCart from '@store/actions/cart.actions';
import * as SelectorCart from '@store/selectors/cart.selectors';
import { CartProduct } from '@shop/models/cart-product';
import { map } from 'rxjs/operators';
import { Cart } from '@shop/models/cart';
import { LocalStorageService } from '@shop/services/local-storage.service';

@Injectable({
	providedIn: 'root'
})
export class CartFacadeService {
	constructor(private store: Store<AppState>, private localStorageService: LocalStorageService) {}

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
		this.store.dispatch(ActionCart.saveCart({ storageApi: this.localStorageService }));
	}

	public removeCartProduct(cartProduct: CartProduct): void {
		this.store.dispatch(ActionCart.removeProduct({ cartProduct }));
		this.store.dispatch(ActionCart.saveCart({ storageApi: this.localStorageService }));
	}

	public loadCart(): void {
		this.store.dispatch(ActionCart.loadCart({ storageApi: this.localStorageService }));
	}

	public openCart(): void {
		this.store.dispatch(ActionCart.openCart());
	}

	public closeCart(): void {
		this.store.dispatch(ActionCart.closeCart());
	}
}

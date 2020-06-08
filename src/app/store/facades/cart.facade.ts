import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '..';
import * as ActionCart from '@store/actions/cart.actions';
import * as SelectorCart from '@store/selectors/cart.selectors';

@Injectable({
	providedIn: 'root'
})
export class CartFacadeService {
	constructor(private store: Store<AppState>) {}

	get isCartOpened$(): Observable<boolean> {
		return this.store.select(SelectorCart.selectIsCartOpened);
	}

	public openCart(): void {
		this.store.dispatch(ActionCart.openCart());
	}

	public closeCart(): void {
		this.store.dispatch(ActionCart.closeCart());
	}
}

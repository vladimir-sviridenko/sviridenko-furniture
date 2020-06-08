import { AppState } from '..';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ShopFacadeService } from './shop.facade';
import { Product } from '@shop/models/product';
import { Observable } from 'rxjs';
import { SelectedOption } from '@shop/models/selected-option';
import * as ActionProduct from '@store/actions/product.actions';
import * as SelectorProduct from '@store/selectors/product.selectors';

@Injectable({
	providedIn: 'root'
})
export class ProductFacadeService {
	constructor(private store: Store<AppState>, private shopFacadeService: ShopFacadeService) {}

	public get product$(): Observable<Product> {
		return this.store.select(SelectorProduct.selectProduct);
	}

	public get selectedOptions$(): Observable<SelectedOption[]> {
		return this.store.select(SelectorProduct.selectSelectedOptions);
	}

	public get totalPrice$(): Observable<number> {
		return this.store.select(SelectorProduct.selectTotalPrice);
	}

	public changeProduct(product: Product): void {
		this.store.dispatch(ActionProduct.changeProduct({ product }));
		this.shopFacadeService.hideShopLoader();
	}

	public selectOption(option: SelectedOption): void {
		this.store.dispatch(ActionProduct.selectOption({ option }));
		this.store.dispatch(ActionProduct.updateTotalPrice());
	}
}

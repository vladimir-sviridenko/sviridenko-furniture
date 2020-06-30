import { AppState } from '..';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductsTableFacadeService } from './productsTable.facade';
import { Product } from '@shop/models/product';
import { Observable } from 'rxjs';
import { SelectedOption } from '@shop/models/selected-option';
import * as ActionProductPage from '@store/actions/productPage.actions';
import * as SelectorProductPage from '@store/selectors/productPage.selectors';

@Injectable({
	providedIn: 'root'
})
export class ProductPageFacadeService {
	constructor(private store: Store<AppState>, private productsTableFacadeService: ProductsTableFacadeService) { }

	public get product$(): Observable<Product> {
		return this.store.select(SelectorProductPage.selectProduct);
	}

	public get selectedOptions$(): Observable<SelectedOption[]> {
		return this.store.select(SelectorProductPage.selectSelectedOptions);
	}

	public get totalPrice$(): Observable<number> {
		return this.store.select(SelectorProductPage.selectTotalPrice);
	}

	public changeProduct(product: Product): void {
		this.store.dispatch(ActionProductPage.changeProduct({ product }));
		this.productsTableFacadeService.hideTableLoader();
	}

	public selectOption(option: SelectedOption): void {
		this.store.dispatch(ActionProductPage.selectOption({ option }));
	}

	public clearProduct(): void {
		this.store.dispatch(ActionProductPage.clearProduct());
	}
}

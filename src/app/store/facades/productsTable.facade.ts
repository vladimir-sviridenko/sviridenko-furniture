import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as ActionProductsTable from '../actions/productsTable.actions';
import * as SelectorProductsTable from '../selectors/productsTable.selectors';
import { AppState } from '..';
import { Album } from '@shop/models/album';
import { CartFacadeService } from './cart.facade';
import { take } from 'rxjs/operators';
import { Product } from '@shop/models/product';

@Injectable({
	providedIn: 'root'
})
export class ProductsTableFacadeService {
	constructor(private store: Store<AppState>, private cartFacadeService: CartFacadeService) {
		this.store.dispatch(ActionProductsTable.loadAlbums());
	}

	public get albums$(): Observable<Album[]> {
		return this.store.select(SelectorProductsTable.selectAlbums);
	}

	public get tableAlbum$(): Observable<Album> {
		return this.store.select(SelectorProductsTable.selectTableAlbum);
	}

	public get tableProducts$(): Observable<Product[]> {
		return this.store.select(SelectorProductsTable.selectTableProducts);
	}

	public get pageTitle$(): Observable<string> {
		return this.store.select(SelectorProductsTable.selectPageTitle);
	}

	public get isTableLoading$(): Observable<boolean> {
		return this.store.select(SelectorProductsTable.selectIsTableLoading);
	}

	public changeTableAlbum(album: Album): void {
		this.cartFacadeService.isCartOpened$.pipe(take(1)).subscribe((isCartOpened: boolean) => {
			if (isCartOpened) {
				this.cartFacadeService.closeCart();
			}
		});
		this.store.dispatch(ActionProductsTable.changeTableAlbum({ album }));
	}

	public changeTableProducts(products: Product[]): void {
		this.store.dispatch(ActionProductsTable.changeTableProducts({ products }));
	}

	public clearTableProducts(): void {
		this.store.dispatch(ActionProductsTable.clearTableProducts());
	}

	public showTableLoader(): void {
		this.store.dispatch(ActionProductsTable.showTableLoader());
	}

	public hideTableLoader(): void {
		this.store.dispatch(ActionProductsTable.hideTableLoader());
	}

	public changePageTitle(pageTitle: string): void {
		this.store.dispatch(ActionProductsTable.changePageTitle({ pageTitle }));
	}
}

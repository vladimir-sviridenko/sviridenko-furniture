import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as ActionShop from '../actions/shop.actions';
import * as SelectorShop from '../selectors/shop.selectors';
import { AppState } from '..';
import { Album } from '@shop/models/album';
import { CartFacadeService } from './cart.facade';
import { take } from 'rxjs/operators';
import { Product } from '@shop/models/product';

@Injectable({
	providedIn: 'root'
})
export class ShopFacadeService {
	constructor(private store: Store<AppState>, private cartFacadeService: CartFacadeService) {
		this.store.dispatch(ActionShop.loadAlbums());
	}

	public get albums$(): Observable<Album[]> {
		return this.store.select(SelectorShop.selectAlbums);
	}

	public get currentAlbum$(): Observable<Album> {
		return this.store.select(SelectorShop.selectCurrentAlbum);
	}

	public get currentProducts$(): Observable<Product[]> {
		return this.store.select(SelectorShop.selectCurrentProducts);
	}

	public get pageTitle$(): Observable<string> {
		return this.store.select(SelectorShop.selectPageTitle);
	}

	public get isShopLoading$(): Observable<boolean> {
		return this.store.select(SelectorShop.selectIsShopLoading);
	}

	public changeCurrentAlbum(album: Album): void {
		this.cartFacadeService.isCartOpened$.pipe(take(1)).subscribe((isCartOpened: boolean) => {
			if (isCartOpened) {
				this.cartFacadeService.closeCart();
			}
		});
		this.store.dispatch(ActionShop.showShopLoader());
		this.store.dispatch(ActionShop.changeCurrentAlbum({ album }));
	}

	public changeCurrentProducts(products: Product[]): void {
		this.store.dispatch(ActionShop.showShopLoader());
		this.store.dispatch(ActionShop.changeCurrentProducts({ products }));
	}

	public showShopLoader(): void {
		this.store.dispatch(ActionShop.showShopLoader());
	}

	public hideShopLoader(): void {
		this.store.dispatch(ActionShop.hideShopLoader());
	}

	public changePageTitle(pageTitle: string): void {
		this.store.dispatch(ActionShop.changePageTitle({ pageTitle }));
	}
}

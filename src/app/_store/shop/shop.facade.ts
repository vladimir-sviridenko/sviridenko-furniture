import { Injectable } from '@angular/core';
import { Album } from '@models/Album';
import { Store, select } from '@ngrx/store';
import { AppState } from '@store/AppState';
import { Observable  } from 'rxjs';

import * as ActionShop from './shop.actions';
import * as SelectorShop from './shop.selectors';
import { Product } from '@models/Product';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ShopFacadeService {
  constructor(private store: Store<AppState>, private router: Router) {
    this.store.dispatch(ActionShop.initializeAlbums());
  }

  public get albums$(): Observable<Album[]> {
    return this.store.select(SelectorShop.selectAlbums);
  }

  public get currentAlbum$(): Observable<Album> {
    return this.store.select(SelectorShop.selectCurrentAlbum);
  }

  public get currentProduct$(): Observable<Product> {
    return this.store.select(SelectorShop.selectCurrentProduct);
  }

  public get isShopLoading$(): Observable<boolean> {
    return this.store.select(SelectorShop.selectIsShopLoading);
  }

  public changeCurrentAlbum(album: Album): void {
    this.store.dispatch(ActionShop.changeCurrentAlbum({ album }));
  }

  public changeCurrentProduct(product: Product): void {
    this.store.dispatch(ActionShop.changeCurrentProduct({ product }));
  }

  public hideShopLoader(): void {
    this.store.dispatch(ActionShop.hideShopLoader());
  }

}

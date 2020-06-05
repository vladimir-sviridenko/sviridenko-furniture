import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable  } from 'rxjs';

import * as ActionShop from '../actions/shop.actions';
import * as SelectorShop from '../selectors/shop.selectors';
import { AppState } from '..';
import { Album } from '@shop/models/Album';

@Injectable({
  providedIn: 'root'
})
export class ShopFacadeService {
  constructor(private store: Store<AppState>) {
    this.store.dispatch(ActionShop.initializeAlbums());
  }

  public get albums$(): Observable<Album[]> {
    return this.store.select(SelectorShop.selectAlbums);
  }

  public get currentAlbum$(): Observable<Album> {
    return this.store.select(SelectorShop.selectCurrentAlbum);
  }

  public get isShopLoading$(): Observable<boolean> {
    return this.store.select(SelectorShop.selectIsShopLoading);
  }

  public changeCurrentAlbum(album: Album): void {
    this.store.dispatch(ActionShop.changeCurrentAlbum({ album }));
  }

  public hideShopLoader(): void {
    this.store.dispatch(ActionShop.hideShopLoader());
  }
}

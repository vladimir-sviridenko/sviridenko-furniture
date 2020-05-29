import { Injectable } from '@angular/core';
import { Album } from '@models/Album';
import { Store } from '@ngrx/store';
import { AppState } from '@store/AppState';
import { Observable } from 'rxjs';

import * as ActionShop from './shop.actions';
import * as SelectorShop from './shop.selectors';
import { Product } from '@models/Product';

@Injectable({
  providedIn: 'root'
})
export class ShopFacadeService {
  constructor(private store: Store<AppState>) {}

  public get albums(): Observable<Album[]> {
    return this.store.select(SelectorShop.selectAlbums);
  }

  public get currentAlbum(): Observable<Album> {
    return this.store.select(SelectorShop.selectCurrentAlbum);
  }

  public get currentProduct(): Observable<Product> {
    return this.store.select(SelectorShop.selectCurrentProduct);
  }

  public get isShopLoading(): Observable<boolean> {
    return this.store.select(SelectorShop.selectIsShopLoading);
  }

  public initializeAlbums(): void {
    this.store.dispatch(ActionShop.initializeAlbums());
  }

  public changeCurrentAlbum(album: Album): void {
    this.store.dispatch(ActionShop.changeCurrentAlbum({ album }));
  }

  public hideShopLoader(): void {
    this.store.dispatch(ActionShop.hideShopLoader());
  }

  // private getAlbumBy(id: number) {
  //   for (const album: Album of albums) {
  //     if (album.id === id) {
  //       return album;
  //     }
  //   }
  //   return undefined;
  // };

// export const selectProductBy = (albumId: number, productId: number) =>
//     createSelector(selectShopState, (state: ShopState) => {

//   for (const [id, album] of state.albums) {
//     if (id === albumId) {
//       return album.find((product) => product.id === productId);
//     }
//   }
//   return undefined;
// });
}
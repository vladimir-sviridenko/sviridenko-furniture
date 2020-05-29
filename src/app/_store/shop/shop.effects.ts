import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { AppState } from '@store/AppState';
import { Store } from '@ngrx/store';
import * as ShopAction from './shop.actions';
import { KitchenCabinetService } from '@services/kitchen-cabinet.service';
import { GalleryService } from '@core/http/gallery.service';
import { switchMap, share, map, tap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { Album } from '@models/Album';

@Injectable()
export class ShopEffects {

  initializeAlbums$ = createEffect(
    () => this.actions$.pipe(
      ofType(ShopAction.initializeAlbums),
      switchMap(() => combineLatest([this.kitchenCabinetService.albums$, this.galleryService.productAlbums$]).pipe(
        map(([album1, album2]) => [...album1, ...album2]),
        tap((albums: Album[]) => this.store.dispatch(ShopAction.setAlbums({ albums }))),
        map((albums: Album[]) => ShopAction.changeCurrentAlbum({ album: albums[0] })),
        share()
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private kitchenCabinetService: KitchenCabinetService,
    private galleryService: GalleryService,
    private store: Store<AppState>) { }
}

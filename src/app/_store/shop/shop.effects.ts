import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { AppState } from '@store/AppState';
import { Store } from '@ngrx/store';
import * as ShopAction from './shop.actions';
import { KitchenCabinetService } from '@services/kitchen-cabinet.service';
import { GalleryService } from '@core/http/gallery.service';
import { switchMap, share, map, tap } from 'rxjs/operators';
import { combineLatest, Subject } from 'rxjs';
import { Album } from '@models/Album';

@Injectable()
export class ShopEffects {

  private initializeAlbums$ = createEffect(
    () => this.actions$.pipe(
      ofType(ShopAction.initializeAlbums),
      switchMap(() => combineLatest([this.kitchenCabinetService.albums$, this.galleryService.productAlbums$]).pipe(
        map(([album1, album2]) => [...album1, ...album2]),
        map((albums: Album[]) => ShopAction.setAlbums({ albums })),
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

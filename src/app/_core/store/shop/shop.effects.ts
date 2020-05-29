import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { ProductsService } from '@services/products.service';
import { AppState } from '@models/AppState';
import { Store } from '@ngrx/store';
import * as ShopActions from './shop.actions';

@Injectable()
export class  ShopEffects {

  initializeAlbums$ = createEffect(
    () => this.actions$.pipe(
      ofType(ShopActions.initializeAlbums),
    )
  );

  constructor(
    private actions$: Actions,
    private productsService: ProductsService,
    private store: Store<AppState>) {}
}
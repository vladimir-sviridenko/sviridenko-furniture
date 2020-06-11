import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ProductsService } from 'src/app/components/shop/services/products.service';
import { GalleryService } from 'src/app/components/shop/services/gallery.service';
import { switchMap, share, map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { Album } from '@shop/models/album';
import { AppState } from '..';
import * as ShopAction from '../actions/shop.actions';

@Injectable()
export class ShopEffects {

	public initializeAlbums$ = createEffect(
		() => this.actions$.pipe(
			ofType(ShopAction.initializeAlbums),
			switchMap(() => combineLatest([this.productsService.albums$, this.galleryService.productAlbums$]).pipe(
				map(([album1, album2]: [Album[], Album[]]) => [...album1, ...album2]),
				map((albums: Album[]) => ShopAction.setAlbums({ albums })),
				share()
			))
		)
	);

	constructor(
		private actions$: Actions,
		private productsService: ProductsService,
		private galleryService: GalleryService,
		private store: Store<AppState>) { }
}

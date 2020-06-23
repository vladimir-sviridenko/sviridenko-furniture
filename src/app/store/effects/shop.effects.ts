import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { ProductsService } from 'src/app/components/shop/services/products.service';
import { GalleryService } from 'src/app/components/shop/services/gallery.service';
import { switchMap, share, map, tap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { Album } from '@shop/models/album';
import * as ShopAction from '../actions/shop.actions';
import { CartFacadeService } from '@store/facades/cart.facade';

@Injectable()
export class ShopEffects {

	public loadAlbums$ = createEffect(
		() => this.actions$.pipe(
			ofType(ShopAction.loadAlbums),
			switchMap(() => combineLatest([this.galleryService.productAlbums$, this.productsService.albums$]).pipe(
				map(([album1, album2]: [Album[], Album[]]) => [...album1, ...album2]),
				map((albums: Album[]) => ShopAction.setAlbums({ albums })),
				tap(() => this.cartFacadeService.loadCart()),
				share()
			))
		)
	);

	constructor(private actions$: Actions,
		private productsService: ProductsService,
		private galleryService: GalleryService,
		private cartFacadeService: CartFacadeService) { }
}

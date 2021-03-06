import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';
import { ProductsTableFacadeService } from '@store/facades/productsTable.facade';
import { Album } from '@shop/models/album';
import { Product } from '@shop/models/product';
import { ProductsService } from '@shop/services/products.service';
import { ProductPageFacadeService } from '@store/facades/productPage.facade';

@Injectable()
export class CanOpenProductGuard implements CanActivate {

	private albums$: ReplaySubject<Album[]> = new ReplaySubject<Album[]>();

	constructor(private router: Router,
		private productsTableFacadeService: ProductsTableFacadeService,
		private productPageFacadeService: ProductPageFacadeService,
		private productsService: ProductsService) {

		this.productsTableFacadeService.albums$
			.pipe(
				filter((albums: Album[]) => Boolean(albums)),
				take(1))
			.subscribe(this.albums$);
	}

	private isAvailableAlbum(albumId: number): boolean {
		return this.productsService.albums.some((album: Album) => album.id === albumId);
	}

	public canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

		const albumId: number = parseInt(next.params.albumId, 10);
		const productId: number = parseInt(next.params.productId, 10);

		return this.albums$.pipe(
			map((albums: Album[]) => {
				// find selected product and album in data base
				let productToShow: Product = null;
				let productsAlbum: Album = null;
				albums.forEach((album: Album) => {
					if (album.id === albumId && this.isAvailableAlbum(album.id)) {
						productToShow = album.products.find((product: Product) => product.id === productId);
						productsAlbum = productToShow ? album : null;
					}
				});
				// give access if product exists
				if (productToShow) {
					this.productsTableFacadeService.changeTableAlbum(productsAlbum);
					this.productPageFacadeService.changeProduct(productToShow);
					return true;
				} else {
					this.router.navigate(['/404']);
					return false;
				}
			})
		);
	}
}

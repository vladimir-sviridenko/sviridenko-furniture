import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';
import { ProductsTableFacadeService } from '@store/facades/productsTable.facade';
import { Album } from '@shop/models/album';

@Injectable()
export class CanOpenProductsTableGuard implements CanActivate {

	private albums$: ReplaySubject<Album[]> = new ReplaySubject<Album[]>();

	constructor(private productsTableFacadeService: ProductsTableFacadeService, private router: Router) {
		this.productsTableFacadeService.albums$
			.pipe(filter((albums: Album[]) => Boolean(albums)), take(1))
			.subscribe(this.albums$);
	}

	public canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

		const albumId: number = parseInt(next.params.albumId, 10);

		return this.albums$
			.pipe(
				map((albums: Album[]) => {
					const existingAlbum: Album = albums.find((album: Album) => album.id === albumId);
					if (existingAlbum) {
						this.productsTableFacadeService.changeTableAlbum(existingAlbum);
						return true;
					} else {
						this.router.navigate(['/404']);
						return false;
					}
				})
			);
	}
}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';
import { ShopFacadeService } from '@store/facades/shop.facade';
import { ShopEffects } from '@store/effects/shop.effects';
import { Album } from '@shop/models/album';
import { ProductFacadeService } from '@store/facades/product.facade';

@Injectable()
export class CanOpenAlbumGuard implements CanActivate {

	private albums$: ReplaySubject<Album[]> = new ReplaySubject<Album[]>();

	constructor(private shopFacadeService: ShopFacadeService,
							private router: Router) {
		this.shopFacadeService.albums$.pipe(take(2), filter((albums: Album[]) => !!albums)).subscribe(this.albums$);
	}

	public canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		const albumId: number = parseInt(next.params.albumId, 10);

		return this.albums$.pipe(
			map((albums: Album[]) => {
				for (const album of albums) {
					if (album.id === albumId) { // some
						this.shopFacadeService.changeCurrentAlbum(album);
						return true;
					}
				}
				this.router.navigate(['/404']);
				return false;
			})
		);
	}
}

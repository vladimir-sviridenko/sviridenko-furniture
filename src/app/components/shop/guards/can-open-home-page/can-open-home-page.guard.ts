import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { ProductsTableFacadeService } from '@store/facades/productsTable.facade';
import { Album } from '@shop/models/album';
import { take, filter, map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class CanOpenHomePageGuard implements CanActivate {

	private albums$: ReplaySubject<Album[]> = new ReplaySubject<Album[]>();

	constructor(private productsTableFacadeService: ProductsTableFacadeService) {
		this.productsTableFacadeService.albums$
			.pipe(
				filter((albums: Album[]) => Boolean(albums)),
				take(1)
			)
			.subscribe(this.albums$);
	}

	public canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

		return this.albums$
			.pipe(
				map(() => true)
			);
	}
}

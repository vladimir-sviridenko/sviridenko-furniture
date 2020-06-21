import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { ShopFacadeService } from '@store/facades/shop.facade';
import { Album } from '@shop/models/album';
import { take, filter, map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class CanOpenHomePageGuard implements CanActivate {

	private albums$: ReplaySubject<Album[]> = new ReplaySubject<Album[]>();

	constructor(private shopFacadeService: ShopFacadeService) {
		this.shopFacadeService.albums$.pipe(take(2), filter((albums: Album[]) => !!albums)).subscribe(this.albums$);
	}

	public canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.albums$.pipe(
			map(() => true)
		);
	}
}

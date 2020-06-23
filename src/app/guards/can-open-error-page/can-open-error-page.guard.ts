import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class CanOpenErrorPageGuard implements CanActivate {

	public isErrorThrown: boolean = false;

	constructor(private router: Router) { }

	public canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

		if (!this.isErrorThrown) {
			this.router.navigate(['']);
		}
		return this.isErrorThrown;
	}
}

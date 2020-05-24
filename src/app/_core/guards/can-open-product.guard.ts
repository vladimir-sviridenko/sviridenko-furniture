import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Params } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanOpenProductGuard implements CanActivate {

  private availableAlbumsToOpenProductPage: number[] = [375686981];

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const albumId: number = parseInt(next.params.albumId, 10);
    const giveAccess: boolean = this.availableAlbumsToOpenProductPage.some((id) => id === albumId);
    return giveAccess;
  }
}

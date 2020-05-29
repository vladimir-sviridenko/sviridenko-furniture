import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CanOpenProductGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // const albumId: number = parseInt(next.params.albumId, 10);
    // const productId: number = parseInt(next.params.productId, 10);

    // return this.productsService.galleryAlbums$.pipe(
    //   map(() => {
    //     const currentProduct = this.productsService.updateProduct(albumId, productId);
    //     if (currentProduct) {
    //       return true;
    //     } else {
    //       this.router.navigate(['/404']);
    //       return false;
    //     }
    //   })
    // );
    return true;
  }
}

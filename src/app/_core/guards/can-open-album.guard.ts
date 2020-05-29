import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductsService } from '@services/products.service';
import { Product } from '@models/Product';

@Injectable()
export class CanOpenAlbumGuard implements CanActivate {

  constructor(private productsService: ProductsService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const albumId: number = parseInt(next.params.albumId, 10);
    return this.productsService.albums$.pipe(
      map(() => {
        const currentProductCards: Product[] = this.productsService.updateProductCards(albumId);
        if (currentProductCards) {
          return true;
        } else {
          this.router.navigate(['/404']);
          return false;
        }
      })
    );
  }
}

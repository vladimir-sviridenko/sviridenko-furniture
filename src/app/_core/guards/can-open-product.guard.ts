import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Params, Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';
import { ShopFacadeService } from '@store/shop/shop.facade';
import { Album } from '@models/Album';
import { Product } from '@models/Product';
import { ProductsService } from '@services/products.service';

@Injectable()
export class CanOpenProductGuard implements CanActivate {

  private albums$: ReplaySubject<Album[]> = new ReplaySubject<Album[]>();

  constructor(private shopFacadeService: ShopFacadeService,
              private router: Router,
              private productsService: ProductsService) {
    this.shopFacadeService.albums$.pipe(take(2), filter((albums) => !!albums)).subscribe(this.albums$);
  }

  private isAvailableAlbum(albumId: number): boolean {
    return this.productsService.albums.some((album: Album) => album.id === albumId);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const albumId: number = parseInt(next.params.albumId, 10);
    const productId: number = parseInt(next.params.productId, 10);

    return this.albums$.pipe(
      map((albums: Album[]) => {
        let productToShow: Product = null;
        let productsAlbum: Album = null;
        for (const album of albums) {
          if (album.id === albumId && this.isAvailableAlbum(album.id)) {
            productToShow = album.products.find((product) => product.id === productId);
            productsAlbum = productToShow ? album : null;
          }
        }
        if (productToShow) {
          this.shopFacadeService.changeCurrentAlbum(productsAlbum);
          this.shopFacadeService.changeCurrentProduct(productToShow);
          return true;
        } else {
          this.router.navigate(['/404']);
          return false;
        }
      })
    );
  }
}

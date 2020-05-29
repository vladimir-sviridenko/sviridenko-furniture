import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { withLatestFrom, map, last, filter, takeLast } from 'rxjs/operators';
import { ShopFacadeService } from '@store/shop/shop.facade';
import { ShopEffects } from '@store/shop/shop.effects';
import { Album } from '@models/Album';

@Injectable()
export class CanOpenAlbumGuard implements CanActivate {

  private albums: ReplaySubject<Album[]> = new ReplaySubject<Album[]>();

  constructor(private shopFacadeService: ShopFacadeService, private router: Router, private shopEffects: ShopEffects) {
    this.shopFacadeService.albums.pipe(filter((albums) => Boolean(albums))).subscribe(this.albums);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const albumId: number = parseInt(next.params.albumId, 10);

    return this.albums.pipe(
      map((albums) => {
        for (const album of albums) {
          if (album.id === albumId) {
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

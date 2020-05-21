import { Component, ViewChildren, AfterViewInit, QueryList } from '@angular/core';
import { ProductsService } from '@services/products.service';

import { Album } from '@models/Album';
import { ProductCard } from '@models/ProductCard';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCardComponent } from './product-card/product-card.component';

type AlbumLink = {
  id: number,
  title: string,
  onlinePurchase: boolean
};

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements AfterViewInit {

  @ViewChildren(ProductCardComponent)
  private productCardComponents: QueryList<ProductCardComponent>;

  public isProductCardsLoaded: boolean = false;

  public albumLinks: AlbumLink[] = null;
  public currentAlbumId: number;
  public albums: Album[];
  public productCards: ProductCard[];

  constructor(private productsService: ProductsService, private router: Router, private route: ActivatedRoute) {
    this.productsService.albums$.subscribe((albums: Album[]) => {
      this.albums = albums;
      this.updateAlbumLinks();
      this.route.params.subscribe(params => {
        const albumToShow: Album = this.albums.find(album => params.albumId === String(album.id));
        if (albumToShow) {
          this.currentAlbumId = albumToShow.id;
          this.productCards = this.productsService.getProductCardsBy(albumToShow);
        } else {
          this.router.navigate(['/products', this.albums[0].id]);
        }
      });
    });
  }

  ngAfterViewInit(): void {
    this.productCardComponents.changes.subscribe((value) => {
      this.showCardsAfterAllLoaded();
    });
  }

  public hideCards(linkToAlbumId: number) {
    this.isProductCardsLoaded = (linkToAlbumId === this.currentAlbumId);
  }

  private showCardsAfterAllLoaded(): void {
    const loadingPhotos$ = this.productCardComponents.map((component: ProductCardComponent, index: number) => {
      return new Promise((resolve) => {
        component.imageLoad$.subscribe((isSuccessLoading) => {
          if (isSuccessLoading) {
            resolve();
          } else {
            const elementToDelete = document.querySelectorAll('.shop__card')[index];
            elementToDelete.parentNode.removeChild(elementToDelete);
          }
        });
      });
    });
    console.log(loadingPhotos$)
    Promise.all(loadingPhotos$).then(() => {
      this.isProductCardsLoaded = true;
    });
  }

  private updateAlbumLinks(): void {
    const albumLinks: AlbumLink[] = [];
    this.albums.forEach((album) => {
      albumLinks.push({
        id: album.id,
        title: album.title,
        onlinePurchase: album.onlinePurchase
      });
    });
    this.albumLinks = albumLinks;
  }
}

import { Component } from '@angular/core';
import { ProductsService } from '@services/products.service';

import { Album } from '@models/Album';
import { ProductCard } from '@models/ProductCard';
import { ActivatedRoute, Router } from '@angular/router';

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
export class ShopComponent {

  public albumLinks: AlbumLink[] = null;
  public currentAlbumId: number;
  public albums: Album[];
  public productCards: ProductCard[];

  constructor(private productsService: ProductsService, private router: Router, private route: ActivatedRoute) {
    this.productsService.albums$.subscribe((albums: Album[]) => {
      this.albums = albums;
      this.updateAlbumLinks();
      this.route.params.subscribe(params => {
        const albumToShow: Album = this.albums.find(album => params.albumId === album.id);
        if (albumToShow) {
          this.currentAlbumId = albumToShow.id;
          this.productCards = this.productsService.getProductCardsBy(albumToShow);
        } else {
          this.router.navigate(['/products', this.albums[0].id]);
        }
      });
    });
  }

  private updateAlbumLinks() {
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

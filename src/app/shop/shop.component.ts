import { Component, OnInit } from '@angular/core';
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
export class ShopComponent implements OnInit {

  public albumLinks: AlbumLink[] = null;
  public currentAlbumId: number;
  public albums: Album[];
  public productCards: ProductCard[];

  constructor(private productsService: ProductsService, private router: Router, private route: ActivatedRoute) {
    this.productsService.albums$.subscribe((albums: Album[]) => {
      this.albums = albums;
      this.updateAlbumLinks();
      this.redirectToExistingAlbum();
    });
    this.route.params.subscribe(params => this.currentAlbumId = params.albumId);
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

  private redirectToExistingAlbum() {
    let isExisting: boolean = false;
    for (let i = 0; i < this.albums.length && !isExisting; i++) {
      isExisting = this.albums[i].id === this.currentAlbumId;
    }
    if (!isExisting) {
      this.router.navigate(['/products', this.albums[0].id]);
    }
  }
  ngOnInit(): void {}
}

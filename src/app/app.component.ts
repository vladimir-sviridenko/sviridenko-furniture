import { Component } from '@angular/core';

import { ProductsService } from './services/products.service';
import { Album } from './services/interfaces/Album';
import { ProductCard } from './services/interfaces/ProductCard';
import { ActivatedRoute, Router } from '@angular/router';

type AlbumLink = {
  id: number,
  title: string,
  onlinePurchase: boolean
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public appTitle = 'sviridenko-furniture';

  public albumLinks: AlbumLink[] = null;
  public currentAlbumId: number;
  public albums: Album[];
  public productCards: ProductCard[];

  constructor(private productsService: ProductsService, private router: Router) {
    this.productsService.albums$.subscribe((albums: Album[]) => {
      this.albums = albums;
      this.updateAlbumLinks();
      this.redirectToExistingAlbum();
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

  private redirectToExistingAlbum() {
    let isExisting: boolean = false;
    for (let i = 0; i < this.albums.length && !isExisting; i++) {
      isExisting = this.albums[i].id === this.currentAlbumId;
    }
    if (!isExisting) {
      this.router.navigate(['/products', this.albums[0].id]);
    }
  }
}

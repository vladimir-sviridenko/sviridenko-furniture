import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, share, first } from 'rxjs/operators';

import { GalleryService } from '../http/gallery.service';
import { KitchenCabinetService } from './kitchen-cabinet.service';

import { ProductCard } from '@models/ProductCard';
import { ProductService } from '@models/ProductService';
import { Album } from '@models/Album';

@Injectable()
export class ProductsService {

  public isProductCardsLoaded: boolean = false;
  public currentAlbumId: number;
  public productCards$: Subject<ProductCard[]> = new Subject<ProductCard[]>();
  public albums$: Observable<Album[]>;
  public albums: Album[];

  public httpService: GalleryService;
  public dependencies: ProductService[] = [];

  constructor(private galleryService: GalleryService, private kitchenCabinetService: KitchenCabinetService) {
    this.httpService = this.galleryService;
    this.dependencies = [
      this.kitchenCabinetService,
      this.httpService
    ];
    this.albums$ = this.fetchAlbums();
  }

  public hideCards(linkToAlbumId: number) {
    this.isProductCardsLoaded = (linkToAlbumId === this.currentAlbumId);
  }

  private fetchAlbums(): Observable<Album[]> {
    return this.httpService.fetchAlbums().pipe(
      map((albums: Album[]) => {
        for (let i = 0; i < this.dependencies.length - 1; i++) {
          albums = [...this.dependencies[i].albums, ...albums];
        }
        return albums;
      }),
      share(),
      first()
    );
  }

  public generateProductCards(album: Album): void {
    this.currentAlbumId = album.id;
    const serviceContainingAlbum = this.dependencies.find(service =>
      service.albums.find(serviceAlbum => serviceAlbum.id === album.id));
    const productCards: ProductCard[] = serviceContainingAlbum.getProductCardsBy(album);
    this.productCards$.next(productCards);
  }
}
